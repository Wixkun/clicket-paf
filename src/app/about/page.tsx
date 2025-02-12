import type { Metadata } from "next";
import Layout from "@/layout";

export const metadata: Metadata = {
  title: "À propos de ClickEtPaf - Générateur d'Histoires Absurdes et Créatives",
  description:
    "Découvrez ClickEtPaf, la plateforme ultime pour générer des histoires absurdes et hilarantes en un clic ! Boostez votre créativité avec des récits inédits et surprenants.",
  keywords:
    "ClickEtPaf, générateur d'histoires, récits absurdes, créativité, imagination, humour, histoires aléatoires, storytelling, écrire une histoire",
  robots: "index, follow",
  openGraph: {
    title: "À propos de ClickEtPaf - Générateur de Récits Originaux",
    description:
      "Plongez dans l'univers de ClickEtPaf et créez des histoires absurdes en un clic. Un générateur unique pour des récits captivants et drôles !",
    url: "https://www.clicket-paf.com/about",
    type: "article",
    images: [
      {
        url: "https://www.clicket-paf.com/images/about-cover.jpg",
        width: 1200,
        height: 630,
        alt: "ClickEtPaf - Générateur d'Histoires"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "À propos de ClickEtPaf - Histoires Générées Automatiquement",
    description:
      "Avec ClickEtPaf, générez des histoires délirantes et uniques en un seul clic. Un outil parfait pour les créatifs et les amateurs de récits absurdes !",
    site: "@ClickEtPaf",
    images: ["https://www.clicket-paf.com/images/about-cover.jpg"]
  },
  alternates: {
    canonical: "https://www.clicket-paf.com/about",
    languages: {
      fr: "https://www.clicket-paf.com/about",
      en: "https://www.clicket-paf.com/en/about"
    }
  }
};

export default function AboutPage() {
  return (
    <Layout>
      <div className="bg-gray-100 w-full py-12 px-6">
        <section className="text-center">
          <h1 className="text-4xl font-bold text-gray-900">
            À Propos de <span className="text-gray-500">ClickEtPaf</span>
          </h1>
          <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
            ClickEtPaf est un <strong>générateur d'histoires absurdes</strong>, conçu pour éveiller votre créativité en quelques clics. 
            Que vous soyez écrivain, créatif ou simplement curieux, nos récits uniques et aléatoires sauront vous inspirer !
          </p>
        </section>

        <section className="my-12">
          <h2 className="text-2xl font-semibold mb-4">Pourquoi ClickEtPaf ?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Boostez votre imagination",
                description:
                  "Notre intelligence artificielle crée des histoires surprenantes pour nourrir votre inspiration et enrichir vos idées.",
                icon: "💡"
              },
              {
                title: "Des histoires inédites",
                description:
                  "Chaque histoire générée est unique, pleine de surprises et d’humour. Découvrez des récits que vous n’auriez jamais imaginés !",
                icon: "📖"
              },
              {
                title: "Facile et rapide",
                description:
                  "En un seul clic, obtenez une histoire complète et laissez-vous emporter dans un univers loufoque et captivant.",
                icon: "⚡"
              }
            ].map((feature, index) => (
              <div key={index} className="p-6 bg-white shadow-md rounded-lg text-center">
                <span className="text-4xl">{feature.icon}</span>
                <h3 className="font-bold text-lg mt-2">{feature.title}</h3>
                <p className="text-gray-600 mt-1">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="my-12 text-center">
          <h2 className="text-2xl font-semibold mb-4">Comment ça marche ?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Envie de lire une histoire délirante en quelques secondes ? Rien de plus simple :
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            {[
              { step: "1", text: "Cliquez sur 'Générer une histoire' et laissez la magie opérer." },
              { step: "2", text: "Découvrez un récit 100% original et hilarant." },
              { step: "3", text: "Partagez-le avec vos amis ou laissez-vous tenter par une nouvelle histoire !" }
            ].map((step, index) => (
              <div key={index} className="p-6 bg-white shadow-md rounded-lg text-center">
                <div className="text-3xl font-bold text-gray-800">{step.step}</div>
                <p className="text-gray-600 mt-2">{step.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="my-12 text-center">
          <h2 className="text-2xl font-semibold mb-4">Nos Valeurs</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Chez ClickEtPaf, nous croyons en une créativité sans limites. Notre mission est de vous offrir un espace
            où l'imaginaire prend vie, à travers des récits originaux, drôles et parfois complètement absurdes.
          </p>
        </section>

        <section className="my-12 text-center">
          <h2 className="text-2xl font-semibold mb-4">Rejoignez la Communauté !</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Suivez-nous sur les réseaux sociaux et partagez vos histoires préférées avec le hashtag <strong>#ClickEtPaf</strong>.
          </p>
          <div className="flex justify-center space-x-4 mt-4">
            <a href="https://www.instagram.com/clicketpaf_/" target="_blank" className="text-pink-500 hover:underline">
              Instagram
            </a>
            <a href="https://www.linkedin.com/in/clicket-paf-9900b8351/" target="_blank" className="text-pink-500 hover:underline">
              LinkedIn
            </a>
          </div>
        </section>
      </div>
    </Layout>
  );
}
