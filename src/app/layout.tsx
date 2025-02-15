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
  title: 'ClickEtPaf',
  description:
    'Découvrez des histoires absurdes et hilarantes avec ClickEtPaf. Un générateur unique pour booster votre créativité et votre imagination !',
  keywords: 'histoires, absurdes, générateur, créativité, imagination, clicketpaf, humour, récits',
  robots: 'index, follow',
  openGraph: {
    title: 'ClickEtPaf ',
    description: 'Plongez dans des histoires délirantes créées en un clic.',
    url: 'https://www.clicket-paf.com',
    type: 'website',
    images: [
      {
        url: 'https://www.clicket-paf.com/images/cover.jpg',
        width: 1200,
        height: 630,
        alt: 'ClickEtPaf',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ClickEtPaf',
    description: 'Découvrez des récits originaux générés aléatoirement.',
    site: '@ClickEtPaf',
    images: ['https://www.clicket-paf.com/images/cover.jpg'],
  },
  alternates: {
    canonical: 'https://www.clicket-paf.com',
    languages: {
      fr: 'https://www.clicket-paf.com/fr',
      en: 'https://www.clicket-paf.com/en',
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body style={{ margin: 0 }}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
