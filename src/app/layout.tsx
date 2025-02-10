import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "./client_layout";

export const metadata: Metadata = {
  title: "Clicket Paf - Générateur d'histoires absurdes et hilarantes",
  description: "Découvrez des histoires absurdes et hilarantes avec Clicket Paf. Un générateur unique pour booster votre créativité et votre imagination !",
};

interface LayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
