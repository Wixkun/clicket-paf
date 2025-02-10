"use client";

// Global imports
import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

// Scoped imports
import Layout from "@/layout";
import { createClient } from '@/utils/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";


const HistoiresPage = () => {
  const queryClient = useQueryClient();
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    const channel = supabase
      .channel('histoires')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'histoires',
        },
        (payload) => {
          queryClient.invalidateQueries({ queryKey: ['histoires'] });
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [queryClient]);

  const { data, isLoading, error } = useQuery({
    queryKey: ['histoires'],
    queryFn: async () => {
      try {
        const { data, error } = await supabase.from('histoires').select('*');
        console.log(data);
        return data;
      } catch (error) {
        console.error(error);
        return [];
      }
    },
  });

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Layout>
      {isLoading && <Skeleton className="w-[100px] h-[20px] rounded-full" />}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
        {data?.map((histoire: any) => (
          <div key={histoire.id}>
            <Card className="h-full hover:bg-accent cursor-pointer" onClick={() => {
              router.push(`/histoires/${histoire.id}`);
            }}>
              <CardHeader className="p-3">
                <CardTitle className="text-sm">
                  {histoire.titre}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3 pt-0 text-xs">
                {histoire.contenu}
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </Layout>
  );
};



export default HistoiresPage;
