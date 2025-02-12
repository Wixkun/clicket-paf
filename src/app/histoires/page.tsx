"use client";

import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import Layout from "@/layout";
import { createClient } from "@/utils/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";

interface Histoire {
  id: string;
  titre: string;
  contenu: string;
  auteur: string;
  created_at: string;
  slug: string;
};

interface Genre {
  id: string;
  nom: string;
}

const HistoiresPage = () => {
  const queryClient = useQueryClient();
  const supabase = createClient();
  const router = useRouter();
  const [activesGenres, setActivesGenres] = useState<Genre[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 9,
  });

  const { data: genres, isLoading: genresLoading, error: genresError } = useQuery<Genre[]>({
    queryKey: ["genres"],
    queryFn: async () => {
      const { data, error } = await supabase.from("genres").select("*");
      if (error) throw error;
      return data || [];
    },
  });

  useEffect(() => {
    const channel = supabase
      .channel("histoires")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "histoires",
        },
        () => {
          queryClient.invalidateQueries({ queryKey: ["histoires"] });
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [queryClient, supabase]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["histoires", activesGenres],
    queryFn: async () => {
      let query = supabase
        .from("histoires")
        .select(`
          id,
          titre,
          slug,
          contenu,
          auteur,
          created_at,
          histoires_genres!inner(genre_id)
        `);

      if (activesGenres.length > 0) {
        query = query.in('histoires_genres.genre_id', activesGenres.map(g => g.id));
      }

      query = query.range((pagination.page - 1) * pagination.limit, pagination.page * pagination.limit - 1);

      const { data, error } = await query;
      if (error) throw error;
      return data || [];
    },
  });

  if (error) {
    return <div className="text-red-500 text-center mt-4">Erreur : {error.message}</div>;
  }

  return (
    <Layout variant={"main"}>
      <div className="flex pt-20">
        {/* Sidebar - cachée sur mobile */}
        <aside className="hidden md:block w-[300px] min-h-screen border-r p-4 fixed left-0 top-0 pt-20">
          <h2 className="text-lg font-semibold mb-4">Filtres</h2>
          <div className="flex flex-col gap-2">
            {genres?.map((genre) => {
              const isSelected = activesGenres.some(g => g.id === genre.id);
              return (
                <Badge
                  key={genre.id}
                  variant={isSelected ? "default" : "secondary"}
                  className={`
                    w-full py-2 justify-between flex items-center
                    hover:scale-[1.02] transition-all cursor-pointer
                    ${isSelected ? 'bg-primary/20 hover:bg-primary/30' : 'hover:bg-accent'}
                  `}
                  onClick={() => {
                    if (isSelected) {
                      setActivesGenres(prev => prev.filter(g => g.id !== genre.id));
                    } else {
                      setActivesGenres(prev => [...prev, genre]);
                    }
                  }}
                >
                  {genre.nom}
                  {isSelected && <span>✓</span>}
                </Badge>
              );
            })}
          </div>
        </aside>
        <main className="w-full md:ml-[300px] pl-4 pr-4">
          <div className="md:hidden flex gap-2 flex-wrap justify-center pb-4 mb-4">
            {genres?.map((genre) => {
              const isSelected = activesGenres.some(g => g.id === genre.id);
              return (
                <Badge
                  key={genre.id}
                  variant={isSelected ? "secondary" : "outline"}
                  className={`
                    hover:scale-[1.02] transition-all cursor-pointer
                    ${isSelected ? 'bg-primary/20 hover:bg-primary/30' : 'hover:bg-accent'}
                  `}
                  onClick={() => {
                    if (isSelected) {
                      setActivesGenres(prev => prev.filter(g => g.id !== genre.id));
                    } else {
                      setActivesGenres(prev => [...prev, genre]);
                    }
                  }}
                >
                  {genre.nom}
                  {isSelected && <span className="ml-1">✓</span>}
                </Badge>
              );
            })}
          </div>

          {/* Grid des histoires - une colonne sur mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {data?.map((histoire: any, index: number) => (
              <Card
                key={index}
                className="h-full hover:bg-accent cursor-pointer transition duration-200"
                onClick={() => router.push(`/histoires/${histoire.slug}`)}
              >
                <CardHeader className="p-3">
                  <CardTitle className="text-sm">{histoire.titre}</CardTitle>
                </CardHeader>
                <CardContent className="p-3 pt-0 text-xs">{histoire.contenu}</CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </Layout>
  );
};

export default HistoiresPage;
