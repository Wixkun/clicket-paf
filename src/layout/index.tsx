import React from "react";
import Link from "next/link";

import { Card } from "@/components/ui/card";

interface LayoutProps {
  children: React.ReactNode;
}

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <h1 className="text-xl font-bold text-white">Logo</h1>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <Link href="/" className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Accueil</Link>
              <Link href="/about" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">À propos</Link>
              <Link href="/services" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Services</Link>
              <Link href="/contact" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Contact</Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Navbar />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        {children}
      </main>
    </div>

  );


};

export default Layout;

