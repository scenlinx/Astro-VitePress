import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://docs.panws.top',
  
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
