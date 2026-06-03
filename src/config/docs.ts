import { navConfig } from './site';
import { DocsCache } from '../utils/cache';

export interface NavLink {
  text: string;
  link: string;
}

export interface SidebarItem {
  text: string;
  link: string;
  order: number;
}

export interface DocMeta {
  path: string;
  slug: string;
  frontmatter: Record<string, any>;
  headings?: { depth: number; slug: string; text: string }[];
}

export const cleanSlug = (p: string): string =>
  p.replace('/docs/', '').replace(/\.md$/, '').replace(/\/index$/, '');

// ---- 模块级公共辅助函数（避免重复定义） ----
const toSidebarItem = (m: DocMeta): SidebarItem => ({
  text: m.frontmatter?.title || '',
  link: `/${m.slug}`,
  order: m.frontmatter?.order ?? 999,
});

const sortByOrder = (a: SidebarItem, b: SidebarItem) => a.order - b.order;

// ---- 公共 API ----
type MarkdownModule = {
  frontmatter: Record<string, any>;
  getHeadings?: () => { depth: number; slug: string; text: string }[];
};

export async function loadAllDocsMeta(): Promise<{ allMeta: DocMeta[]; modules: Record<string, any> }> {
  return DocsCache.getOrCompute('docs-meta', async () => {
    const docsGlob = import.meta.glob<MarkdownModule>('/docs/**/*.md');
    const entries = Object.entries(docsGlob);
    
    const promises = entries.map(async ([path, loader]) => {
      const mod = await loader();
      return { path, slug: cleanSlug(path), frontmatter: mod.frontmatter || {}, module: mod };
    });
    
    const results = await Promise.all(promises);
    
    // 一次遍历完成数据重组
    const allMeta: DocMeta[] = [];
    const modules: Record<string, any> = {};
    for (const r of results) {
      allMeta.push({
        path: r.path,
        slug: r.slug,
        frontmatter: r.frontmatter,
        headings: r.module?.getHeadings?.() || [],
      });
      modules[r.path] = r.module;
    }
    
    return { allMeta, modules };
  });
}

export function buildNavItems(allMeta: DocMeta[]): NavLink[] {
  return navConfig.map(item => {
    if (item.type === 'folder') {
      const pages = allMeta.filter(m => m.path.startsWith(`/docs/${item.id}/`));
      const sorted = [...pages].sort((a, b) => (a.frontmatter?.order ?? 999) - (b.frontmatter?.order ?? 999));
      const first = sorted[0];
      return { text: item.text, link: `/${cleanSlug(first?.path || '')}` };
    }
    return { text: item.text, link: item.id === '/' ? '/' : `/${item.id}` };
  });
}

export function buildAllPages(allMeta: DocMeta[]): SidebarItem[] {
  const pages: SidebarItem[] = [];
  navConfig.forEach(item => {
    if (item.type === 'folder') {
      const ps = allMeta.filter(m => m.path.startsWith(`/docs/${item.id}/`)).map(toSidebarItem).sort(sortByOrder);
      pages.push(...ps);
    } else if (item.type === 'page' && item.id !== '/') {
      const ps = allMeta.filter(m => m.slug === item.id).map(toSidebarItem);
      pages.push(...ps);
    }
  });
  return pages;
}

export function buildSidebarItems(allMeta: DocMeta[], currentFolder: string): SidebarItem[] {
  const currentNav = navConfig.find(item => item.id === currentFolder);
  if (currentNav?.type === 'folder') {
    return allMeta.filter(m => m.path.startsWith(`/docs/${currentFolder}/`)).map(toSidebarItem).sort(sortByOrder);
  }
  return allMeta
    .filter(m => m.path.split('/')[2]?.indexOf('.') !== -1 && !m.path.endsWith('/index.md'))
    .map(toSidebarItem)
    .sort(sortByOrder);
}
