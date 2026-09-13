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
