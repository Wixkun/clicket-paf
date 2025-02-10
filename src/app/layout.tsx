import { ReactNode } from "react";
import Head from "next/head";
import "./globals.css";

interface LayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="fr">
      <Head>
        {/* 🌍 SEO META TAGS */}
        <title>ClickEtPaf - Histoires captivantes de tous genres</title>
        <meta name="description" content="Découvrez des histoires immersives : policier, romance, science-fiction, fantastique et bien plus. ClickEtPaf, la bibliothèque des émotions fortes !" />
        <meta name="keywords" content="histoires, lecture, romans, nouvelles, policier, science-fiction, fantastique, romance, ClickEtPaf" />
        <meta name="author" content="ClickEtPaf Team" />
        <meta name="robots" content="index, follow" />

        {/* 📱 Responsive */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* 🏷️ Open Graph (Facebook, LinkedIn, etc.) */}
        <meta property="og:title" content="ClickEtPaf - Histoires captivantes de tous genres" />
        <meta property="og:description" content="Plongez dans des récits inoubliables : Policier, Romance, SF, Fantastique... À lire absolument !" />
        <meta property="og:image" content="/images/click-et-paf-banner.jpg" />
        <meta property="og:url" content="https://www.clicketpaf.com" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="ClickEtPaf" />

        {/* 🐦 Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="ClickEtPaf - Histoires captivantes de tous genres" />
        <meta name="twitter:description" content="Découvrez des histoires immersives : Policier, Romance, SF, Fantastique..." />
        <meta name="twitter:image" content="/images/clicketpaf.webp" />

        {/* 🌎 Favicon */}
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <body className="bg-gray-100 text-gray-900">
        <div className="min-h-screen flex flex-col">
          <header className="">
            <nav className="flex justify-between items-center p-4 shadow-md bg-white">
              <div className="text-xl font-bold">Logo</div>
              <ul className="flex space-x-6">
                {['Accueil', 'Genres', 'Histoires', 'À propos', 'Blog'].map((item, index) => (
                  <li key={index} className="text-gray-700 hover:text-black cursor-pointer">{item}</li>
                ))}
              </ul>
              <div className="flex space-x-4 items-center">
                <input 
                  type="text" 
                  placeholder="Search" 
                  className="border rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
                />
                <button className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800">
                  Sign In
                </button>
              </div>
            </nav>          
          </header>
          <main className="flex-grow">{children}</main>
          <footer className="bg-gray-800 text-white text-center py-4">
            © 2024 ClickEtPaf. Tous droits réservés.
          </footer>
        </div>
      </body>
    </html>
  );
}
