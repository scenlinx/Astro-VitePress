export interface NavItem {
  type: 'folder' | 'page';
  id: string;
  text: string;
}

export const navConfig: NavItem[] = [
  { type: 'page', id: '/', text: '首页' },
  { type: 'folder', id: 'guide', text: '指南' },
  { type: 'folder', id: 'config', text: '配置' },
  { type: 'page', id: 'about', text: '关于' },
];

// ---- 站点元信息集中管理 ----
export const siteConfig = {
  // 基本信息
  name: 'Astro-VitePress',
  url: 'https://docs.panws.top',
  author: 'scenlinx',
  description: 'Astro-VitePress 是基于 Astro 的 仿VitePress 主题',
  keywords: 'Astro-VitePress, Astro, 静态网站, 文档生成器',
  lang: 'zh-CN',
  locale: 'zh_CN',
  twitter: '@scenlinx',
  github: 'https://github.com/scenlinx/astro-vitepress',

  // 图片 / Logo
  ogImage: '/og-image.svg',
  favicon: '/favicon.svg',
  appleTouchIcon: '/apple-touch-icon.svg',
  navLogo: '/nav-logo.svg',
  heroLogo: '/hero-logo.svg',

  // 样式
  stylesheet: '/style.css',

  // 首页默认链接
  defaultHeroLink: '/guide/quickstart',

  // 搜索
  searchIndex: '/search.json',

  // License
  license: 'MIT License',
} as const;
