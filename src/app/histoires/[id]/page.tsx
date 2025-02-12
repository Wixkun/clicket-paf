"use client";

import { useParams } from 'next/navigation';
import Layout from "@/layout";
import { createClient } from "@/utils/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { NextSeo } from 'next-seo';

const HistoiresIdPage = () => {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const supabase = createClient();

  const { data, isLoading } = useQuery({
    queryKey: ['histoires', id],
    queryFn: async () => {
      const { data, error } = await supabase.from('histoires').select('*').eq('id', id).single();
      if (error) throw error;
      return data;
    }
  });

  if (isLoading) return <p>Chargement...</p>;

  return (
    <Layout>
      <NextSeo
        title={`${data?.title} - ClickEtPaf`}
        description={data?.excerpt || "Découvrez cette histoire absurde et hilarante sur ClickEtPaf."}
        canonical={`https://www.clicket-paf.com/histoires/${id}`}
        openGraph={{
          title: data?.title,
          description: data?.excerpt,
          url: `https://www.clicket-paf.com/histoires/${id}`,
          images: [{ url: data?.image || "https://www.clicket-paf.com/default-story.jpg" }],
        }}
      />

      <h1 className="text-3xl font-bold">{data?.title}</h1>
      <p className="text-gray-600">{data?.excerpt}</p>
    </Layout>
  );
};

export default HistoiresIdPage;
