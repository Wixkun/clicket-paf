"use client";

import { useParams } from 'next/navigation'
import Layout from "@/layout";
import { createClient } from "@/utils/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";


const HistoiresIdPage = () => {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const supabase = createClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ['histoires', id],
    queryFn: async () => {
      try {
        const { data } = await supabase.from('histoires').select('*').eq('id', id).single();
        return data;
      } catch (error) {
        console.error(error);
        return null;
      }
    },
  });

  return (
    <Layout>
      {isLoading && <Skeleton className="w-[100px] h-[20px] rounded-full" />}
      {data?.titre ?? "Titre non disponible"}
      {data?.contenu ?? "Contenu non disponible"}
    </Layout>
  );
};

export default HistoiresIdPage;
