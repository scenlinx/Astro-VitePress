# Astro-VitePress：零依赖的轻量文档站方案，替代 VitePress 的极简选择

> 一个只依赖 Astro 的文档站点模板，Markdown 驱动，自动处理导航、侧边栏、搜索和 SEO。

## 项目背景

写文档的时候想要一个简单的静态站点，VitePress 和 Docusaurus 都很好，但我的需求比较明确：需要一个足够轻量、容易定制、便于部署的方案。于是基于 Astro 6 写了一个文档站模板。

### 为什么不用 VitePress / Docusaurus？

| 对比维度 | VitePress | Docusaurus | Astro-VitePress |
|---|---|---|---|
| 运行时依赖 | Vue + Vite | React + Webpack | 仅 Astro |
| 输出 | SPA | SPA | 纯静态 HTML |
| 定制成本 | 需了解 Vue | 需了解 React | 纯 Markdown + Astro 组件 |
| 构建速度 | 快 | 较慢 | 极快（Rust 编译器） |
| 包体积 | 中等 | 大 | 极小 |

GitHub：[github.com/scenlinx/astro-vitepress](https://github.com/scenlinx/astro-vitepress)  
在线演示：[astro-vitepress.newmt.fun](https://astro-vitepress.newmt.fun)

![项目预览](https://astro-vitepress.newmt.fun/image.png)

## 技术栈

| 层 | 选型 |
|---|---|
| 框架 | Astro 6 |
| 样式 | 纯 CSS（CSS 自定义属性） |
| 语法高亮 | Shiki |
| 搜索 | 客户端全文搜索 |
| 输出 | 纯静态 HTML |
| 运行时依赖 | 仅 astro |

## 核心功能

### Markdown 自动路由

`docs/` 目录下的 `.md` 文件自动映射为页面：

```text
docs/index.md          → /
docs/about.md          → /about
docs/guide/*.md        → /guide/*
docs/config/*.md       → /config/*
```

### 导航和侧边栏

编辑 `src/config/site.ts` 配置导航：

```ts
export const navConfig: NavItem[] = [
  { type: 'page', id: '/', text: '首页' },
  { type: 'folder', id: 'guide', text: '指南' },
  { type: 'page', id: 'about', text: '关于' },
];
```

- 文件夹类型自动链接到该目录下 order 最小的页面
- 侧边栏按当前文件夹和 frontmatter order 排序生成
- 上一篇/下一篇自动串联

### SEO

每个页面自动注入：

- Open Graph（title、description、image、type、url、locale）
- Twitter Card（summary_large_image）
- JSON-LD（WebSite / Article + BreadcrumbList）
- Canonical URL
- Sitemap（按路径层级分配优先级）
- robots.txt

### 全文搜索

搜索索引在构建时生成，客户端实时检索：

```text
Ctrl+K → 加载 search.json → 输入过滤 → 关键词高亮
```

### 暗色模式

同步读取 localStorage，无闪烁。支持系统偏好和手动切换。

### 响应式

| 屏幕宽度 | 布局 |
|---|---|
| > 1024px | 三栏（侧边栏 + 内容 + TOC） |
| 768 - 1024px | 两栏（侧边栏 + 内容） |
| < 768px | 单栏 + 抽屉导航 + 浮动按钮 |

## 快速开始

```bash
git clone https://github.com/scenlinx/astro-vitepress.git
cd astro-vitepress
npm install
npm run dev
```

创建文档：

```yaml
---
title: 我的页面
description: 页面描述
date: '2026-06-02'
order: 1
---

# 我的页面

文档内容。
```

构建：

```bash
npm run build
# dist/ 目录部署
```

内置 Vercel 和 Netlify 配置，导入仓库即可自动部署。

## 适用场景

- 个人项目文档
- 开源项目手册
- 团队内部知识库
- 轻量技术博客

## 效果预览

项目实际运行截图：

![文档首页](https://astro-vitepress.newmt.fun/image.png)

## 许可证

MIT License

GitHub：[github.com/scenlinx/astro-vitepress](https://github.com/scenlinx/astro-vitepress)  
在线演示：[astro-vitepress.newmt.fun](https://astro-vitepress.newmt.fun)
