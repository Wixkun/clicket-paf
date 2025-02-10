"use client";

// Global imports
import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

// Scoped imports
import Layout from "@/layout";
import { createClient } from '@/utils/supabase/client';
import { Card } from "@/components/ui/card";
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

  return (
    <Layout>
      {isLoading && <Skeleton className="w-[100px] h-[20px] rounded-full" />}
      {data?.map((histoire: any, index: any) => (
        <div key={histoire.id} className={`${index % 10 === 0 ? 'col-span-2' : ''}`}>
          <Card className="h-full" onClick={() => {
            router.push(`/histoires/${histoire.id}`);
          }}>
            <h2>{histoire.titre}</h2>
            <p>{histoire.contenu}</p>
          </Card>
        </div>
      ))}
    </Layout>
  );
};



export default HistoiresPage;
