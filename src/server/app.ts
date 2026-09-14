import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { runAgent, inspectLink, KNOWLEDGE_BASE } from './agent.ts';

dotenv.config();

const app = express();

// Security & Payload limits
app.use(cors());
app.use(express.json({ limit: '100kb' }));

// Defensive HTTP Security Headers
app.use((req, res, next) => {
  // In development/container preview, allow framing from AI Studio preview domain
  const isProd = process.env.NODE_ENV === 'production';
  const frameAncestors = isProd ? "frame-ancestors 'self';" : "frame-ancestors 'self' https://*.google.com https://*.run.app https://*.aistudio.google.com https://ai.studio;";

  res.setHeader(
    'Content-Security-Policy',
    `default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https://upload.wikimedia.org; font-src 'self' data:; connect-src 'self' https://generativelanguage.googleapis.com; media-src 'self' blob:; object-src 'none'; base-uri 'self'; form-action 'self'; ${frameAncestors} upgrade-insecure-requests;`
  );
  if (isProd) {
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  }
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), payment=(), usb=(), display-capture=(), screen-wake-lock=(), accelerometer=(), gyroscope=(), magnetometer=(), midi=()'
  );
  res.setHeader('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
  res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
  next();
});

// ── Secure In-Memory Bounded Rate Limiter ────────────────────────────────────
interface RateLimitRecord {
  count: number;
  resetTime: number;
}
const rateLimitMap = new Map<string, RateLimitRecord>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 60; // 60 requests per minute
const MAX_MAP_ENTRIES = 5000; // Cap to prevent memory leaks / exhaustion

function getClientIp(req: express.Request): string {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string') {
    const first = forwarded.split(',')[0].trim();
    if (/^[a-fA-F0-9:.]+$/.test(first) && first.length <= 45) {
      return first;
    }
  }
  return req.socket.remoteAddress || '127.0.0.1';
}

const rateLimiter = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const ip = getClientIp(req);
  const now = Date.now();

  // Enforce capacity bounds
  if (rateLimitMap.size >= MAX_MAP_ENTRIES) {
    let count = 0;
    for (const [key, val] of rateLimitMap.entries()) {
      if (now > val.resetTime || count < 500) {
        rateLimitMap.delete(key);
        count++;
      }
    }
  }

  const record = rateLimitMap.get(ip);
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return next();
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    res.status(429).json({
      error: 'Too many requests. Please wait a moment before trying again.',
      retryAfterSeconds: Math.ceil((record.resetTime - now) / 1000),
    });
    return;
  }

  record.count += 1;
  next();
};

// Periodic garbage collection of stale rate-limit keys
setInterval(() => {
  const now = Date.now();
  for (const [ip, record] of rateLimitMap.entries()) {
    if (now > record.resetTime) {
      rateLimitMap.delete(ip);
    }
  }
}, 3 * 60 * 1000).unref();

const SUPPORTED_LANGUAGES = new Set(['en', 'hi', 'te', 'ta', 'mr', 'bn']);

// ── API Router (Mounted on both /api and /) ──────────────────────────────────
const apiRouter = express.Router();

apiRouter.get('/health', (req, res) => {
  const hasKey = Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim());
  const isDemo = process.env.DEMO_MODE === '1' || !hasKey;

  res.json({
    status: 'ok',
    app: 'CyberRakshak',
    backend: isDemo ? 'demo' : 'gemini',
    demoMode: isDemo,
  });
});

apiRouter.get('/knowledge-base', (req, res) => {
  res.json({
    count: KNOWLEDGE_BASE.length,
    documents: KNOWLEDGE_BASE.map(d => ({
      id: d.id,
      source: d.source,
      title: d.title,
      category: d.category,
    })),
  });
});

apiRouter.post('/check', rateLimiter, async (req, res) => {
  try {
    const { query, language } = req.body || {};
    if (!query || typeof query !== 'string' || !query.trim()) {
      res.status(400).json({ error: 'Query parameter is required and cannot be empty' });
      return;
    }

    const trimmedQuery = query.trim();
    if (trimmedQuery.length > 8000) {
      res.status(400).json({ error: 'Query exceeds maximum allowed length of 8,000 characters.' });
      return;
    }

    const sanitizedLang = typeof language === 'string' && SUPPORTED_LANGUAGES.has(language) ? language : 'en';
    const apiKey = process.env.GEMINI_API_KEY ? process.env.GEMINI_API_KEY.trim() : undefined;
    const isDemoMode = process.env.DEMO_MODE === '1';

    const result = await runAgent(trimmedQuery, apiKey, isDemoMode, sanitizedLang);
    res.json({ ok: true, data: result });
  } catch (error: any) {
    console.error('[API Error /check]:', error?.message || error);
    res.status(500).json({
      error: 'An error occurred while evaluating the query. Please retry or consult 1930.',
      details: error?.message || String(error),
    });
  }
});

apiRouter.post('/inspect-link', rateLimiter, async (req, res) => {
  try {
    const { url, language } = req.body || {};
    if (!url || typeof url !== 'string' || !url.trim()) {
      res.status(400).json({ error: 'URL is required and cannot be empty' });
      return;
    }

    const trimmedUrl = url.trim();
    if (trimmedUrl.length > 2048) {
      res.status(400).json({ error: 'URL exceeds maximum permitted length of 2,048 characters.' });
      return;
    }

    const apiKey = process.env.GEMINI_API_KEY ? process.env.GEMINI_API_KEY.trim() : undefined;
    const isDemoMode = process.env.DEMO_MODE === '1';

    const safeLanguage = typeof language === 'string' && /^[a-z]{2}$/.test(language) ? language : 'en';
    const result = await inspectLink(trimmedUrl, apiKey, isDemoMode, safeLanguage);
    res.json({ ok: true, data: result });
  } catch (error: any) {
    console.error('[API Error /inspect-link]:', error?.message || error);
    res.status(500).json({
      error: 'An error occurred while inspecting the link. Please verify independently.',
      details: error?.message || String(error),
    });
  }
});

// Mount router on both /api and root /
app.use('/api', apiRouter);
app.use('/', apiRouter);

export default app;
