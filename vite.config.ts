import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    const n8nWebhookPath = env.N8N_WEBHOOK_PATH || '/webhook/remove-background';
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
        proxy: {
          '/api/remover-background': {
            target: 'https://furqanraza978.app.n8n.cloud',
            changeOrigin: true,
            secure: true,
            rewrite: (urlPath) => urlPath.replace(/^\/api\/remover-background/, n8nWebhookPath),
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
