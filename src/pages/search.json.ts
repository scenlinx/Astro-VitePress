import { loadAllDocsMeta } from '../config/docs';

export async function GET() {
  const { allMeta, modules } = await loadAllDocsMeta();
  
  const docs = allMeta.filter(m => m.slug !== 'index');
  const promises = docs.map(async (m) => {
    let content = '';
    try {
      const mod = modules[m.path];
      // compiledContent/rawContent 可能是方法或属性，统一安全获取
      const raw = typeof mod?.compiledContent === 'function'
        ? mod.compiledContent()
        : (mod?.compiledContent || mod?.rawContent || '');
      // 确保是字符串再处理
      const text = typeof raw === 'string' ? raw : String(raw || '');
      // 清理 markdown 标记
      content = text.replace(/[#*`\[\]()>|\\]/g, ' ').trim();
    } catch {
      // fallback：使用 frontmatter 中的 description
      content = m.frontmatter?.description || '';
    }
    // 确保 content 是字符串再 slice
    const safeContent = typeof content === 'string' ? content : String(content || '');
    return {
      title: m.frontmatter?.title || '',
      description: m.frontmatter?.description || '',
      content: safeContent.slice(0, 500),
      url: `/${m.slug}`,
    };
  });
  
  const index = await Promise.all(promises);
  return new Response(JSON.stringify(index), {
    headers: { 'Content-Type': 'application/json' },
  });
}
