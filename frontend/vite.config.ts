import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// 12_7 Сборщик вместо вэбпака
export default defineConfig({
   plugins: [
      svgr({ exportAsDefault: true }), // 6min
      react(),
   ],
   resolve: {
      alias: [{ find: '@', replacement: '/src' }],
   },
   define: {
      __IS_DEV__: JSON.stringify(true),
      __API__: JSON.stringify('https://localhost:3001'),
      __PROJECT__: JSON.stringify('frontend'),
   },
});
