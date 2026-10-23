async function test() {
  const [robots, sitemap, weddingHtml, djHtml, homeHtml] = await Promise.all([
    fetch('http://localhost:5000/robots.txt').then((r) => r.text()),
    fetch('http://localhost:5000/sitemap.xml').then((r) => r.text()),
    fetch('http://localhost:5000/services/wedding-decorations').then((r) => r.text()),
    fetch('http://localhost:5000/services/dj-services').then((r) => r.text()),
    fetch('http://localhost:5000/').then((r) => r.text()),
  ]);

  console.log('=== ROBOTS.TXT ===');
  console.log(robots.trim());

  console.log('\n=== SITEMAP.XML URLS ===');
  const locs = sitemap.match(/<loc>(.*?)<\/loc>/g);
  locs.forEach((l) => console.log(' ', l.replace(/<\/?loc>/g, '')));

  console.log('\n=== WEDDING SERVICE PAGE VERIFICATION ===');
  console.log('Title:', weddingHtml.match(/<title>(.*?)<\/title>/)?.[1]);
  console.log('Canonical:', weddingHtml.match(/<link rel="canonical" href="(.*?)"/)?.[1]);
  console.log('Has Schema LD+JSON:', weddingHtml.includes('application/ld+json'));
  console.log('Has FAQ Schema:', weddingHtml.includes('"FAQPage"'));
  console.log('Has Breadcrumb Schema:', weddingHtml.includes('"BreadcrumbList"'));

  console.log('\n=== DJ SERVICE PAGE VERIFICATION ===');
  console.log('Title:', djHtml.match(/<title>(.*?)<\/title>/)?.[1]);
  console.log('Canonical:', djHtml.match(/<link rel="canonical" href="(.*?)"/)?.[1]);

  console.log('\n=== HOMEPAGE VERIFICATION ===');
  console.log('Title:', homeHtml.match(/<title>(.*?)<\/title>/)?.[1]);
  console.log('Has LocalBusiness Schema:', homeHtml.includes('"LocalBusiness"'));
  console.log('Has Noscript Content:', homeHtml.includes('<noscript>'));
}

test().catch(console.error);
