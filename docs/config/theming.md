---
title: 主题配置
description: VitePress 主题配置指南，包括主题、搜索和社交链接
keywords: VitePress, 主题, 配置, 搜索, 社交链接
date: '2026-05-31'
---

# 主题配置

自定义网站外观和功能。

## 主题

自定义主题配置：

```js
themeConfig: {
  logo: '/logo.svg',
  search: {
    provider: 'local'
  },
  socialLinks: [
    { icon: 'github', link: 'https://github.com' }
  ]
}
```

## Markdown 选项

配置 markdown 解析：

```js
markdown: {
  theme: 'github-dark',
  lineNumbers: true
}
```

## 部署

构建并部署到任意静态托管服务：

```bash
npm run build
# 将 dist/ 目录部署到服务器
```
