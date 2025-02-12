"use client";

import Link from "next/link";
import React, { useState } from "react";
import { Menu as MenuIcon, X as CloseIcon } from "lucide-react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header>
      <nav
        className="fixed flex justify-around items-center w-full py-4 z-10 max-md:justify-between max-md:px-8"
        aria-label="Navigation principale"
      >
        <Link href="/" className="text-xl font-bold text-black" title="Retour à l'accueil">
          Click&Paf.
        </Link>

        <ul className="hidden md:flex items-center gap-8">
          <li>
            <Link href="/" className="text-black text-sm font-medium" aria-current="page">
              Accueil
            </Link>
          </li>
          <li>
            <Link href="/histoires" className="text-black text-sm font-medium">
              Histoires
            </Link>
          </li>
          <li>
            <Link href="/about" className="text-black text-sm font-medium">
              À propos
            </Link>
          </li>
          <li>
            <Link href="/contact" className="text-black text-sm font-medium">
              Contact
            </Link>
          </li>
        </ul>

        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Ouvrir le menu"
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
        >
          {isOpen ? (
            <CloseIcon className="w-6 h-6 text-black" />
          ) : (
            <MenuIcon className="w-6 h-6 text-black" />
          )}
        </button>
      </nav>

      {isOpen && (
        <div
          id="mobile-menu"
          className="md:hidden bg-white w-full fixed top-16 left-0 shadow-lg -mt-2 z-20"
          role="menu"
        >
          <ul className="flex flex-col items-center gap-4 py-4">
            <li role="menuitem">
              <Link
                href="/"
                className="text-black text-sm font-medium"
                onClick={() => setIsOpen(false)}
                aria-current="page"
              >
                Accueil
              </Link>
            </li>
            <li role="menuitem">
              <Link
                href="/histoires"
                className="text-black text-sm font-medium"
                onClick={() => setIsOpen(false)}
              >
                Histoires
              </Link>
            </li>
            <li role="menuitem">
              <Link
                href="/about"
                className="text-black text-sm font-medium"
                onClick={() => setIsOpen(false)}
              >
                À propos
              </Link>
            </li>
            <li role="menuitem">
              <Link
                href="/contact"
                className="text-black text-sm font-medium"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;