import { KNOWLEDGE_BASE } from '../src/server/retriever.ts';

export default function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');

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
