import type { Metadata } from 'next';
import Layout from '@/layout';
import React from 'react';
import { FaInstagram, FaLinkedin } from 'react-icons/fa';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "À propos de ClickEtPaf - Générateur d'Histoires Absurdes et Créatives",
  description:
    'Découvrez ClickEtPaf, la plateforme ultime pour générer des histoires absurdes et hilarantes en un clic ! Boostez votre créativité avec des récits inédits et surprenants.',
  keywords:
    "ClickEtPaf, générateur d'histoires, récits absurdes, créativité, imagination, humour, histoires aléatoires, storytelling, écrire une histoire",
  robots: 'index, follow',
  openGraph: {
    title: 'À propos de ClickEtPaf - Générateur de Récits Originaux',
    description:
      "Plongez dans l'univers de ClickEtPaf et créez des histoires absurdes en un clic. Un générateur unique pour des récits captivants et drôles !",
    url: 'https://www.clicket-paf.com/about',
    type: 'article',
    images: [
      {
        url: 'https://www.clicket-paf.com/images/about-cover.jpg',
        width: 1200,
        height: 630,
        alt: "ClickEtPaf - Générateur d'Histoires",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'À propos de ClickEtPaf - Histoires Générées Automatiquement',
    description:
      'Avec ClickEtPaf, générez des histoires délirantes et uniques en un seul clic. Un outil parfait pour les créatifs et les amateurs de récits absurdes !',
    site: '@ClickEtPaf',
    images: ['https://www.clicket-paf.com/images/about-cover.jpg'],
  },
  alternates: {
    canonical: 'https://www.clicket-paf.com/about',
    languages: {
      fr: 'https://www.clicket-paf.com/about',
      en: 'https://www.clicket-paf.com/en/about',
    },
  },
};

export default function AboutPage() {
  return (
    <Layout>
      <main className="flex flex-col mt-20 gap-10">
        <header className="flex flex-col items-center justify-center w-full py-20 gap-8">
          <div className="flex flex-col items-center justify-center w-1/2">
            <h1 className="text-5xl max-sm:text-4xl font-bold text-white">ClickEtPaf</h1>
            <hr className="border-t border-white w-1/2" />
            <h2 className="text-3xl bg-gradient-to-r from-violet-400 to-violet-600 text-transparent bg-clip-text">À Propos</h2>
          </div>

          <div className="w-1/2 max-xl:w-full max-xl:px-20">
            <p className="text-gray-400 text-center">
              ClickEtPaf est un <strong>générateur d'histoires absurdes</strong>, conçu pour éveiller votre créativité en quelques clics.
              Que vous soyez écrivain, créatif ou simplement curieux, nos récits uniques et aléatoires sauront vous inspirer !
            </p>
          </div>
        </header>

        <section className="flex flex-row mx-60 max-[1400px]:mx-10 mb-20 justify-between max-md:flex-col max-md:gap-8">
          <header className="flex flex-col gap-4 w-1/3 max-md:w-full">
            <h2 className="text-3xl max-sm:text-2xl font-bold text-white">Pourquoi ClickEtPaf ?</h2>
            <p className="text-gray-400 w-full text-left">
              Chez ClickEtPaf, l’imagination n’a pas de limite ! Nous avons conçu une intelligence artificielle capable de générer{' '}
              <strong className="bg-gradient-to-r from-violet-400 to-violet-600 text-transparent bg-clip-text">
                des histoires uniques, absurdes et captivantes, le tout en un seul clic.
              </strong>{' '}
              Que vous soyez en quête d’inspiration, là pour taper une bonne grosse barre ou simplement curieux de découvrir des récits
              inédits, notre plateforme est faite pour vous.
            </p>
          </header>

          <ul className="w-1/2 max-md:w-full grid grid-cols-2 gap-4 max-lg:grid-cols-2 max-md:grid-cols-2 max-sm:grid-cols-1">
            {[
              {
                title: 'Boostez votre imagination',
                description:
                  'Notre intelligence artificielle crée des histoires surprenantes pour nourrir votre inspiration et enrichir vos idées.',
                icon: '💡',
              },
              {
                title: 'Des histoires inédites',
                description:
                  'Chaque histoire générée est unique, pleine de surprises et d’humour. Découvrez des récits que vous n’auriez jamais imaginés !',
                icon: '📖',
              },
              {
                title: 'Une communauté active et inspirante',
                description:
                  "Découvrez des histoires et anecdotes partagées par d'autres utilisateurs, et pourquoi pas, publiez les vôtres pour surprendre le monde !",
                icon: '🌍',
              },
              {
                title: 'Facile et rapide',
                description:
                  'En un seul clic, obtenez une histoire complète et laissez-vous emporter dans un univers loufoque et captivant.',
                icon: '⚡',
              },
            ].map((feature, index) => (
              <li
                key={index}
                className="
                flex flex-col gap-4 items-center
                rounded-2xl overflow-hidden
                bg-black/20 backdrop-blur-sm
                transition-all duration-300
                hover:scale-[1.02] hover:bg-black/40 p-6"
              >
                <span className="text-4xl">{feature.icon}</span>
                <h3 className="text-lg font-bold">{feature.title}</h3>
                <p className="text-gray-400 text-center">{feature.description}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="flex flex-row mx-60 max-[1400px]:mx-10 mb-20 justify-between max-md:flex-col-reverse max-md:gap-8">
          <ol className="w-1/2 max-md:w-full grid grid-cols-2 gap-4 max-lg:grid-cols-2 max-md:grid-cols-2 max-sm:grid-cols-1">
            {[
              {
                title: 'Une recherche',
                description:
                  'Parcourez un large catalogue d’histoires et d’anecdotes classées par thèmes. Trouvez rapidement le récit qui correspond à votre envie du moment.',
                icon: '1',
              },
              {
                title: 'Un clic',
                description: 'plongez dans un univers d’histoires absurdes, drôles ou inspirantes en un instant',
                icon: '2',
              },
              {
                title: 'Une histoire',
                description:
                  'Chaque histoire est une surprise ! Découvrez des récits inédits, écrits par notre intelligence artificielle et par une communauté passionnée.',
                icon: '3',
              },
              {
                title: 'Une claque',
                description:
                  'Laissez-vous emporter par des histoires qui marquent ! Entre humour, originalité et émotions fortes, chaque lecture est une expérience à part entière.',
                icon: '4',
              },
            ].map((feature, index) => (
              <li
                key={index}
                className="
                flex flex-col gap-4 items-center
                rounded-2xl overflow-hidden
                bg-black/20 backdrop-blur-sm
                transition-all duration-300
                hover:scale-[1.02] hover:bg-black/40 p-6"
              >
                <span className="text-4xl">{feature.icon}</span>
                <h3 className="text-lg font-bold">{feature.title}</h3>
                <p className="text-gray-400 text-center">{feature.description}</p>
              </li>
            ))}
          </ol>

          <header className="flex flex-col gap-4 w-1/3 max-md:w-full">
            <h2 className="text-3xl max-sm:text-2xl font-bold text-white">Et comment ça marche ?</h2>
            <p className="text-gray-400 w-full text-left">
              <strong className="bg-gradient-to-r from-violet-400 to-violet-600 text-transparent bg-clip-text">
                Une recherche, un clic, une histoire, une claque !
              </strong>{' '}
              Sur ClickEtPaf, la magie opère en un instant. C’est aussi simple que ça. Ici, pas de bouton magique pour générer un récit : ce
              sont des centaines de textes soigneusement sélectionnés que vous pouvez explorer à votre guise.
            </p>
          </header>
        </section>

        <section className="flex flex-row mx-60 gap-8 max-[1400px]:mx-10 mb-20 justify-between max-md:flex-col max-md:gap-8">
          <article
            className="w-full rounded-2xl overflow-hidden
                bg-black/20 backdrop-blur-sm
                transition-all duration-300
                hover:scale-[1.02] hover:bg-black/40 p-6"
          >
            <h2 className="text-2xl font-semibold mb-4">Nos Valeurs</h2>
            <p className="text-gray-400">
              Chez ClickEtPaf, nous croyons en une créativité sans limites. Notre mission est de vous offrir un espace où l'imaginaire prend
              vie, à travers des récits originaux, drôles et parfois complètement absurdes.
            </p>
          </article>

          <article
            className="w-full rounded-2xl overflow-hidden
                bg-black/20 backdrop-blur-sm
                transition-all duration-300
                hover:scale-[1.02] hover:bg-black/40 p-6"
          >
            <h2 className="text-2xl font-semibold mb-4">Rejoignez la Communauté !</h2>
            <p className="text-gray-400">
              Suivez-nous sur les réseaux sociaux et partagez vos histoires préférées avec le hashtag{' '}
              <strong className="bg-gradient-to-r from-violet-400 to-violet-600 text-transparent bg-clip-text">#ClickEtPaf</strong>.
            </p>
            <div className="flex justify-center space-x-4 mt-4">
              <Link
                href="https://www.instagram.com/clicketpaf_?igsh=bmlsNmZib3A3ZXN0&utm_source=qr"
                className="text-gray-400 hover:text-white"
              >
                <FaInstagram size={20} />
              </Link>
              <Link
                href="https://www.linkedin.com/in/clicket-paf-9900b8351/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
                className="text-gray-400 hover:text-white"
              >
                <FaLinkedin size={20} />
              </Link>
            </div>
          </article>
        </section>
      </main>
    </Layout>
  );
}
