import { navConfig } from './site';

export interface NavItem {
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
}

export const cleanSlug = (p: string): string =>
  p.replace('/docs/', '').replace(/\.md$/, '').replace(/\/index$/, '');

export async function loadAllDocsMeta(): Promise<{ allMeta: DocMeta[]; modules: Record<string, any> }> {
  const docsGlob = import.meta.glob('/docs/**/*.md');
  const entries = Object.entries(docsGlob);
  
  const promises = entries.map(async ([path, loader]) => {
    const mod = await loader();
    return { path, slug: cleanSlug(path), frontmatter: mod.frontmatter || {}, module: mod };
  });
  
  const results = await Promise.all(promises);
  
  const allMeta: DocMeta[] = results.map(r => ({
    path: r.path,
    slug: r.slug,
    frontmatter: r.frontmatter
  }));
  
  const modules: Record<string, any> = {};
  results.forEach(r => { modules[r.path] = r.module; });
  
  return { allMeta, modules };
}

export function buildNavItems(allMeta: DocMeta[]): NavItem[] {
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
  const toSidebar = (m: DocMeta): SidebarItem => ({
    text: m.frontmatter?.title || '',
    link: `/${m.slug}`,
    order: m.frontmatter?.order ?? 999,
  });
  const sortSidebar = (a: SidebarItem, b: SidebarItem) => a.order - b.order;
  const pages: SidebarItem[] = [];
  navConfig.forEach(item => {
    if (item.type === 'folder') {
      const ps = allMeta.filter(m => m.path.startsWith(`/docs/${item.id}/`)).map(toSidebar).sort(sortSidebar);
      pages.push(...ps);
    } else if (item.type === 'page' && item.id !== '/') {
      const ps = allMeta.filter(m => m.slug === item.id).map(toSidebar);
      pages.push(...ps);
    }
  });
  return pages;
}

export function buildSidebarItems(allMeta: DocMeta[], currentFolder: string): SidebarItem[] {
  const currentNav = navConfig.find(item =>
    item.type === 'folder' ? item.id === currentFolder : item.id === currentFolder,
  );
  const toSidebar = (m: DocMeta): SidebarItem => ({
    text: m.frontmatter?.title || '',
    link: `/${m.slug}`,
    order: m.frontmatter?.order ?? 999,
  });
  const sortSidebar = (a: SidebarItem, b: SidebarItem) => a.order - b.order;
  if (currentNav?.type === 'folder') {
    return allMeta.filter(m => m.path.startsWith(`/docs/${currentFolder}/`)).map(toSidebar).sort(sortSidebar);
  }
  return allMeta
    .filter(m => m.path.split('/')[2]?.indexOf('.') !== -1 && !m.path.endsWith('/index.md'))
    .map(toSidebar)
    .sort(sortSidebar);
}
