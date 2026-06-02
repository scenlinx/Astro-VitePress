import { loadAllDocsMeta, buildAllPages } from '../config/docs';
import { siteConfig } from '../config/site';

export async function GET() {
  const { allMeta } = await loadAllDocsMeta();
  const allPages = buildAllPages(allMeta);

  const baseUrl = siteConfig.url;
  const today = new Date().toISOString().split('T')[0];
  // 从 frontmatter 读取日期，找不到则用今天
  const dateMap = new Map(allMeta.map(m => [m.slug, m.frontmatter?.date]));
  const homeDate = dateMap.get('index') || today;

  const urls = [
    `  <url><loc>${baseUrl}/</loc><lastmod>${homeDate}</lastmod><changefreq>weekly</changefreq><priority>1.0</priority></url>`,
    ...allPages.map((p) => {
      const slug = p.link.replace(/^\//, '');
      const lastmod = dateMap.get(slug) || today;
      const depth = slug.split('/').length;
      const priority = depth <= 1 ? '0.9' : depth === 2 ? '0.8' : '0.7';
      return `  <url><loc>${baseUrl}${p.link}</loc><lastmod>${lastmod}</lastmod><changefreq>monthly</changefreq><priority>${priority}</priority></url>`;
    }),
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
