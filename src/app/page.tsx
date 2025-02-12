"use client";

import Layout from "@/layout";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";

// ! Important : importer les styles de Swiper
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

interface SlideData {
  date: string;
  featured: boolean;
  comments: number;
  title: string;
  excerpt: string;
  imageUrl: string;
}

const slidesData: SlideData[] = [
  {
    date: "February 1, 2019",
    featured: true,
    comments: 6,
    title: "At daybreak of the fifteenth day of my search",
    excerpt: "When the amphitheater had cleared I crept stealthily to the top and as the great excavation lay...",
    imageUrl: "/images/HistoireImg/img1.jpg",
  },
  {
    date: "March 12, 2019",
    featured: false,
    comments: 4,
    title: "A mesmerizing journey into the unknown",
    excerpt: "Dust storms swirling across the desert, the expedition marched on...",
    imageUrl: "/images/HistoireImg/img2.jpg",
  },
  {
    date: "April 20, 2019",
    featured: true,
    comments: 10,
    title: "Under the starlit sky",
    excerpt: "Night fell over the ruins, revealing secrets thought lost for centuries...",
    imageUrl: "/images/HistoireImg/img3.jpg",
  },
];

export default function HomePage() {
  return (
      <Layout variant={"landing"}>
        <section className="relative mb-8">
          <Swiper
              modules={[Navigation, Pagination, Autoplay, EffectFade]}
              navigation
              pagination={{ clickable: true }}
              effect="fade"
              autoplay={{ delay: 4000 }}
              loop={true}
              className="h-[500px] md:h-[600px] w-full"
          >
            {slidesData.map((slide, idx) => (
                <SwiperSlide key={idx}>
                  <div className="relative w-full h-full">
                    <img
                        src={slide.imageUrl}
                        alt={slide.title}
                        className="absolute top-0 left-0 w-full h-full object-cover"
                    />
                    {/** Overlay noir + texte **/}
                    <div className="relative z-10 flex items-center h-full bg-black/50">
                      <div className="max-w-xl text-white p-6 md:p-10">
                        <p className="text-sm text-gray-200 mb-2">
                          {slide.date} {slide.featured && "• Featured"} • {slide.comments} comments
                        </p>
                        <h2 className="text-2xl md:text-3xl font-bold mb-4">
                          {slide.title}
                        </h2>
                        <p className="text-gray-100">{slide.excerpt}</p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
            ))}
          </Swiper>
        </section>

        <div className="bg-gray-100 w-full">
          {/** Hero texte (simple) **/}
          <section className="text-center px-6 pt-8 pb-12">
            <h1 className="text-4xl font-bold">
              Discover the World's <span className="text-gray-500">Greatest</span> Stories
            </h1>
            <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
              Plongez dans des récits captivants allant du policier à la romance, en passant par la science-fiction.
            </p>
            <button className="mt-4 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800">
              Explore More
            </button>
          </section>

          <section className="mb-12 px-6">
            <h2 className="text-2xl font-semibold mb-4">Top Genres</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {["Policier", "Romance", "Science-Fiction", "Fantastique"].map(
                  (genre, index) => (
                      <div
                          key={index}
                          className="p-4 text-center rounded-md border bg-white"
                      >
                        <div className="bg-gray-300 h-40 w-full rounded-md mb-2" />
                        <p className="font-medium">{genre}</p>
                      </div>
                  )
              )}
            </div>
          </section>

          <section className="px-6 pb-8">
            <h2 className="text-2xl font-semibold mb-4">Latest Stories</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2 p-4 rounded-md bg-white border">
                <div className="bg-gray-300 h-60 w-full rounded-md mb-2" />
                <h3 className="font-semibold text-lg">
                  Le Mystère du Manoir Abandonné
                </h3>
                <p className="text-gray-600">
                  Une enquête haletante dans un manoir aux secrets bien gardés.
                </p>
              </div>
              <div className="space-y-4">
                {["Un Amour Interdit", "Les Chroniques du Futur", "L'Ombre du Détective"].map(
                    (story, index) => (
                        <div
                            key={index}
                            className="p-4 rounded-md bg-white border"
                        >
                          <div className="bg-gray-300 h-20 w-full rounded-md mb-2" />
                          <p className="font-medium">{story}</p>
                        </div>
                    )
                )}
              </div>
            </div>
          </section>
        </div>
      </Layout>
  );
}
