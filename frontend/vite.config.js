import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  server: {
    open: true,
    host: '0.0.0.0',
    port: 8080
  },
  resolve: {
    alias: [{ find: '~', replacement: path.resolve(__dirname, 'src') }]
  },
  define: {
    'process.env': {}
  }
});
