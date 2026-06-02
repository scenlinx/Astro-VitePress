---
title: 快速开始
description: Astro-VitePress 快速入门指南，从安装到部署全流程
keywords: Astro-VitePress, 指南, 快速开始, 安装, 配置, 部署
date: '2026-06-02'
order: 1
---

# 快速开始

欢迎使用 Astro-VitePress！本指南将帮助你快速搭建文档网站。

## 前置要求

- **Node.js** ≥ 18.0
- **npm** 或 **pnpm**

## 安装

```bash
# 克隆项目
git clone https://github.com/scenlinx/astro-vitepress.git
cd astro-vitepress

# 安装依赖
npm install
```

## 启动开发服务器

```bash
npm run dev
```

开发服务器默认在 `http://localhost:4321` 启动，支持热更新，修改文件后自动刷新。

## 编写文档

在 `docs/` 目录下创建 `.md` 文件即可自动生成页面：

```markdown
---
title: 我的文档
description: 文档描述
keywords: 关键词
date: '2026-06-02'
order: 1
---

# 我的文档

这里是文档内容。
```

### Frontmatter 字段

| 字段 | 必需 | 说明 |
|------|------|------|
| `title` | 是 | 页面标题，显示在侧边栏和浏览器标签 |
| `description` | 推荐 | 页面描述，用于 SEO |
| `keywords` | 否 | SEO 关键词 |
| `date` | 否 | 更新日期，用于 sitemap |
| `order` | 否 | 侧边栏排序，越小越靠前 |

## 配置导航

编辑 `src/config/site.ts`：

```ts
export const navConfig: NavItem[] = [
  { type: 'page', id: '/', text: '首页' },
  { type: 'folder', id: 'guide', text: '指南' },
  { type: 'page', id: 'about', text: '关于' },
];
```

`type: 'folder'` 会自动链接到该目录下 `order` 最小的页面。

## 构建生产版本

```bash
npm run build
```

`dist/` 目录即为完整的静态站点。

## 预览构建结果

```bash
npm run preview
```

## 部署

将 `dist/` 目录部署到任意静态托管服务：

- **Vercel** — 已内置 `vercel.json`，导入仓库即可
- **Netlify** — 已内置 `netlify.toml`，导入仓库即可
- **GitHub Pages**、**Cloudflare Pages** 等也完全兼容
