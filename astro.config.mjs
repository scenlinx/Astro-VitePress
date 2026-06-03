import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://astro-vitepress.newmt.fun',
  
  build: {
    inlineStylesheets: 'auto',
  },
  
  markdown: {
    syntaxHighlight: 'shiki',
  },

  experimental: {
    rustCompiler: true,
  },
});
