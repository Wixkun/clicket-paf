"use client";

import { useParams } from 'next/navigation';
import Layout from "@/layout";
import { createClient } from "@/utils/supabase/client";
import { useQuery } from "@tanstack/react-query";
import React from "react";

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
      <main className="flex flex-col mt-14 gap-10">
        <header className="relative flex flex-col items-center justify-center w-full py-20 gap-8">
          <img
            src="/images/HistoireImg/genreFantasy.webp"
            alt="Illustration de fond"
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black opacity-50"></div>

          <div className="relative z-10 text-center">
            <h1 className="text-5xl max-sm:text-4xl font-bold text-white">ClickEtPaf</h1>
            <hr className="border-t border-white w-1/2 mx-auto" />
            <h2 className="text-3xl bg-gradient-to-r from-violet-400 to-violet-600 text-transparent bg-clip-text">
              title of story
            </h2>
          </div>
        </header>


        <section className='mx-60 max-[1400px]:mx-10 mb-20'>
          <p>content</p>
        </section>
      </main>
      <h2 className="text-3xl font-bold">{data?.title}</h2>
    </Layout>
  );
};

export default HistoiresIdPage;
