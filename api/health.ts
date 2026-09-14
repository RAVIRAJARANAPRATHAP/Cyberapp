import { KNOWLEDGE_BASE } from '../src/server/retriever.ts';

export default function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
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

  const hasKey = Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim());
  const isDemo = process.env.DEMO_MODE === '1' || !hasKey;

  res.statusCode = 200;
  return res.end(
    JSON.stringify({
      status: 'ok',
      app: 'CyberRakshak',
      backend: isDemo ? 'demo' : 'gemini',
      demoMode: isDemo,
      kbCount: KNOWLEDGE_BASE.length,
    })
  );
}
