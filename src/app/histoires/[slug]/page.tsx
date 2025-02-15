"use client";

import { useParams } from 'next/navigation';
import Layout from "@/layout";
import { createClient } from "@/utils/supabase/client";
import { useQuery } from "@tanstack/react-query";

const HistoiresIdPage = () => {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;
  const supabase = createClient();

  const { data, isLoading } = useQuery({
    queryKey: ['histoires', slug],
    queryFn: async () => {
      const { data, error } = await supabase.from('histoires').select('*').eq('slug', slug).single();
      if (error) throw error;
      return data;
    }
  });

  if (isLoading) return <p>Chargement...</p>;

  return (
    <Layout>
      <h1 className="text-3xl font-bold">{data?.title}</h1>
      <p className="text-gray-600">ClickEtPaf{data?.excerpt}</p>
    </Layout>
  );
};

export default HistoiresIdPage;
