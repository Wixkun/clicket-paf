"use client";

import React from "react";
import HistoireCard from "@/components/histoire-card";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import Layout from "@/layout";
import Link from "next/link";

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
		excerpt:
			"When the amphitheater had cleared I crept stealthily to the top and as the great excavation lay...",
		imageUrl: "/images/HistoireImg/img1.jpg",
	},
	{
		date: "March 12, 2019",
		featured: false,
		comments: 4,
		title: "A mesmerizing journey into the unknown",
		excerpt:
			"Dust storms swirling across the desert, the expedition marched on...",
		imageUrl: "/images/HistoireImg/img2.jpg",
	},
	{
		date: "April 20, 2019",
		featured: true,
		comments: 10,
		title: "Under the starlit sky",
		excerpt:
			"Night fell over the ruins, revealing secrets thought lost for centuries...",
		imageUrl: "/images/HistoireImg/img3.jpg",
	},
];

const genres = [
	{ name: "Policier", img: "/images/HistoireImg/genrePolicier.webp" },
	{ name: "Romance", img: "/images/HistoireImg/genreRomance.webp" },
	{ name: "Science-Fiction", img: "/images/HistoireImg/genreSCFI.webp" },
	{ name: "Fantastique", img: "/images/HistoireImg/genreFantasy.webp" },
];

export default function HomePage() {
	return (
		<Layout variant={"landing"}>
			<main>
				<header className='relative'>
					<Swiper
						modules={[Pagination, Autoplay, EffectFade]}
						pagination={{ clickable: true }}
						effect='fade'
						autoplay={{ delay: 4000 }}
						loop={true}
						className='h-[500px] md:h-[600px] w-full'
					>
						{slidesData.map((slide, idx) => (
							<SwiperSlide key={idx}>
								<div className='relative w-full h-full'>
									<img
										src={slide.imageUrl}
										alt={slide.title}
										className='absolute top-0 left-0 w-full h-full object-cover'
									/>
									<div className='relative z-10 flex items-center h-full bg-black/50'>
										<div className='max-w-xl text-white p-6 md:p-10'>
											<p className='text-sm text-gray-200 mb-2'>
												{slide.date}{" "}
												{slide.featured && "• Featured"}{" "}
												• {slide.comments} comments
											</p>
											<h2 className='text-2xl md:text-3xl font-bold mb-4'>
												{slide.title}
											</h2>
											<p className='text-gray-100'>
												{slide.excerpt}
											</p>
										</div>
									</div>
								</div>
							</SwiperSlide>
						))}
					</Swiper>
				</header>

				<section className='flex flex-col gap-4 text-center items-center px-6 py-20'>
					<header>
						<h1 className='text-5xl max-sm:text-2xl font-bold text-white'>
							ClickEtPaf <br /> Une recherche, un clic,{" "}
							<span className='bg-gradient-to-r from-violet-400 to-violet-600 text-transparent bg-clip-text'>
								une histoire,
							</span>{" "}
							une claque !
						</h1>
					</header>
					<p className='text-gray-300 max-sm:text-sm text-lg'>
						Plongez dans des récits courts mais percutants. Action,
						romance, science-fiction… chaque histoire vous embarque
						en un instant !
					</p>
					<nav>
						<Link href='/histoires'>
							<button
								className='
                  px-8 py-3 w-60 max-sm:text-sm max-sm:w-30
                  bg-violet-600 text-white
                  rounded-full font-medium
                  transition-all duration-300
                  hover:bg-violet-700 hover:scale-105
                  border border-violet-500
                  shadow-lg shadow-violet-500/20
                '
							>
								Voir les histoires
							</button>
						</Link>
					</nav>
				</section>

				<section className="mx-60 max-[1400px]:mx-10 mb-20">
					<h2 className="text-2xl font-semibold text-white mb-4">Top Genres</h2>
					<div className="grid grid-cols-4 gap-4 max-lg:grid-cols-2 max-md:grid-cols-1">
						{genres.map((genre, index) => (
							<article key={index} className="w-full">
								<Link href={`/histoires?genre=${genre.name}`}>
									<HistoireCard image={genre.img} title={genre.name} />
								</Link>
							</article>
						))}
					</div>
				</section>;

				<section className='mx-60 max-[1400px]:mx-10 mb-20'>
					<h2 className='text-2xl font-semibold mb-4 text-white'>
						Latest Stories
					</h2>
					<div className='flex flex-row gap-4 w-full max-lg:flex-col'>
						<article className='w-full'>
							<div
								className='
                  cursor-pointer
                  rounded-2xl overflow-hidden
                  bg-black/20 backdrop-blur-sm
                  transition-all duration-300
                  hover:scale-[1.02] hover:bg-black/40
                  h-full
                '
							>
								<img
									src='/images/HistoireImg/img1.jpg'
									alt='Featured Story'
									className='w-full h-[400px] object-cover opacity-90'
								/>
								<div className='p-6'>
									<h3 className='font-semibold text-xl max-md:text-md text-white mb-2'>
										Le Mystère du Manoir Abandonné
									</h3>
									<p className='text-gray-300 max-md:text-sm'>
										Une enquête haletante dans un manoir aux
										secrets bien gardés.
									</p>
								</div>
							</div>
						</article>
						<aside className='w-1/3 flex flex-col gap-4 max-lg:w-full max-lg:flex max-lg:flex-row max-md:flex-col'>
							{[
								"Un Amour Interdit",
								"Les Chroniques du Futur",
								"L'Ombre du Détective",
							].map((story, index) => (
								<article key={index} className='w-full'>
									<HistoireCard
										image='/images/HistoireImg/img1.jpg'
										title={story}
									/>
								</article>
							))}
						</aside>
					</div>
				</section>
			</main>
		</Layout>
	);
}
