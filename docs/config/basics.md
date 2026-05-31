---
title: 基础配置
description: VitePress 基础配置说明，包括网站配置和 Frontmatter
keywords: VitePress, 配置, 基础, Frontmatter
date: '2026-05-31'
order: 1
---

# 基础配置

了解如何配置你的 VitePress 网站。

## 网站配置

主要配置文件是 `vitepress.config.js`：

```js
export default {
  title: '我的网站',
  description: '一个 VitePress 网站',
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/guide' }
    ],
    sidebar: [
      { text: '快速开始', link: '/guide' }
    ]
  }
}
```

## Frontmatter

使用 frontmatter 配置单个页面：

```yaml
---
title: 页面标题
description: 页面描述
sidebar: false
---
```
