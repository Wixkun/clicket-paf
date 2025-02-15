import type { Metadata } from "next";
import Layout from "@/layout";
import React from "react";

export const metadata: Metadata = {
  title: "Contactez-nous - ClickEtPaf",
  description:
    "Besoin d'aide, de renseignements ou envie de collaborer ? Contactez ClickEtPaf et rejoignez notre univers de storytelling absurde et créatif !",
  keywords:
    "contact ClickEtPaf, support, assistance, questions, générateur d'histoires, créativité, storytelling, humour, collaboration",
  robots: "index, follow",
  openGraph: {
    title: "Contactez ClickEtPaf - Votre Générateur d’Histoires",
    description:
      "Une question, une suggestion ou une envie de partenariat ? L’équipe de ClickEtPaf est à votre écoute. Contactez-nous dès maintenant !",
    url: "https://www.clicket-paf.com/contact-us",
    type: "article",
    images: [
      {
        url: "https://www.clicket-paf.com/images/contact-cover.jpg",
        width: 1200,
        height: 630,
        alt: "ClickEtPaf Contact"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Contactez ClickEtPaf - Assistance et Partenariats",
    description:
      "Une question ou une collaboration en tête ? Contactez ClickEtPaf et parlons de créativité, d’histoires et d’inspiration !",
    site: "@ClickEtPaf",
    images: ["https://www.clicket-paf.com/images/contact-cover.jpg"]
  },
  alternates: {
    canonical: "https://www.clicket-paf.com/contact",
    languages: {
      fr: "https://www.clicket-paf.com/contact",
      en: "https://www.clicket-paf.com/en/contact"
    }
  }
};

export default function ContactPage() {
  return (
    <Layout>
      <main className="flex flex-col mt-20 gap-10">
        <header className="flex flex-col items-center justify-center w-full py-20 gap-8">
          <div className="flex flex-col items-center justify-center w-1/2">
            <h1 className="text-5xl max-sm:text-4xl font-bold text-white">ClickEtPaf</h1>
            <hr className="border-t border-white w-1/2" />
            <h2 className="text-3xl bg-gradient-to-r from-violet-400 to-violet-600 text-transparent bg-clip-text">
              Contact
            </h2>
          </div>

          <div className="w-1/2 max-xl:w-full max-xl:px-20">
            <p className="text-gray-400 text-center">
              <strong>
                Une question, un projet, une idée what the fuck ? Nous sommes là pour vous écouter !
              </strong>{" "}
              Remplissez le formulaire ci-dessous ou envoyez-nous un email. On adore recevoir des messages (surtout les drôles).
            </p>
          </div>
        </header>

        <section className="mx-60 max-[1400px]:mx-10 mb-20">
          <h2 className="text-2xl font-semibold mb-4">Nos coordonnées</h2>
          <div className="flex flex-row gap-4 w-full max-lg:flex-col">
            <article className="w-full bg-black/20 backdrop-blur-sm shadow-md p-6 rounded-xl">
              <form action="https://formspree.io/f/mleqzgdw" method="POST" className="space-y-4">
                <div>
                  <label className="block text-gray-300 font-medium">Nom</label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full px-4 py-2 border border-gray-600 rounded-md bg-black/30 text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                    placeholder="Votre nom"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 font-medium">Email</label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full px-4 py-2 border border-gray-600 rounded-md bg-black/30 text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                    placeholder="Votre email"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 font-medium">Message</label>
                  <textarea
                    name="message"
                    required
                    className="w-full px-4 py-2 border border-gray-600 rounded-md bg-black/30 text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                    placeholder="Votre message ici..."
                    rows={4}
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-violet-600 text-white py-2 rounded-md hover:bg-violet-700 transition"
                >
                  Envoyer
                </button>
              </form>
            </article>

            <aside className="w-1/3 flex flex-col gap-4 max-lg:w-full max-lg:flex max-lg:justify-between max-lg:flex-row max-md:flex-col">
              <ul className="w-full flex flex-col gap-4">
                {[
                  {
                    title: "Email",
                    info: "contact@clicket-paf.com",
                    icon: "📧"
                  },
                  {
                    title: "Téléphone",
                    info: "+33 1 23 45 67 89",
                    icon: "📞"
                  },
                  {
                    title: "Réseaux Sociaux",
                    info: "@ClickEtPaf",
                    icon: "🌍"
                  }
                ].map((contact, index) => (
                  <li
                    key={index}
                    className="
                      flex flex-col gap-4 items-center
                      rounded-2xl overflow-hidden
                      bg-black/20 backdrop-blur-sm
                      transition-all duration-300
                      hover:scale-[1.02] hover:bg-black/40 p-6"
                  >
                    <span className="text-4xl">{contact.icon}</span>
                    <h3 className="font-bold text-lg mt-2 text-white">{contact.title}</h3>
                    <p className="text-gray-400 mt-1">{contact.info}</p>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </section>
      </main>
    </Layout>
  );
}
