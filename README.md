<p align="center">
  <img src="./public/favicon.svg" width="80" alt="Astro-VitePress Logo" />
</p>

<h1 align="center">Astro-VitePress</h1>

<p align="center">
  <strong>基于 Astro 5 的零配置文档站点生成器，Markdown 驱动，极速加载</strong>
</p>

<p align="center">
  <a href="https://docs.panws.top"><strong>在线演示 →</strong></a>
  ·
  <a href="#快速开始"><strong>快速开始</strong></a>
  ·
  <a href="https://github.com/scenlinx/astro-vitepress"><strong>GitHub</strong></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Astro-5.0+-BC52EE?logo=astro&logoColor=white" alt="Astro 5" />
  <img src="https://img.shields.io/badge/License-MIT-green" alt="License" />
  <img src="https://img.shields.io/badge/TypeScript-Ready-3178C6?logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/SEO-Friendly-FF6B6B" alt="SEO Friendly" />
</p>

---

## ✨ 特性

- 🚀 **基于 Astro 5** — 岛屿架构，默认零 JavaScript，输出纯静态 HTML
- 📝 **Markdown 驱动** — 只需编写 `.md` 文件，自动生成完整文档站点
- ⚡ **零配置** — 将 Markdown 放入 `docs/` 目录，导航、侧边栏、TOC 全部自动生成
- 🔍 **SEO 完善** — 内置 Open Graph、Twitter Card、JSON-LD 结构化数据、Canonical URL
- 🎨 **主题系统** — 支持亮色/暗色模式自动切换，品牌渐变配色
- 📱 **响应式设计** — 桌面端三栏布局 + 移动端抽屉式导航
- 🔎 **全文搜索** — 内置客户端搜索，支持中文
- 📑 **自动目录** — 基于 h2/h3 标题自动生成右侧 TOC
- 🔗 **前后导航** — 自动生成上一篇/下一篇文档链接
- 🎯 **零依赖** — 仅依赖 Astro，无额外运行时库

## 🏗️ 项目结构

```
astro-vitepress/
├── docs/                    # 📄 文档目录（放置 .md 文件）
│   ├── index.md             #   首页（Hero + Features）
│   ├── about.md             #   关于页面
│   ├── guide/               #   指南板块
│   │   ├── quickstart.md
│   │   └── advanced.md
│   └── config/              #   配置板块
│       ├── basics.md
│       └── theming.md
├── src/
│   ├── components/          # 🧩 组件
│   │   ├── SEOMeta.astro    #   SEO 元标签（OG/Twitter/JSON-LD）
│   │   ├── SearchModal.astro#   搜索弹窗
│   │   ├── NavDrawer.astro  #   移动端导航抽屉
│   │   └── ...
│   ├── config/              # ⚙️ 配置
│   │   ├── site.ts          #   导航与站点配置
│   │   └── docs.ts          #   文档加载与路由逻辑
│   ├── layouts/             # 📐 布局
│   │   ├── HomeLayout.astro #   首页布局
│   │   └── MainLayout.astro #   文档页布局
│   └── pages/               # 📃 页面路由
│       ├── index.astro      #   首页
│       └── [...slug].astro  #   动态文档路由
├── public/                  # 🖼️ 静态资源
│   ├── favicon.svg
│   ├── og-image.svg
│   ├── apple-touch-icon.svg
│   └── style.css
├── astro.config.mjs         # Astro 配置
├── vercel.json              # Vercel 部署配置
├── netlify.toml             # Netlify 部署配置
└── package.json
```

## 🚀 快速开始

### 前置要求

- **Node.js** ≥ 18.0
- **npm** 或 **pnpm**

### 安装运行

```bash
# 克隆项目
git clone https://github.com/scenlinx/astro-vitepress.git
cd astro-vitepress

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview
```

### 编写文档

1. 在 `docs/` 目录下创建 `.md` 文件
2. 添加 Frontmatter 元数据：

```yaml
---
title: 我的文档
description: 文档描述
keywords: 关键词, 多个关键词
date: 2026-06-01
order: 1
---
```

3. 保存文件，开发服务器自动热更新

### 配置导航

编辑 `src/config/site.ts`：

```ts
export const navConfig: NavItem[] = [
  { type: 'page', id: '/', text: '首页' },
  { type: 'folder', id: 'guide', text: '指南' },
  { type: 'folder', id: 'config', text: '配置' },
  { type: 'page', id: 'about', text: '关于' },
];
```

- `type: 'folder'` — 文件夹导航，自动链接到该目录下 order 最小的页面
- `type: 'page'` — 独立页面导航

### 首页配置

编辑 `docs/index.md` 的 Frontmatter：

```yaml
heroTitle: 我的项目
heroDesc: 一句话描述你的项目
primaryAction: 快速开始
primaryActionLink: /guide/quickstart
secondaryAction: GitHub
secondaryActionLink: https://github.com/your/repo
features:
  - title: 特性一
    desc: 特性描述
  - title: 特性二
    desc: 特性描述
```

### 部署

```bash
npm run build
```

`dist/` 目录即为完整的静态站点，可部署到任意静态托管服务。

项目已内置 **Vercel** 和 **Netlify** 的部署配置文件，零配置一键部署：

#### ▲ Vercel（推荐）

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/scenlinx/astro-vitepress)

1. 点击上方按钮，或登录 [Vercel](https://vercel.com) 导入 GitHub 仓库
2. Vercel 自动识别 `vercel.json`，无需任何手动配置
3. 点击 Deploy，30 秒内完成部署
4. 自动获得 `*.vercel.app` 免费域名，支持自定义域名 + 自动 HTTPS

**Vercel 免费额度**：100GB 带宽/月、6000 构建分钟/月，个人项目完全够用。

#### Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/scenlinx/astro-vitepress)

1. 点击上方按钮，或登录 [Netlify](https://netlify.com) 导入 GitHub 仓库
2. Netlify 自动读取 `netlify.toml` 配置
3. 点击 Deploy site，完成后获得 `*.netlify.app` 免费域名
4. 支持自定义域名、自动 HTTPS、表单处理等

**Netlify 免费额度**：100GB 带宽/月、300 构建分钟/月。

#### 其他平台

也支持部署到 **GitHub Pages**、**Cloudflare Pages** 等任意静态托管服务。

## 🎨 主题定制

### 颜色变量

所有颜色通过 CSS 变量控制（`public/style.css`）：

```css
:root {
  --primary-color: #646cff;
  --bg-color: #ffffff;
  --sidebar-bg: #f8fafc;
  --text-color: #213547;
  /* ... 更多变量 */
}

.dark {
  --bg-color: #11151c;
  --sidebar-bg: #0d101a;
  --text-color: #e2e8f0;
  /* ... */
}
```

### 品牌渐变

默认使用紫色渐变 `#667eea → #764ba2`，可修改 `--gradient-brand` 变量。

## 📊 SEO 能力

每个页面自动注入完整的 SEO 元标签：

| 功能 | 说明 |
|------|------|
| **Meta Tags** | `description`、`keywords`、`author` |
| **Open Graph** | `og:title`、`og:description`、`og:image`、`og:type`、`og:url` |
| **Twitter Card** | `summary_large_image` 卡片 |
| **JSON-LD** | WebSite / Article 结构化数据 |
| **Canonical** | 规范链接，避免重复内容 |
| **Preload** | 预加载关键 CSS 资源 |

## 🔧 脚本

| 命令 | 说明 |
|------|------|
| `npm run dev` | 启动开发服务器（自动打开浏览器） |
| `npm run build` | 构建生产版本到 `dist/` |
| `npm run preview` | 本地预览生产构建 |
| `npm run lint` | TypeScript 类型检查 |

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

1. Fork 本项目
2. 创建特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 创建 Pull Request

## 📄 许可证

[MIT License](LICENSE) © [scenlinx](https://github.com/scenlinx)

---

<p align="center">
  <sub>Built with ❤️ using Astro</sub>
</p>

---

<p align="center">
  <img src="https://api.star-history.com/svg?repos=scenlinx/astro-vitepress&type=Date" width="600" alt="Star History Chart" />
</p>
