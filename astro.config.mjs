import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://docs.panws.top',
  
  build: {
    // auto: 小 CSS 内联（减少请求），大 CSS 外链（利用缓存）
    inlineStylesheets: 'auto',
  },
  
  markdown: {
    syntaxHighlight: 'shiki',
  },
});
