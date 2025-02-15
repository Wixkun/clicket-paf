/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.clicket-paf.com',
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  sitemapSize: 5000,
  changefreq: 'daily',
  priority: 0.7,
  exclude: ['/api/*', '/admin/*', '/404', '/500'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api', '/admin'],
      },
    ],
    additionalSitemaps: ['https://www.clicket-paf.com/api/server-sitemap.xml'],
  },
  transform: async (config, path) => {
    let priority = 0.7;
    if (path === '/') priority = 1.0;
    if (path.startsWith('/histoires/')) priority = 0.8;

    return {
      loc: path,
      changefreq: config.changefreq,
      priority,
      lastmod: new Date().toISOString(),
      alternateRefs: [
        {
          href: `https://www.clicket-paf.com/fr${path}`,
          hreflang: 'fr',
        },
        {
          href: `https://www.clicket-paf.com/en${path}`,
          hreflang: 'en',
        },
      ],
    };
  },
};
