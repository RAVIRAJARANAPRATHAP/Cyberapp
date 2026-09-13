import { inspectLink } from '../src/server/agent.ts';

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
  // CORS & Security Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');

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
    const { url, language } = body || {};

    if (!url || typeof url !== 'string' || !url.trim()) {
      res.statusCode = 400;
      return res.end(JSON.stringify({ error: 'URL is required and cannot be empty' }));
    }

    const trimmedUrl = url.trim();
    if (trimmedUrl.length > 2048) {
      res.statusCode = 400;
      return res.end(JSON.stringify({ error: 'URL exceeds maximum permitted length of 2,048 characters.' }));
    }

    const apiKey = process.env.GEMINI_API_KEY ? process.env.GEMINI_API_KEY.trim() : undefined;
    const isDemoMode = process.env.DEMO_MODE === '1';
    const lang = typeof language === 'string' && /^[a-z]{2}$/.test(language) ? language : 'en';

    const result = await inspectLink(trimmedUrl, apiKey, isDemoMode, lang);
    res.statusCode = 200;
    return res.end(JSON.stringify({ ok: true, data: result }));
  } catch (error: any) {
    console.error('[Vercel API Error /api/inspect-link]:', error);
    res.statusCode = 500;
    return res.end(JSON.stringify({
      error: 'An error occurred while inspecting the link. Please verify independently.',
      details: error?.message || String(error),
    }));
  }
}
