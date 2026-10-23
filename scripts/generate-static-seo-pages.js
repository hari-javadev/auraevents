import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { servicePagesData, getServiceSchema, getBreadcrumbSchema, getFaqSchema } from '../src/config/seoConfig.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');
const siteUrl = 'https://auraevents.in';

function generatePages() {
  const indexHtmlPath = path.join(distDir, 'index.html');
  if (!fs.existsSync(indexHtmlPath)) {
    console.error('dist/index.html not found. Run "npm run build" first.');
    process.exit(1);
  }

  const baseHtml = fs.readFileSync(indexHtmlPath, 'utf8');

  console.log('[SEO Generator] Generating static SEO HTML files for all service routes...');

  Object.values(servicePagesData).forEach((service) => {
    let pageHtml = baseHtml;

    // 1. Title
    pageHtml = pageHtml.replace(
      /<title>.*?<\/title>/i,
      `<title>${service.metaTitle}</title>`
    );

    // 2. Meta description
    pageHtml = pageHtml.replace(
      /<meta name="description" content=".*?" \/>/i,
      `<meta name="description" content="${service.description.replace(/"/g, '&quot;')}" />`
    );

    // 3. Meta keywords
    pageHtml = pageHtml.replace(
      /<meta name="keywords" content=".*?" \/>/i,
      `<meta name="keywords" content="${service.keywords.replace(/"/g, '&quot;')}" />`
    );

    // 4. Canonical link
    pageHtml = pageHtml.replace(
      /<link rel="canonical" href=".*?" \/>/i,
      `<link rel="canonical" href="${siteUrl}${service.path}" />`
    );

    // 5. Open Graph
    pageHtml = pageHtml.replace(
      /<meta property="og:title" content=".*?" \/>/i,
      `<meta property="og:title" content="${service.metaTitle.replace(/"/g, '&quot;')}" />`
    );
    pageHtml = pageHtml.replace(
      /<meta property="og:description" content=".*?" \/>/i,
      `<meta property="og:description" content="${service.description.replace(/"/g, '&quot;')}" />`
    );
    pageHtml = pageHtml.replace(
      /<meta property="og:url" content=".*?" \/>/i,
      `<meta property="og:url" content="${siteUrl}${service.path}" />`
    );
    pageHtml = pageHtml.replace(
      /<meta property="og:image" content=".*?" \/>/i,
      `<meta property="og:image" content="${siteUrl}${service.image}" />`
    );

    // 6. Twitter
    pageHtml = pageHtml.replace(
      /<meta name="twitter:title" content=".*?" \/>/i,
      `<meta name="twitter:title" content="${service.metaTitle.replace(/"/g, '&quot;')}" />`
    );
    pageHtml = pageHtml.replace(
      /<meta name="twitter:description" content=".*?" \/>/i,
      `<meta name="twitter:description" content="${service.description.replace(/"/g, '&quot;')}" />`
    );
    pageHtml = pageHtml.replace(
      /<meta name="twitter:image" content=".*?" \/>/i,
      `<meta name="twitter:image" content="${siteUrl}${service.image}" />`
    );

    // 7. Structured JSON-LD Schema
    const serviceSchema = {
      '@context': 'https://schema.org',
      '@graph': [
        getServiceSchema(service),
        getBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/#services' },
          { name: service.title, path: service.path },
        ]),
        service.faqs ? getFaqSchema(service.faqs) : null,
      ].filter(Boolean),
    };

    const schemaScript = `\n    <script type="application/ld+json">\n    ${JSON.stringify(serviceSchema, null, 2)}\n    </script>`;
    pageHtml = pageHtml.replace('</head>', `${schemaScript}\n  </head>`);

    // Output directory: dist/services/<slug>/index.html
    const targetDir = path.join(distDir, 'services', service.slug);
    fs.mkdirSync(targetDir, { recursive: true });
    fs.writeFileSync(path.join(targetDir, 'index.html'), pageHtml, 'utf8');

    // Also write dist/services/<slug>.html for direct file resolution
    fs.writeFileSync(path.join(distDir, 'services', `${service.slug}.html`), pageHtml, 'utf8');

    console.log(`  ✓ Generated /services/${service.slug}`);
  });

  // Ensure robots.txt & sitemap.xml are in dist
  const publicRobots = path.resolve(__dirname, '../public/robots.txt');
  const publicSitemap = path.resolve(__dirname, '../public/sitemap.xml');
  if (fs.existsSync(publicRobots)) {
    fs.copyFileSync(publicRobots, path.join(distDir, 'robots.txt'));
  }
  if (fs.existsSync(publicSitemap)) {
    fs.copyFileSync(publicSitemap, path.join(distDir, 'sitemap.xml'));
  }

  console.log('[SEO Generator] All static route snapshots successfully created.');
}

generatePages();
