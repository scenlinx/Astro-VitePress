import { loadAllDocsMeta } from '../config/docs';
import { siteConfig } from '../config/site';

export async function GET() {
  const { allMeta, modules } = await loadAllDocsMeta();
  
  const docs = allMeta.filter(m => m.slug !== 'index');
  const promises = docs.map(async (m) => {
    let content = '';
    try {
      const mod = modules[m.path];
      const raw = typeof mod?.compiledContent === 'function'
        ? String(mod.compiledContent())
        : String(mod?.rawContent ?? '');
      content = raw.replace(/[#*`\[\]()>|\\]/g, ' ').trim();
    } catch {
      content = m.frontmatter?.description || '';
    }
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
