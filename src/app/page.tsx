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
import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/utils/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

const genresMap = [
	{ nom: "Fantastique", img: "/images/HistoireImg/genreFantasy.webp" },
	{ nom: "Horreur", img: "/images/HistoireImg/genreHorreur.webp" },
	{ nom: "Science-Fiction", img: "/images/HistoireImg/genreSCFI.webp" },
	{ nom: "Romance", img: "/images/HistoireImg/genreRomance.webp" },
	{ nom: "Aventure", img: "/images/HistoireImg/genreAventure.webp" },
	{ nom: "Policier", img: "/images/HistoireImg/genrePolicier.webp" },
	{ nom: "Drame", img: "/images/HistoireImg/genreDrame.webp" },
	{ nom: "Humour", img: "/images/HistoireImg/genreHumour.webp" },
	{ nom: "Anecdote", img: "/images/HistoireImg/genreAnecdote.webp" },
];

export default function HomePage() {
	const supabase = createClient();

	const { data: randomStories, isLoading: randomStoriesLoading } = useQuery({
		queryKey: ["randomStories"],
		queryFn: async () => {
			try {
				const { data, error } = await supabase.rpc(
					"get_random_stories",
					{
						limit_count: 3,
					}
				);
				if (error) throw error;
				const newData = await Promise.all(
					data.map(async (histoire: any) => {
						const { data: imageData } = await supabase.storage
							.from("histoires")
							.createSignedUrl(`public/${histoire.id}`, 60);
						return {
							...histoire,
							image: imageData?.signedUrl || "",
						};
					})
				);
				return newData;
			} catch (error) {
				console.error("Error fetching random stories:", error);
				return [];
			}
		},
	});

	const { data: topGenres, isLoading: topGenresLoading } = useQuery({
		queryKey: ["topGenres"],
		queryFn: async () => {
			try {
				const { data, error } = await supabase
					.from("histoires_genres")
					.select("genre:genre_id(nom), count:genre_id", {
						count: "exact",
					});
				if (error) throw error;
				const newData = data
					.map((item: any) => ({
						nom: item.genre.nom,
						count: item.count,
					}))
					.sort((a: any, b: any) => b.count - a.count)
					.slice(0, 4);
				return newData;
			} catch (error) {
				console.error("Error fetching top genres:", error);
				return [];
			}
		},
	});

	const { data: lastStories, isLoading: lastStoriesLoading } = useQuery({
		queryKey: ["lastStories"],
		queryFn: async () => {
			try {
				const { data, error } = await supabase
					.from("histoires")
					.select("*")
					.order("created_at", { ascending: false })
					.limit(4);
				if (error) throw error;
				const histoiresWithImages = await Promise.all(
					data.map(async (histoire) => {
						try {
							const { data: imageData } = await supabase.storage
								.from("histoires")
								.createSignedUrl(`public/${histoire.id}`, 60);
							return {
								...histoire,
								image:
									imageData?.signedUrl ||
									"/images/HistoireImg/img1.jpg",
							};
						} catch (error) {
							console.error("Error fetching image:", error);
							return { ...histoire, image: null };
						}
					})
				);
				return histoiresWithImages || [];
			} catch (error) {
				console.error("Error fetching last stories:", error);
				return [];
			}
		},
	});

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
						{randomStoriesLoading &&
							Array.from({ length: 3 }).map((_, index) => (
								<SwiperSlide key={index}>
									<Skeleton className='w-full h-full' />
								</SwiperSlide>
							))}
						{randomStories &&
							randomStories.map((slide, idx) => (
								<SwiperSlide key={idx}>
									<div className='relative w-full h-full'>
										<img
											src={slide.image}
											alt={slide.titre}
											className='absolute top-0 left-0 w-full h-full object-cover'
										/>
										<div className='relative z-10 flex items-center h-full bg-black/50'>
											<div className='max-w-xl text-white p-6 md:p-10'>
												<h2 className='text-2xl md:text-3xl font-bold mb-4'>
													{slide.titre}
												</h2>
												<p className='text-gray-100'>
													{slide.contenu.substring(
														0,
														100
													)}
													...
												</p>
												<Link
													href={`/histoires/${slide.slug}`}
													className='inline-block px-3 py-1.5 text-sm bg-violet-600 text-white rounded-full font-medium transition-all duration-300 hover:bg-violet-700 hover:scale-105 border border-violet-500 shadow-lg shadow-violet-500/20'
												>
													Lire la suite
												</Link>
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
				<section className='mx-60 max-[1400px]:mx-10 mb-20'>
					<h2 className='text-2xl font-semibold text-white mb-4'>
						Top Genres
					</h2>
					<div className='grid grid-cols-4 gap-4 max-lg:grid-cols-2 max-md:grid-cols-1'>
						{topGenresLoading &&
							Array.from({ length: 4 }).map((_, index) => (
								<Skeleton key={index} height='100%' />
							))}
						{topGenres &&
							topGenres.map((genre, index) => (
								<article key={index} className='w-full'>
									<Link
										href={`/histoires?genre=${genre.nom}`}
									>
										<HistoireCard
											histoireWithImage={{
												id: "",
												image:
													genresMap.find(
														(g) =>
															g.nom === genre.nom
													)?.img || "",
												titre: genre.nom,
												contenu: "",
												auteur: "",
												created_at: "",
												slug: "",
											}}
										/>
									</Link>
								</article>
							))}
					</div>
				</section>

				<section className='mx-60 max-[1400px]:mx-10 mb-20'>
					<h2 className='text-2xl font-semibold mb-4 text-white'>
						Latest Stories
					</h2>
					<div className='flex flex-row gap-4 w-full max-lg:flex-col'>
						<article className='w-2/3 max-lg:w-full'>
							{lastStoriesLoading && <Skeleton height='100%' />}
							{lastStories && (
								<Link
									href={`/histoires/${lastStories[0].slug}`}
								>
									<HistoireCard
										histoireWithImage={lastStories[0]}
										showContent={true}
										props='h-full'
										imageProps='h-2/3 object-cover'
									/>
								</Link>
							)}
						</article>
						<aside className='w-1/3 flex flex-col gap-4 max-lg:w-full max-lg:grid max-lg:grid-cols-2 max-md:grid-cols-1'>
							{lastStoriesLoading &&
								Array.from({ length: 3 }).map((_, index) => (
									<Skeleton key={index} height='100%' />
								))}
							{lastStories?.map((histoireWithImage, index) => {
								if (index === 0) return null;
								return (
									<article key={index} className='w-full'>
										<Link
											href={`/histoires/${histoireWithImage.slug}`}
										>
											<HistoireCard
												histoireWithImage={
													histoireWithImage
												}
											/>
										</Link>
									</article>
								);
							})}
						</aside>
					</div>
				</section>
			</main>
		</Layout>
	);
}
