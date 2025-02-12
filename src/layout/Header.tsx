"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Menu as MenuIcon, X as CloseIcon } from "lucide-react";

const isLoggedIn = false;

interface HeaderProps {
  variant: string;
}

const Header: React.FC<HeaderProps> = ({ variant }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isTop, setIsTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsTop(window.scrollY < 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navClasses = `
    fixed w-full py-4 z-10 transition-colors duration-300 max-md:px-8
    flex items-center justify-around max-md:justify-between
    ${
    isTop && variant === "landing" && !isOpen
      ? "bg-transparent text-white"
      : isTop && variant === "landing" && isOpen
        ? "bg-black text-white"
        : "bg-white text-black"
  }
  `;

  return (
    <header>
      <nav className={navClasses} aria-label="Navigation principale">
        <Link href="/" className="text-xl font-bold" title="Retour à l'accueil">
          Click&Paf.
        </Link>

        <ul className="hidden md:flex items-center gap-8">
          <li>
            <Link className="text-md transition duration-200 ease-in-out hover:bg-white hover:bg-opacity-20 p-2 rounded-full" href="/histoires">Histoires</Link>
          </li>
          <li>
            <Link className="text-md transition duration-200 ease-in-out hover:bg-white hover:bg-opacity-20 p-2 rounded-full" href="/about">À propos</Link>
          </li>
          <li>
            <Link className="text-md transition duration-200 ease-in-out hover:bg-white hover:bg-opacity-20 p-2 rounded-full" href="/contact">Contact</Link>
          </li>

          <li>
            {isLoggedIn ? (
              <Link className="text-md transition duration-200 ease-in-out hover:bg-white hover:bg-opacity-20 p-2 rounded-full" href="/profil" title="Aller au profil">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                  />
                </svg>
              </Link>
            ) : (
              <Link
                href="/login"
                className="transition duration-200 ease-in-out px-4 py-2 rounded-full bg-white text-black hover:bg-black hover:text-white"
              >
                Connexion
              </Link>
            )}
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
          role="menu"
          className={`
            md:hidden w-full fixed top-16 left-0 shadow-lg -mt-2 z-20
            ${
            isTop && variant === "landing"
              ? "bg-black text-white"
              : "bg-white text-black"
          }
          `}
        >
          <ul className="flex flex-col items-center gap-4 py-4">
            <li>
              <Link className="text-md transition duration-200 ease-in-out hover:bg-white hover:bg-opacity-20 p-2 rounded-full" href="/histoires" onClick={() => setIsOpen(false)}>
                Histoires
              </Link>
            </li>
            <li>
              <Link className="text-md transition duration-200 ease-in-out hover:bg-white hover:bg-opacity-20 p-2 rounded-full" href="/about" onClick={() => setIsOpen(false)}>
                À propos
              </Link>
            </li>
            <li>
              <Link className="text-md transition duration-200 ease-in-out hover:bg-white hover:bg-opacity-20 p-2 rounded-full" href="/contact" onClick={() => setIsOpen(false)}>
                Contact
              </Link>
            </li>

            <li>
              {isLoggedIn ? (
                <Link className="text-md transition duration-200 ease-in-out hover:bg-white hover:bg-opacity-20 p-2 rounded-full" href="/profil" onClick={() => setIsOpen(false)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                    />
                  </svg>
                </Link>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="transition duration-200 ease-in-out px-4 py-2 rounded-full bg-white text-black hover:bg-black hover:text-white"
                >
                  Connexion
                </Link>
              )}
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
