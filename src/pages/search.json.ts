import fs from 'node:fs/promises';
import path from 'node:path';
import { loadAllDocsMeta } from '../config/docs';

export async function GET() {
  const { allMeta } = await loadAllDocsMeta();
  const docsDir = path.resolve('docs');
  
  const docs = allMeta.filter(m => m.slug !== 'index');
  const promises = docs.map(async (m) => {
    let content = '';
    try {
      const raw = await fs.readFile(path.resolve(m.path.replace('/docs/', docsDir + '/')), 'utf-8');
      content = raw.replace(/---[\s\S]*?---/, '').replace(/[#*`\[\]()>|\\]/g, ' ').trim();
    } catch {}
    return {
      title: m.frontmatter?.title || '',
      description: m.frontmatter?.description || '',
      content: content.slice(0, 500),
      url: `/${m.slug}`,
    };
  });
  
  const index = await Promise.all(promises);
  return new Response(JSON.stringify(index), {
    headers: { 'Content-Type': 'application/json' },
  });
}
