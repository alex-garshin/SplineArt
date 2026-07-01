import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import handlebars from 'vite-plugin-handlebars';

const root = resolve(__dirname, 'src');
const pagesDir = resolve(root, 'pages');

export default defineConfig({
  root,
  publicDir: resolve(root, 'public'),
  plugins: [
    handlebars({
      partialDirectory: resolve(root, 'includes'),
      context(pagePath) {
        const relativePath = pagePath.replace(root, '').replace(/^\//, '');
        return {
          page: relativePath.replace(/\.html$/, '') || 'index',
        };
      },
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(root, 'assets'),
      '@scss': resolve(root, 'assets/scss'),
      '@js': resolve(root, 'assets/js'),
    },
  },
  css: {
    devSourcemap: true,
  },
  build: {
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index: resolve(root, 'index.html'),
        privacyPolicy: resolve(pagesDir, 'privacy-policy.html'),
        blog: resolve(pagesDir, 'blog.html'),
        blogArticle: resolve(pagesDir, 'blog-article.html'),
        development: resolve(pagesDir, 'development.html'),
        design: resolve(pagesDir, 'design.html'),
      },
    },
  },
});
