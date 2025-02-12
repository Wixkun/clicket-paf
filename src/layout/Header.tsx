"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Menu as MenuIcon, X as CloseIcon } from "lucide-react";

const Header = ({variant}:{variant:string}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isTop, setIsTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsTop(window.scrollY < 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header>
      <nav className={`fixed w-full py-4 z-10 max-md:justify-between max-md:px-8 flex justify-around items-center transition-colors duration-300 ${
        (isTop && variant === "landing") ? "bg-transparent text-white" : "bg-white text-black border-b"
      }`}
           aria-label="Navigation principale"
      >
        <Link href="/" className="text-xl font-bold" title="Retour à l'accueil">
          Click&Paf.
        </Link>

        <ul className="hidden md:flex items-center gap-8">
          <li>
            <Link href="/" aria-current="page">
              Accueil
            </Link>
          </li>
          <li>
            <Link href="/histoires">Histoires</Link>
          </li>
          <li>
            <Link href="/about">À propos</Link>
          </li>
          <li>
            <Link href="/contact">Contactez-nous</Link>
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
            <CloseIcon className="w-6 h-6" />
          ) : (
            <MenuIcon className="w-6 h-6" />
          )}
        </button>
      </nav>

      {isOpen && (
        <div
          id="mobile-menu"
          className={`
            md:hidden w-full fixed top-16 left-0 shadow-lg -mt-2 z-20
            ${isTop ? "bg-black text-white" : "bg-white text-black"}
          `}
          role="menu"
        >
          <ul className="flex flex-col items-center gap-4 py-4">
            <li role="menuitem">
              <Link href="/" onClick={() => setIsOpen(false)}>
                Accueil
              </Link>
            </li>
            <li role="menuitem">
              <Link href="/histoires" onClick={() => setIsOpen(false)}>
                Histoires
              </Link>
            </li>
            <li role="menuitem">
              <Link href="/about" onClick={() => setIsOpen(false)}>
                À propos
              </Link>
            </li>
            <li role="menuitem">
              <Link href="/contact" onClick={() => setIsOpen(false)}>
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
