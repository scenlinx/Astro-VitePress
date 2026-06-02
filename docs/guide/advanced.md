---
title: 高级用法
description: Astro-VitePress 高级功能和自定义配置技巧
keywords: Astro-VitePress, 高级, 自定义, 主题, CSS
date: '2026-06-02'
order: 2
---

# 高级用法

深入了解 Astro-VitePress 的高级功能。

## 自定义 CSS

所有样式通过 CSS 变量控制，编辑 `src/styles/global.css`：

```css
:root {
  --primary-color: #646cff;
  --gradient-brand: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --bg-color: #ffffff;
  --sidebar-bg: #f8fafc;
  --text-color: #213547;
}

.dark {
  --bg-color: #11151c;
  --sidebar-bg: #0d101a;
  --text-color: #e2e8f0;
}
```

## 首页配置

编辑 `docs/index.md` 的 Frontmatter：

```yaml
heroTitle: 我的项目
heroDesc: 项目描述
primaryAction: 快速开始
primaryActionLink: /guide/quickstart
secondaryAction: 在 GitHub 上查看
secondaryActionLink: https://github.com/user/repo
features:
  - title: 特性一
    desc: 特性描述
  - title: 特性二
    desc: 特性描述
```

## 站点元信息

编辑 `src/config/site.ts` 的 `siteConfig` 对象：

```ts
export const siteConfig = {
  name: 'Astro-VitePress',
  url: 'https://example.com',
  author: 'your-name',
  description: '网站描述',
  keywords: '关键词',
  lang: 'zh-CN',
  twitter: '@your-twitter',
  github: 'https://github.com/user/repo',
};
```

## 自定义 404 页面

编辑 `src/pages/404.astro` 即可自定义 404 页面的内容和样式。

## 代码块复制按钮

鼠标悬停在代码块上会自动显示复制按钮，点击即可复制内容到剪贴板。

## 搜索索引

搜索索引在 `src/pages/search.json.ts` 中生成，搜索功能在 `src/components/SearchModal.astro` 中实现。搜索内容取自每页的 `compiledContent` 并清理 Markdown 符号。
