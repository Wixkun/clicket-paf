import { getServerSideSitemap } from 'next-sitemap';
import type { ISitemapField } from 'next-sitemap';
import { createClient } from '@/utils/supabase/server';

export async function GET() {
  const supabase = await createClient();

  // Récupérer toutes les histoires
  const { data: histoires } = await supabase.from('histoires').select('slug, updated_at');

  // Créer les entrées du sitemap
  const sitemapEntries: ISitemapField[] =
    histoires?.map((histoire) => ({
      loc: `https://www.clicket-paf.com/histoires/${histoire.slug}`,
      lastmod: new Date(histoire.updated_at).toISOString(),
      changefreq: 'weekly' as const,
      priority: 0.8,
      alternateRefs: [
        {
          href: `https://www.clicket-paf.com/fr/histoires/${histoire.slug}`,
          hreflang: 'fr',
        },
        {
          href: `https://www.clicket-paf.com/en/histoires/${histoire.slug}`,
          hreflang: 'en',
        },
      ],
    })) || [];

  return getServerSideSitemap(sitemapEntries);
}
