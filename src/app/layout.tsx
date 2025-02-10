import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "./client_layout";

export const metadata: Metadata = {
  title: "ClickEtPaf - Générateur d'histoires absurdes et hilarantes",
  description: "Découvrez des histoires absurdes et hilarantes avec ClickEtPaf. Un générateur unique pour booster votre créativité et votre imagination !",
  keywords: "histoires, absurdes, générateur, créativité, imagination, clicketpaf, humour, récits", 
  robots: "index, follow",
  openGraph: {
    title: "ClickEtPaf - Générateur d'histoires absurdes et hilarantes",
    description: "Découvrez des histoires absurdes et hilarantes avec ClickEtPaf. Un générateur unique pour booster votre créativité et votre imagination !",
    url: "https://www.clicket-paf.com",
    type: "website",
    images: [
      {
        url: "/images/clicketpaf-banner.jpg",
        width: 1200,
        height: 630,
        alt: "ClickEtPaf - Générateur d'histoires absurdes et hilarantes"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "ClickEtPaf - Générateur d'histoires absurdes et hilarantes",
    description: "Découvrez des histoires absurdes et hilarantes avec ClickEtPaf. Un générateur unique pour booster votre créativité et votre imagination !",
    images: ["/images/clicketpaf-banner.jpg"]
  }
};

interface LayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="fr">
      <body style={{ margin: 0 }}>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
