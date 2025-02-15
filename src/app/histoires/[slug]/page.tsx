'use client';

import { useParams } from 'next/navigation';
import Layout from '@/layout';
import { createClient } from '@/utils/supabase/client';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import ReactMarkdown from 'react-markdown';

const HistoiresIdPage = () => {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;
  const supabase = createClient();

  const { data, isLoading } = useQuery({
    queryKey: ['histoires', slug],
    queryFn: async () => {
      try {
        const { data, error } = await supabase.from('histoires').select('*').eq('slug', slug).single();
        if (error) throw error;
        const { data: imageData } = await supabase.storage.from('histoires').createSignedUrl(`public/${data.id}`, 60);
        return { ...data, image: imageData?.signedUrl || '' };
      } catch (error) {
        console.error('Error fetching story:', error);
        return null;
      }
    },
  });

  return (
    <Layout>
      <main className="flex flex-col mt-14 gap-10 justify-center items-center">
        <header className="relative flex flex-col items-center justify-center w-full py-20 gap-8">
          <img src={data?.image} alt="Illustration de fond" className="absolute inset-0 w-full h-full object-cover" />

          <div className="absolute inset-0 bg-black opacity-50"></div>

          <div className="relative z-10 text-center">
            <h1 className="text-5xl max-sm:text-4xl font-bold text-white">ClickEtPaf</h1>
            <hr className="border-t border-white w-1/2 mx-auto" />
            <h2 className="text-3xl bg-gradient-to-r from-violet-400 to-violet-600 text-transparent bg-clip-text">
              {isLoading ? <Skeleton className="h-4 w-full" /> : data?.titre}
            </h2>
            <h3>{isLoading ? <Skeleton className="h-4 w-full" /> : <p>par {data?.auteur}</p>}</h3>
          </div>
        </header>

        <section className="w-3/4 max-w-4xl mx-auto px-4 mb-20 max-md:w-[90%]">
          {isLoading ? <Skeleton className="h-50 w-full" /> : <ReactMarkdown>{data?.contenu || ''}</ReactMarkdown>}
        </section>
      </main>
    </Layout>
  );
};

export default HistoiresIdPage;
