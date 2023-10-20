import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import eslintPlugin from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // 配置vite在运行的时候自动检测eslint规范
    eslintPlugin({
      include: ['src/**/*.ts', 'src/**/*.js', 'src/**/*.vue', 'src/*.ts', 'src/*.js', 'src/*.vue'],
      fix: true // 自动修复源代码
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 6699
  }
});
