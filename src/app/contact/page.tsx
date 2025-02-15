import type { Metadata } from "next";
import Layout from "@/layout";

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
    canonical: "https://www.clicket-paf.com/contact-us",
    languages: {
      fr: "https://www.clicket-paf.com/contact-us",
      en: "https://www.clicket-paf.com/en/contact-us"
    }
  }
};

export default function ContactPage() {
  return (
    <Layout>
      <div className="bg-gray-100 w-full py-12 px-6">
        <section className="text-center">
          <h1 className="text-4xl font-bold text-gray-900">
            Contactez <span className="text-gray-500">ClickEtPaf</span>
          </h1>
          <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
            Une question, un projet, une idée farfelue ? Nous sommes là pour vous écouter ! Remplissez le formulaire ci-dessous 
            ou envoyez-nous un email. On adore recevoir des messages (surtout les drôles).
          </p>
        </section>

        <section className="my-12">
          <h2 className="text-2xl font-semibold mb-4 text-center">Nos Coordonnées</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
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
              <div key={index} className="p-6 bg-white shadow-md rounded-lg">
                <span className="text-4xl">{contact.icon}</span>
                <h3 className="font-bold text-lg mt-2">{contact.title}</h3>
                <p className="text-gray-600 mt-1">{contact.info}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="my-12">
          <h2 className="text-2xl font-semibold mb-4 text-center">Envoyez-nous un Message</h2>
          <div className="max-w-2xl mx-auto bg-white shadow-md p-6 rounded-lg">
            <form action="https://formspree.io/f/mleqzgdw" method="POST" className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium">Nom</label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
                  placeholder="Votre nom"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
                  placeholder="Votre email"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium">Message</label>
                <textarea
                  name="message"
                  required
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
                  placeholder="Votre message ici..."
                  rows={4}
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition"
              >
                Envoyer
              </button>
            </form>
          </div>
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
