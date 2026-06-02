import { loadAllDocsMeta, buildAllPages } from '../config/docs';
import { siteConfig } from '../config/site';

export async function GET() {
  const { allMeta } = await loadAllDocsMeta();
  const allPages = buildAllPages(allMeta);

  const baseUrl = siteConfig.url;
  const today = new Date().toISOString().split('T')[0];

  const urls = [
    // 首页
    `  <url><loc>${baseUrl}/</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>1.0</priority></url>`,
    // 所有文档页面
    ...allPages.map(
      (p) =>
        `  <url><loc>${baseUrl}${p.link}</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>`,
    ),
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
