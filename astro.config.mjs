import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://docs.panws.top',
  
  build: {
    // 提取 Shiki 样式为独立 CSS 文件，避免每页内联重复代码
    inlineStylesheets: 'never',
  },
  
  markdown: {
    syntaxHighlight: 'shiki',
  },
});
