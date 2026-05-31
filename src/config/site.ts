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
