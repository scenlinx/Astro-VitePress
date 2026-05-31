import fs from 'node:fs';
import path from 'node:path';
import { loadAllDocsMeta, cleanSlug } from '../config/docs';

export async function GET() {
  const { allMeta } = await loadAllDocsMeta();
  const docsDir = path.resolve('docs');
  const index = allMeta
    .filter(m => m.slug !== 'index')
    .map(m => {
      let content = '';
      try {
        const raw = fs.readFileSync(path.resolve(m.path.replace('/docs/', docsDir + '/')), 'utf-8');
        content = raw.replace(/---[\s\S]*?---/, '').replace(/[#*`\[\]()>|\\]/g, '').replace(/\s+/g, ' ').trim();
      } catch {}
      return {
        title: m.frontmatter?.title || '',
        description: m.frontmatter?.description || '',
        content: content.slice(0, 500),
        url: `/${m.slug}`,
      };
    });
  return new Response(JSON.stringify(index), {
    headers: { 'Content-Type': 'application/json' },
  });
}
