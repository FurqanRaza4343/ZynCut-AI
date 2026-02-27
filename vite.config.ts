import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    const n8nWebhookPath = env.N8N_WEBHOOK_PATH || '/webhook-test/remove-background';
    const n8nBaseUrl = env.N8N_BASE_URL || (mode === 'development' ? 'http://localhost:5678' : 'https://furqanraza978.app.n8n.cloud');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
        proxy: {
          '/api/remover-background': {
            target: n8nBaseUrl,
            changeOrigin: true,
            secure: true,
            rewrite: (urlPath) => urlPath.replace(/^\/api\/remover-background/, n8nWebhookPath),
            configure: (proxy) => {
              proxy.on('proxyReq', (_proxyReq, _req, _res) => {});
              proxy.on('proxyRes', (proxyRes, req, res) => {
                const existing = proxyRes.headers['content-type'] || res.getHeader('Content-Type');
                if (!existing) {
                  res.setHeader('Content-Type', 'application/octet-stream');
                }
                const accepts = req.headers['accept'];
                if (!accepts) {
                  res.setHeader('Vary', 'Accept');
                }
              });
            },
          },
        },
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
