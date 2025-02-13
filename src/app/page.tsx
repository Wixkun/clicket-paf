"use client";

import Layout from "@/layout";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";

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

        <div className="bg-background w-full">
          {/** Hero texte (simple) **/}
          <section className="text-center px-6 pt-16 pb-20">
            <h1 className="text-5xl font-bold text-white mb-6">
              Discover the World's{" "}
              <span className="bg-gradient-to-r from-violet-400 to-violet-600 text-transparent bg-clip-text">
                Greatest
              </span>{" "}
              Stories
            </h1>
            <p className="text-gray-300 mt-4 max-w-2xl mx-auto text-lg">
              Plongez dans des récits captivants allant du policier à la romance,
              en passant par la science-fiction.
            </p>
            <button className="
              mt-8 px-8 py-3
              bg-violet-600 text-white
              rounded-full font-medium
              transition-all duration-300
              hover:bg-violet-700 hover:scale-105
              border border-violet-500
              shadow-lg shadow-violet-500/20
            ">
              Explore More
            </button>
          </section>

          <section className="mb-12">
            <div className="px-6 mb-4">
              <h2 className="text-2xl font-semibold text-white">Top Genres</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-4">
              {["Policier", "Romance", "Science-Fiction", "Fantastique"].map(
                  (genre, index) => (
                    <div className="w-full" key={index}>
                      <div
                        className="
                          rounded-2xl overflow-hidden
                          bg-black/20 backdrop-blur-sm
                          transition-all duration-300
                          hover:scale-[1.02] hover:bg-black/40
                        "
                      >
                        <img
                          src="/images/HistoireImg/img1.jpg"
                          alt="Product Image"
                          width={600}
                          height={400}
                          className="w-full h-64 object-cover opacity-90"
                          style={{ aspectRatio: "600/400", objectFit: "cover" }}
                        />
                        <div className="p-4">
                          <h3 className="text-xl font-semibold text-white">{genre}</h3>
                        </div>
                      </div>
                    </div>
                  )
              )}
            </div>
          </section>

          <section className="px-6 pb-8">
            <h2 className="text-2xl font-semibold mb-4">Latest Stories</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2">
                <div 
                  className="
                    rounded-2xl overflow-hidden
                    bg-black/20 backdrop-blur-sm
                    transition-all duration-300
                    hover:scale-[1.02] hover:bg-black/40
                    h-full
                  "
                >
                  <img
                    src="/images/HistoireImg/img1.jpg"
                    alt="Featured Story"
                    className="w-full h-[400px] object-cover opacity-90"
                  />
                  <div className="p-6">
                    <h3 className="font-semibold text-xl text-white mb-2">
                      Le Mystère du Manoir Abandonné
                    </h3>
                    <p className="text-gray-300">
                      Une enquête haletante dans un manoir aux secrets bien gardés.
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                {["Un Amour Interdit", "Les Chroniques du Futur", "L'Ombre du Détective"].map(
                    (story, index) => (
                      <div className="w-full" key={index}>
                        <div
                          className="
                            rounded-2xl overflow-hidden
                            bg-black/20 backdrop-blur-sm
                            transition-all duration-300
                            hover:scale-[1.02] hover:bg-black/40
                          "
                        >
                          <img
                            src="/images/HistoireImg/img1.jpg"
                            alt={story}
                            className="w-full h-32 object-cover opacity-90"
                          />
                          <div className="p-4">
                            <h3 className="text-xl font-semibold text-white">{story}</h3>
                          </div>
                        </div>
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
