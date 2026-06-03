# Astro-VitePress：轻量的文档站方案，替代 VitePress 的极简选择

> 一个只依赖 Astro 的文档站点模板，Markdown 驱动，自动处理导航、侧边栏、搜索和 SEO。输出纯静态 HTML，零运行时 JavaScript 框架。

## 项目背景

写文档的时候想要一个简单的静态站点，VitePress 和 Docusaurus 都很好，但我的需求比较明确：需要一个足够轻量、容易定制、便于部署的方案。于是基于 Astro 6 写了一个文档站模板。

### 为什么不用 VitePress / Docusaurus？

| 对比维度 | VitePress | Docusaurus | Astro-VitePress |
|---|---|---|---|
| 运行时依赖 | Vue + Vite | React + Webpack | 仅 Astro |
| 输出 | SPA | SPA | 纯静态 HTML |
| 定制成本 | 需了解 Vue | 需了解 React | 纯 Markdown + Astro 组件 |
| 构建速度 | 快 | 较慢 | 极快（可选 Rust 编译器加速） |
| 包体积 | 中等 | 大 | 极小 |

**核心差异**：VitePress 和 Docusaurus 本质是 SPA 应用，需要客户端 JS 运行时来渲染导航。Astro-VitePress 输出的是纯静态 HTML，每个页面都是独立的、完整的 HTML 文档——这意味着更快的首屏加载、更好的 SEO、更低的服务器成本。

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
| 运行时依赖 | 仅 astro （可选安装 @astrojs/compiler-rs 启用 Rust 编译器加速） |

**一个关键设计决策**：本项目完全不依赖任何 CSS 框架（Tailwind、UnoCSS 等），所有样式通过 CSS 自定义属性（CSS Variables）实现。这意味着你可以通过修改几个 CSS 变量就完成主题定制，而不需要学习额外的工具链。

## 核心功能深度解析

### 1. Markdown 自动路由

`docs/` 目录下的 `.md` 文件自动映射为页面，无需手动配置路由：

```text
docs/index.md          → /
docs/about.md          → /about
docs/guide/quickstart.md → /guide/quickstart
docs/config/basics.md  → /config/basics
```

**实现原理**：使用 `[...slug].astro` 动态路由 + `import.meta.glob('/docs/**/*.md')` 在构建时收集所有 Markdown 文件。每个 `.md` 文件通过 `getStaticPaths()` 生成对应的静态 HTML 页面。路径映射由 `cleanSlug()` 函数处理：自动去除 `/docs/` 前缀、`.md` 后缀，并将 `/index` 结尾重定向到目录根路径。

**性能优化**：文档元数据加载结果通过内存缓存（TTL 5 分钟）避免重复 glob 导入，`navItems` 和 `allPages` 在 `getStaticPaths` 中预计算一次后注入每个页面的 props。

### 2. 导航和侧边栏

编辑 `src/config/site.ts` 中的 `navConfig` 数组即可配置导航：

```ts
export const navConfig: NavItem[] = [
  { type: 'page', id: '/', text: '首页' },
  { type: 'folder', id: 'guide', text: '指南' },
  { type: 'page', id: 'about', text: '关于' },
];
```

支持两种导航类型：

| 类型 | 说明 | 示例 |
|---|---|---|
| `page` | 独立页面，id 对应 slug | `{ type: 'page', id: 'about', text: '关于' }` |
| `folder` | 文件夹，自动链接到该目录下 order 最小的页面 | `{ type: 'folder', id: 'guide', text: '指南' }` |

**侧边栏**按当前所在文件夹动态生成，所有页面按 frontmatter 中的 `order` 字段升序排列（order 越小越靠前，默认 999）。

**上一篇/下一篇**自动串联：基于 `allPages` 数组计算当前页索引，自动生成前后页链接和 `<link rel="prev/next">` 标签。

### 3. SEO 全链路优化

每个页面自动注入 **20+ 个 SEO 标签**，远超同类工具：

**标准 Meta 标签**：
- `description`、`keywords`、`author`、`canonical`

**Open Graph（10 个标签）**：
- `og:title`、`og:description`、`og:type`、`og:url`、`og:site_name`、`og:locale`、`og:image`、`og:image:width`、`og:image:height`、`og:image:type`

**Twitter Card（6 个标签）**：
- `twitter:card`（summary_large_image）、`twitter:title`、`twitter:description`、`twitter:image`、`twitter:creator`、`twitter:site`

**JSON-LD 结构化数据**（两种 Schema）：
- `WebSite` 类型：含 `SearchAction` 搜索行为标注，帮助搜索引擎识别站内搜索功能
- `Article` 类型：含 `headline`、`author`(Person)、`publisher`(Organization + ImageObject logo)、`datePublished`、`dateModified`、`inLanguage`、`mainEntityOfPage`、`isPartOf`

**BreadcrumbList**：内页自动生成面包屑 JSON-LD，提升搜索结果中的路径展示。

**Sitemap**：按路径层级动态分配优先级（首页 1.0 → 一级页面 0.9 → 二级页面 0.8 → 三级+ 0.7），`lastmod` 从 frontmatter `date` 字段读取，所有值经 XML 转义防注入。

**robots.txt**：自动生成，指向 sitemap URL。

### 4. 全文搜索

**架构设计**：
- 构建时通过 `search.json.ts` 端点生成搜索索引
- 客户端**延迟加载**：仅在首次打开搜索弹窗时才 fetch 索引文件
- 搜索逻辑完全在浏览器端执行，无需后端服务

**索引内容**：
- 每个页面提取 `title`、`description`、`content` 三个字段
- 使用 `compiledContent()` 获取 Astro 编译后的 HTML 内容，降级到 `rawContent`
- 清理 Markdown 语法符号后截取前 500 字符
- 过滤掉首页（index）

**搜索体验**：
- `Ctrl+K` / `Cmd+K` 全局快捷键打开搜索
- `Escape` 或点击遮罩层关闭
- 实时过滤，大小写不敏感
- 匹配文本用 `<mark>` 标签高亮
- 前 10 条结果，按匹配度排列

### 5. 暗色模式零闪烁

**这是 VitePress 级别的暗色模式实现**，采用三层架构：

| 层 | 位置 | 职责 |
|---|---|---|
| ThemeInit | `<head>` 同步脚本 | 在 DOM 渲染前读取 `localStorage` 或系统偏好，给 `<html>` 添加 `dark` class |
| ThemeScript | `<body>` 底部 | 绑定桌面端和移动端两个主题切换按钮的点击事件 |
| ThemeToggle | 导航栏组件 | 纯 UI 的太阳/月亮图标按钮 |

**关键设计**：`ThemeInit.astro` 的脚本使用 `is:inline` 指令，确保脚本原样输出到 `<head>` 中，同步执行。这保证了在页面渲染之前就设置好正确的主题 class，**彻底消除暗色模式切换时的白屏闪烁**。

### 6. 响应式三栏布局

| 屏幕宽度 | 布局 | 说明 |
|---|---|---|
| > 1024px | 三栏 | 侧边栏 + 主内容区 + 右侧 TOC 目录 |
| 768 - 1024px | 两栏 | 侧边栏 + 主内容区（TOC 隐藏） |
| < 768px | 单栏 | 抽屉式导航 + 浮动搜索/返回顶部按钮 |

**移动端交互细节**：
- 导航栏三点菜单按钮 + 抽屉面板
- 浮动按钮在滚动超过 300px 后显示
- 侧边栏通过 sub-nav 按钮 + overlay 遮罩层展开
- 滚动监听使用 `requestAnimationFrame` 节流 + `passive: true` 优化性能

### 7. 代码块复制按钮

所有 `<pre>` 代码块自动添加复制按钮：
- 使用 `navigator.clipboard.writeText()` API
- 点击后按钮文字从"复制"变为"已复制"，2 秒后恢复
- 纯 JavaScript 实现，无额外依赖
- 2 秒后按钮文字恢复原样

### 8. TOC 滚动监听

右侧目录通过 `IntersectionObserver` 实现 scrollspy：
- 当前阅读位置的标题自动高亮
- 点击 TOC 项平滑滚动到对应标题
- 点击时临时锁定 400ms，防止 observer 触发时抖动

## Markdown Frontmatter 完整参考

每个 `.md` 文件支持以下 frontmatter 字段：

| 字段 | 用途 | 必填 | 默认值 |
|---|---|---|---|
| `title` | 页面标题 | ✅ | - |
| `description` | SEO 描述 | 推荐 | 站点默认描述 |
| `keywords` | SEO 关键词 | 可选 | 站点默认关键词 |
| `date` | 更新日期 | 可选 | 当天日期 |
| `order` | 侧边栏排序 | 可选 | 999 |

**首页专用字段**（仅 `docs/index.md`）：

| 字段 | 用途 |
|---|---|
| `heroTitle` | Hero 区域标题 |
| `heroDesc` | Hero 区域描述 |
| `primaryAction` / `primaryActionLink` | 主按钮文字和链接 |
| `secondaryAction` / `secondaryActionLink` | 次按钮文字和链接 |
| `features` | 特性网格（`{title, desc}` 数组） |

## 站点配置一览

`src/config/site.ts` 集中管理 17 个配置项：

```ts
export const siteConfig = {
  // 基本信息
  name: 'Astro-VitePress',
  url: 'https://your-domain.com',
  author: 'Your Name',
  description: '站点描述',
  keywords: '关键词1,关键词2',

  // 语言和地区
  lang: 'zh-CN',
  locale: 'zh_CN',

  // 社交
  twitter: '@your_twitter',
  github: 'https://github.com/your/repo',

  // Logo 和图标
  ogImage: '/default-og.png',
  favicon: '/favicon.svg',
  appleTouchIcon: '/apple-touch-icon.svg',
  navLogo: '/logo.svg',
  heroLogo: '/hero-logo.svg',

  // 首页默认
  defaultHeroLink: '/guide/quickstart',

  // 搜索
  searchIndex: '/search.json',

  // 许可
  license: 'MIT',
};
```

## 快速开始

```bash
git clone https://github.com/scenlinx/astro-vitepress.git
cd astro-vitepress
npm install
npm run dev
```

创建第一篇文档：

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

构建部署：

```bash
npm run build
# dist/ 目录即为完整的静态站点
```

内置 Vercel 和 Netlify 配置文件，导入仓库即可自动部署。也兼容 GitHub Pages、Cloudflare Pages 等任何静态托管平台。

## 适用场景

- **个人项目文档** — 轻量快速，几分钟就能搭好
- **开源项目手册** — GitHub Pages 一键部署，零成本
- **团队内部知识库** — Markdown 协作，Git 版本管理
- **轻量技术博客** — SEO 友好，搜索友好

## 许可证

MIT License

GitHub：[github.com/scenlinx/astro-vitepress](https://github.com/scenlinx/astro-vitepress)  
在线演示：[astro-vitepress.newmt.fun](https://astro-vitepress.newmt.fun)
