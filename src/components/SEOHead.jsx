import { useEffect } from 'react';
import { siteUrl } from '../config/seoConfig';

/**
 * SEOHead - Dynamic client-side meta tag, canonical link, and JSON-LD schema manager
 * Keeps document head perfectly synchronized with the active route and search intent.
 */
export default function SEOHead({
  title,
  description,
  keywords,
  canonicalPath = '',
  image = '/images/hero.png',
  schema,
  type = 'website',
}) {
  useEffect(() => {
    // 1. Update Title
    if (title) {
      document.title = title;
    }

    // 2. Helper to set or create meta tag
    const setMetaTag = (attribute, attrValue, content) => {
      if (!content) return;
      let el = document.querySelector(`meta[${attribute}="${attrValue}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attribute, attrValue);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // 3. Helper to set or create link tag
    const setLinkTag = (rel, href) => {
      if (!href) return;
      let el = document.querySelector(`link[rel="${rel}"]`);
      if (!el) {
        el = document.createElement('link');
        el.setAttribute('rel', rel);
        document.head.appendChild(el);
      }
      el.setAttribute('href', href);
    };

    const fullCanonicalUrl = `${siteUrl}${canonicalPath}`;
    const fullImageUrl = image.startsWith('http') ? image : `${siteUrl}${image}`;

    // Standard Meta
    setMetaTag('name', 'description', description);
    if (keywords) setMetaTag('name', 'keywords', keywords);

    // Canonical
    setLinkTag('canonical', fullCanonicalUrl);

    // Open Graph
    setMetaTag('property', 'og:title', title);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:url', fullCanonicalUrl);
    setMetaTag('property', 'og:image', fullImageUrl);
    setMetaTag('property', 'og:type', type);
    setMetaTag('property', 'og:site_name', 'AURA EVENTS');

    // Twitter
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', title);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', fullImageUrl);

    // 4. Inject JSON-LD Schema
    const scriptId = 'aura-dynamic-schema';
    let scriptTag = document.getElementById(scriptId);

    if (schema) {
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.id = scriptId;
        scriptTag.type = 'application/ld+json';
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(schema);
    } else if (scriptTag) {
      scriptTag.remove();
    }
  }, [title, description, keywords, canonicalPath, image, schema, type]);

  return null;
}
