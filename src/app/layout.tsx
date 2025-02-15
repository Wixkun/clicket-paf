import type { Metadata } from 'next';
import './globals.css';
import ClientLayout from './client_layout';

if (typeof window !== 'undefined') {
  console.log = () => {};
  console.error = () => {};
  console.warn = () => {};
  console.info = () => {};
}

export const metadata: Metadata = {
  metadataBase: new URL('https://www.clicket-paf.com'),
  title: {
    default: "ClickEtPaf - Générateur d'histoires absurdes et hilarantes",
    template: '%s | ClickEtPaf',
  },
  description:
    'Découvrez des histoires absurdes et hilarantes avec ClickEtPaf. Un générateur unique pour booster votre créativité et votre imagination !',
  keywords: [
    'histoires absurdes',
    'générateur histoires',
    'créativité',
    'imagination',
    'clicketpaf',
    'humour',
    'récits',
    'histoires drôles',
    'générateur créatif',
  ],
  authors: [{ name: 'ClickEtPaf' }],
  creator: 'ClickEtPaf',
  publisher: 'ClickEtPaf',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://www.clicket-paf.com',
    siteName: 'ClickEtPaf',
    title: "ClickEtPaf - Générateur d'histoires absurdes et hilarantes",
    description: 'Plongez dans des histoires délirantes créées en un clic. Une expérience unique de narration créative.',
    images: [
      {
        url: 'https://www.clicket-paf.com/images/cover.jpg',
        width: 1200,
        height: 630,
        alt: "ClickEtPaf - Générateur d'histoires",
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ClickEtPaf - Histoires Absurdes',
    description: 'Découvrez des récits originaux générés aléatoirement. Une nouvelle façon de stimuler votre imagination.',
    site: '@ClickEtPaf',
    creator: '@ClickEtPaf',
    images: ['https://www.clicket-paf.com/images/cover.jpg'],
  },
  alternates: {
    canonical: 'https://www.clicket-paf.com',
    languages: {
      'fr-FR': 'https://www.clicket-paf.com/fr',
      'en-US': 'https://www.clicket-paf.com/en',
    },
  },
  verification: {
    google: 'votre-code-verification-google',
  },
  category: 'divertissement',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </head>
      <body style={{ margin: 0 }}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
