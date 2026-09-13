import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import app from './src/server/app.ts';

dotenv.config();

const PORT = 3000;

// ── Vite & Static Serving ────────────────────────────────────────────────────
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  // Centralized Error Handling Middleware
  app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error('[Unhandled Server Error]:', err?.message || err);
    if (res.headersSent) {
      return next(err);
    }
    res.status(err.status || 500).json({
      error: 'An internal server error occurred',
    });
  });

  const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`[CyberRakshak] Server running on http://0.0.0.0:${PORT}`);
  });

  // Graceful shutdown handling
  const handleShutdown = (signal: string) => {
    console.log(`[CyberRakshak] Received ${signal}, shutting down gracefully...`);
    server.close(() => {
      process.exit(0);
    });
    setTimeout(() => process.exit(0), 5000).unref();
  };

  process.on('SIGTERM', () => handleShutdown('SIGTERM'));
  process.on('SIGINT', () => handleShutdown('SIGINT'));
}

// Top-level rejection guards to prevent Node crash loops
process.on('unhandledRejection', (reason) => {
  console.error('[Unhandled Promise Rejection]:', reason);
});
process.on('uncaughtException', (err) => {
  console.error('[Uncaught Exception]:', err);
});

startServer();

export default app;
