---
title: 指南
description: VitePress 快速入门指南，包含安装、配置和功能特性说明
keywords: VitePress, 指南, 快速开始, 安装, 配置, 静态网站
date: '2026-05-31'
---

# 快速开始

欢迎使用 VitePress！本指南将帮助你开始构建文档网站。

## 安装

首先，你需要安装 VitePress：

```bash
npm install -D vitepress
```

## 快速启动

创建一个 markdown 文件并开始开发：

```bash
npx vitepress dev
```

## 功能特性

VitePress 内置了许多功能：

- **快速**: 基于 Vite，开发体验闪电般快速
- **Vue 驱动**: 在 markdown 中使用 Vue 组件
- **Markdown 扩展**: 支持目录、语法高亮等
- **主题定制**: 支持暗色模式的可定制主题
- **SEO 友好**: 内置 SEO 优化

## 配置

创建 `vitepress.config.js` 文件来配置你的网站：

```js
export default {
  title: '我的网站',
  description: '一个 VitePress 网站'
}
```

## 下一步

现在你已经设置好 VitePress，可以：

1. 添加更多页面
2. 自定义主题
3. 添加导航
4. 部署你的网站
