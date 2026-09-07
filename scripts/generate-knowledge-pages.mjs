import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const dist = path.join(root, 'dist');
const source = fs.readFileSync(path.join(root, 'src/data/knowledgeStore.ts'), 'utf8');
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
const base = '/Art-Gallery/';
const site = 'https://duguboss.github.io/Art-Gallery/';

const nodes = [...source.matchAll(/n\('\s*([^']+)\s*',\s*'([^']+)\s*',\s*'([^']+)\s*',\s*'([^']+)\s*'/g)].map((m) => ({ id: m[1], slug: m[2], title: m[3], titleEn: m[4] }));
if (!nodes.length) throw new Error('No knowledge nodes found in knowledgeStore.ts');

function escapeHtml(value) { return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;'); }
function pageFor(node) {
  const title = `${node.title} · VISUAL ATLAS 创作者知识百科`;
  const description = `学习${node.title}：理解核心原理、实践方法、相关软件与创作工作流。Visual Atlas 创作者视觉知识百科。`;
  const url = `${site}knowledge/${node.slug}/`;
  const meta = `<title>${escapeHtml(title)}</title>\n    <meta name="description" content="${escapeHtml(description)}" />\n    <link rel="canonical" href="${url}" />\n    <meta property="og:title" content="${escapeHtml(title)}" />\n    <meta property="og:description" content="${escapeHtml(description)}" />\n    <meta property="og:url" content="${url}" />\n    <script type="application/ld+json">${JSON.stringify({ '@context':'https://schema.org', '@type':'TechArticle', headline:title, description, url, inLanguage:'zh-CN', isPartOf:{'@type':'WebSite',name:'VISUAL ATLAS',url:site} })}</script>`;
  return template.replace(/<title>[\s\S]*?<\/title>/, meta);
}

for (const node of nodes) {
  const dir = path.join(dist, 'knowledge', node.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), pageFor(node), 'utf8');
}

const urls = [site, ...nodes.map((n) => `${site}knowledge/${n.slug}/`)];
fs.writeFileSync(path.join(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map((url) => `<url><loc>${url}</loc></url>`).join('')}</urlset>\n`, 'utf8');
fs.writeFileSync(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${site}sitemap.xml\n`, 'utf8');
console.log(`Generated ${nodes.length} crawlable knowledge pages.`);
