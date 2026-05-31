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

### 基础标题
配置网站的基本标题和描述信息。

### 主题配置
通过 `themeConfig` 对象配置导航栏、侧边栏等。

## Frontmatter

使用 frontmatter 配置单个页面：

```yaml
---
title: 页面标题
description: 页面描述
sidebar: false
---
```

### 常用字段
`title`、`description`、`keywords` 是最常用的 frontmatter 字段。

### 自定义字段
可以添加任意自定义字段，在页面中通过 `frontmatter` 变量读取。
