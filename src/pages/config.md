---
layout: ../layouts/MainLayout.astro
title: 配置说明
---

# 配置

了解如何配置你的 VitePress 网站。

## 网站配置

主要配置文件是 `vitepress.config.js`：

```js
export default {
  // 网站标题
  title: '我的网站',
  
  // 网站描述（用于 SEO）
  description: '一个 VitePress 网站',
  
  // 主题配置
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

## 主题配置

自定义网站外观：

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

## Frontmatter

使用 frontmatter 配置单个页面：

```yaml
---
title: 页面标题
description: 页面描述
sidebar: false
---
```

## Markdown 选项

配置 markdown 解析：

```js
markdown: {
  theme: 'github-dark',
  lineNumbers: true
}
```
