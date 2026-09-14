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

  res.statusCode = 200;
  return res.end(
    JSON.stringify({
      count: KNOWLEDGE_BASE.length,
      documents: KNOWLEDGE_BASE.map((d) => ({
        id: d.id,
        source: d.source,
        title: d.title,
        category: d.category,
      })),
    })
  );
}
