"use client";

import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import Layout from "@/layout";
import { createClient } from "@/utils/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

type Histoire = {
  id: string;
  titre: string;
  contenu: string;
};

const HistoiresPage = () => {
  const queryClient = useQueryClient();
  const supabase = createClient();
  const router = useRouter();

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

  const { data, isLoading, error } = useQuery<Histoire[]>({
    queryKey: ["histoires"],
    queryFn: async () => {
      const { data, error } = await supabase.from("histoires").select("*");
      if (error) throw error;
      return data || [];
    },
  });

  if (error) {
    return <div className="text-red-500 text-center mt-4">Erreur : {error.message}</div>;
  }

  return (
    <Layout>
      <h1 className="text-3xl font-bold text-center my-4">Histoires</h1>

      {isLoading && (
        <div className="flex justify-center">
          <Skeleton className="w-[200px] h-[40px] rounded-md" />
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
        {data?.map((histoire) => (
          <Card
            key={histoire.id}
            className="h-full hover:bg-accent cursor-pointer transition duration-200"
            onClick={() => router.push(`/histoires/${histoire.id}`)}
          >
            <CardHeader className="p-3">
              <CardTitle className="text-sm">{histoire.titre}</CardTitle>
            </CardHeader>
            <CardContent className="p-3 pt-0 text-xs">{histoire.contenu}</CardContent>
          </Card>
        ))}
      </div>
    </Layout>
  );
};

export default HistoiresPage;
