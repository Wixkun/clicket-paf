/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.clicket-paf.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  changefreq: 'daily',
  priority: 0.7,
  exclude: ['/api/*'],
  robotsTxtOptions: {
    additionalSitemaps: ['https://www.clicket-paf.com/sitemap.xml'],
  },
};
