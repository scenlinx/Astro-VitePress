---
title: 基础配置
description: Astro-VitePress 基础配置说明，包括导航配置和 Frontmatter
keywords: Astro-VitePress, 配置, 基础, Frontmatter, 导航
date: '2026-06-02'
order: 1
---

# 基础配置

了解如何配置你的 Astro-VitePress 网站。

## 导航配置

编辑 `src/config/site.ts` 中的 `navConfig` 数组：

```ts
export const navConfig: NavItem[] = [
  { type: 'page', id: '/', text: '首页' },
  { type: 'folder', id: 'guide', text: '指南' },
  { type: 'folder', id: 'config', text: '配置' },
  { type: 'page', id: 'about', text: '关于' },
];
```

### 导航类型

- `type: 'page'` — 独立页面，`id` 对应 slug
- `type: 'folder'` — 文件夹导航，自动找到该目录下 `order` 最小的页面作为链接目标

### 侧边栏

侧边栏自动根据导航配置生成：
- 当前所在的文件夹下的所有文档会显示在左侧侧边栏
- 按 Frontmatter 中的 `order` 字段排序

## 站点配置

`src/config/site.ts` 中集中管理所有站点元信息：

```ts
export const siteConfig = {
  name: 'Astro-VitePress',
  url: 'https://astro-vitepress.newmt.fun',
  author: 'scenlinx',
  description: '网站描述',
  keywords: '关键词',
  lang: 'zh-CN',
};
```

## Frontmatter

每个 Markdown 文件通过 Frontmatter 配置页面元数据：

```yaml
---
title: 页面标题
description: 页面描述
keywords: 关键词
date: '2026-06-02'
order: 1
---
```

### 常用字段

- `title` — 页面标题，显示在侧边栏和浏览器标签
- `description` — SEO 描述
- `keywords` — SEO 关键词
- `date` — 更新日期，用于 sitemap 的 lastmod
- `order` — 侧边栏排序权重

## 构建配置

`astro.config.mjs` 中可配置构建选项：

```js
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://example.com',
  build: {
    inlineStylesheets: 'auto',
  },
  markdown: {
    syntaxHighlight: 'shiki',
  },
});
```
