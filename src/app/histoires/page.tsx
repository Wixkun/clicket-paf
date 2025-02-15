'use client';

import { Dispatch, SetStateAction, useEffect, useState, useRef, useCallback } from 'react';
import { useQuery, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Layout from '@/layout';
import { createClient } from '@/utils/supabase/client';
import { Badge } from '@/components/ui/badge';
import HistoireCard from '@/components/histoire-card';
import { HistoireWithImage } from '@/types/histoire';
import { Skeleton } from '@/components/ui/skeleton';

interface Genre {
  id: string;
  nom: string;
}

const HistoiresPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const supabase = createClient();

  const [activesGenres, setActivesGenres] = useState<Genre[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const LIMIT = 9;

  const {
    data: genres,
    isLoading: genresIsLoading,
    error: genresError,
  } = useQuery<Genre[]>({
    queryKey: ['genres'],
    queryFn: async () => {
      try {
        const { data, error } = await supabase.from('genres').select('*');
        if (error) throw error;
        return data;
      } catch (error) {
        console.error('Erreur lors de la récupération des genres :', error);
        return [];
      }
    },
  });

  useEffect(() => {
    const genreParams = searchParams.get('genre')?.split(',');
    if (genreParams && genres) {
      const selectedGenres = genres.filter((g) => genreParams.includes(g.nom));
      setActivesGenres(selectedGenres);
    }
  }, [searchParams, genres]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (activesGenres.length > 0) {
      params.set('genre', activesGenres.map((g) => g.nom).join(','));
    }
    router.push(`/histoires${params.toString() ? `?${params.toString()}` : ''}`);
  }, [activesGenres, router]);

  useEffect(() => {
    const channel = supabase
      .channel('histoires')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'histoires' }, () => {
        queryClient.invalidateQueries({ queryKey: ['histoires'] });
      })
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [queryClient, supabase]);

  const {
    data: infiniteData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['histoires', activesGenres],
    initialPageParam: 1,
    queryFn: async ({ pageParam = 1 }) => {
      let query = supabase.from('histoires').select(`
				id,
				titre,
				slug,
				contenu,
				auteur,
				created_at,
				histoires_genres!inner(genre_id)
			`);

      if (activesGenres.length > 0) {
        query = query.in(
          'histoires_genres.genre_id',
          activesGenres.map((g) => g.id)
        );
      }

      query = query.range((pageParam - 1) * LIMIT, pageParam * LIMIT - 1);

      const { data, error } = await query;
      if (error) throw error;

      const histoiresWithImages = await Promise.all(
        data.map(async (histoire) => {
          try {
            const { data: imageData } = await supabase.storage.from('histoires').createSignedUrl(`public/${histoire.id}`, 60);
            return {
              ...histoire,
              image: imageData?.signedUrl || '/images/HistoireImg/img1.jpg',
            };
          } catch (error) {
            return { ...histoire, image: null };
          }
        })
      );

      setHasMore(histoiresWithImages.length === LIMIT);
      return histoiresWithImages;
    },
    getNextPageParam: (_, pages) => {
      if (!hasMore) return undefined;
      return pages.length + 1;
    },
  });

  const observer = useRef<IntersectionObserver>();
  const lastHistoireRef = useCallback(
    (node: HTMLAnchorElement) => {
      if (isFetchingNextPage) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });

      if (node) observer.current.observe(node);
    },
    [isFetchingNextPage, fetchNextPage, hasNextPage]
  );

  if (status === 'error') {
    return (
      <Layout variant="main">
        <main>
          <section className="text-red-500 text-center mt-4">Erreur : {genresError?.message}</section>
        </main>
      </Layout>
    );
  }

  return (
    <Layout variant="main">
      <main className="pt-20 flex">
        <DrawerFilter genresIsLoading={genresIsLoading} genres={genres} activesGenres={activesGenres} setActivesGenres={setActivesGenres} />
        <section className="w-full md:ml-[300px] pl-4 pr-4">
          <MobileFilter
            genresIsLoading={genresIsLoading}
            genres={genres}
            activesGenres={activesGenres}
            setActivesGenres={setActivesGenres}
          />
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3" aria-label="Liste d'histoires">
            {infiniteData?.pages.map((page, pageIndex) =>
              page.map((histoire: HistoireWithImage, index: number) => (
                <Link
                  href={`/histoires/${histoire.slug}`}
                  key={histoire.id}
                  ref={pageIndex === infiniteData.pages.length - 1 && index === page.length - 1 ? lastHistoireRef : undefined}
                >
                  <HistoireCard histoireWithImage={histoire} />
                </Link>
              ))
            )}
          </section>
          {isFetchingNextPage && <div className="text-center py-4">Chargement...</div>}
        </section>
      </main>
    </Layout>
  );
};

interface FilterProps {
  genresIsLoading: boolean;
  genres: Genre[] | undefined;
  activesGenres: Genre[];
  setActivesGenres: Dispatch<SetStateAction<Genre[]>>;
}

const DrawerFilter = ({ genresIsLoading, genres, activesGenres, setActivesGenres }: FilterProps) => {
  return (
    <aside
      className="hidden md:block w-[300px] bg-[#171717] h-full border-r p-4 fixed left-0 top-0 pt-20"
      aria-label="Filtres de recherche"
    >
      <header>
        <h2 className="text-lg font-semibold mb-4">Filtres</h2>
      </header>
      <nav>
        <ul className="flex flex-col gap-2">
          {genresIsLoading
            ? Array.from({ length: 5 }).map((_, index) => (
                <li key={index}>
                  <Skeleton className="h-4 w-full" />
                </li>
              ))
            : genres?.map((genre: Genre) => {
                const isSelected = activesGenres.some((g) => g.id === genre.id);
                return (
                  <li key={genre.id}>
                    <Badge
                      variant={isSelected ? 'default' : 'secondary'}
                      className={`
											w-full py-2 justify-between flex items-center
											hover:scale-[1.02] transition-all cursor-pointer
											${isSelected ? 'bg-primary/20 hover:bg-primary/30' : 'hover:bg-accent'}
										`}
                      onClick={() => {
                        if (isSelected) {
                          setActivesGenres((prev) => prev.filter((g) => g.id !== genre.id));
                        } else {
                          setActivesGenres((prev) => [...prev, genre]);
                        }
                      }}
                    >
                      {genre.nom}
                      {isSelected && <span>✓</span>}
                    </Badge>
                  </li>
                );
              })}
        </ul>
      </nav>
    </aside>
  );
};

const MobileFilter = ({ genresIsLoading, genres, activesGenres, setActivesGenres }: FilterProps) => {
  return (
    <header className="md:hidden">
      <nav>
        <ul className="flex gap-2 flex-wrap justify-center pb-4 mb-4">
          {genresIsLoading
            ? Array.from({ length: 5 }).map((_, index) => (
                <li key={index}>
                  <Skeleton className="h-4 w-full" />
                </li>
              ))
            : genres?.map((genre: Genre) => {
                const isSelected = activesGenres.some((g) => g.id === genre.id);
                return (
                  <li key={genre.id}>
                    <Badge
                      variant={isSelected ? 'secondary' : 'outline'}
                      className={`
                          hover:scale-[1.02] transition-all cursor-pointer
                          ${isSelected ? 'bg-primary/20 hover:bg-primary/30' : 'hover:bg-accent'}
                        `}
                      onClick={() => {
                        if (isSelected) {
                          setActivesGenres((prev) => prev.filter((g) => g.id !== genre.id));
                        } else {
                          setActivesGenres((prev) => [...prev, genre]);
                        }
                      }}
                    >
                      {genre.nom}
                      {isSelected && <span className="ml-1">✓</span>}
                    </Badge>
                  </li>
                );
              })}
        </ul>
      </nav>
    </header>
  );
};

export default HistoiresPage;
