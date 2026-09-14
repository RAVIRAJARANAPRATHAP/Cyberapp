import { runAgent } from '../src/server/agent.ts';

async function parseJsonBody(req: any): Promise<any> {
  if (req.body && typeof req.body === 'object') {
    return req.body;
  }
  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body);
    } catch {
      return {};
    }
  }
  return new Promise((resolve) => {
    let data = '';
    req.on('data', (chunk: any) => {
      data += chunk;
    });
    req.on('end', () => {
      try {
        resolve(data ? JSON.parse(data) : {});
      } catch {
        resolve({});
      }
    });
    req.on('error', () => resolve({}));
  });
}

export default async function handler(req: any, res: any) {
  // CORS & Defensive Security Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), payment=(), usb=(), display-capture=(), screen-wake-lock=(), accelerometer=(), gyroscope=(), magnetometer=(), midi=()'
  );
  res.setHeader('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');

  if (req.method === 'OPTIONS') {
    res.statusCode = 200;
    return res.end();
  }

  if (req.method !== 'POST') {
    res.statusCode = 405;
    return res.end(JSON.stringify({ error: 'Method Not Allowed' }));
  }

  try {
    const body = await parseJsonBody(req);
    const { query, language } = body || {};

    if (!query || typeof query !== 'string' || !query.trim()) {
      res.statusCode = 400;
      return res.end(JSON.stringify({ error: 'Query parameter is required and cannot be empty' }));
    }

    const trimmedQuery = query.trim();
    if (trimmedQuery.length > 8000) {
      res.statusCode = 400;
      return res.end(JSON.stringify({ error: 'Query exceeds maximum allowed length of 8,000 characters.' }));
    }

    const apiKey = process.env.GEMINI_API_KEY ? process.env.GEMINI_API_KEY.trim() : undefined;
    const isDemoMode = process.env.DEMO_MODE === '1';
    const lang = typeof language === 'string' && /^[a-z]{2}$/.test(language) ? language : 'en';

    const result = await runAgent(trimmedQuery, apiKey, isDemoMode, lang);
    res.statusCode = 200;
    return res.end(JSON.stringify({ ok: true, data: result }));
  } catch (error: any) {
    console.error('[Vercel API Error /api/check]:', error);
    res.statusCode = 500;
    return res.end(JSON.stringify({
      error: 'An error occurred while evaluating the query. Please retry or consult 1930.',
      details: error?.message || String(error),
    }));
  }
}
