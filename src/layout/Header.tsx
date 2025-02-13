"use client";

import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { Menu as MenuIcon, X as CloseIcon } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { User } from '@supabase/supabase-js';
import { usePathname } from 'next/navigation';

interface HeaderProps {
  variant: string;
}

const Header: React.FC<HeaderProps> = ({ variant }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isTop, setIsTop] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const pathname = usePathname();
  const supabase = createClient();

  useEffect(() => {
    const handleScroll = () => setIsTop(window.scrollY < 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setIsLoading(false);
    };

    getUser();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isDropdownOpen]);

  const handleLogout = async () => {
    setIsDropdownOpen(false);
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Erreur lors de la déconnexion:", error);
    } else {
      window.location.reload();
    }
  };

  const navClasses = `
    fixed w-full py-4 z-10 transition-colors duration-300 max-md:px-8
    flex items-center justify-around max-md:justify-between
    ${variant === "landing"
      ? (isTop && !isOpen ? "bg-transparent text-white" : "bg-zinc-950 text-white") 
      : "bg-zinc-950 text-white border-b"}
  `;

  if (isLoading) {
    return (
      <header>
        <nav className={navClasses}>
          <Link href="/" className="text-xl font-bold">
            Click&Paf.
          </Link>
          <div className="animate-pulse h-8 w-24 bg-gray-200 rounded-full" />
        </nav>
      </header>
    );
  }

  return (
    <header>
      <nav className={navClasses} aria-label="Navigation principale">
        <Link href="/" className="text-xl font-bold" title="Retour à l'accueil">
          Click&Paf.
        </Link>

        <ul className="hidden md:flex items-center gap-8">
          <li>
            <Link className="text-md transition hover:bg-white hover:bg-opacity-20 p-2 rounded-full" href="/histoires">
              Histoires
            </Link>
          </li>
          <li>
            <Link className="text-md transition hover:bg-white hover:bg-opacity-20 p-2 rounded-full" href="/about">
              À propos
            </Link>
          </li>
          <li>
            <Link className="text-md transition hover:bg-white hover:bg-opacity-20 p-2 rounded-full" href="/contact">
              Contact
            </Link>
          </li>

          {user ? (
            <li className="relative" ref={dropdownRef}>
              <div
                onMouseEnter={() => setIsDropdownOpen(true)}
                className="cursor-pointer flex items-center"
              >
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
              </div>

              {isDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-40 rounded-md shadow-md bg-white text-black"
                  onMouseLeave={() => setIsDropdownOpen(false)}
                >
                  <Link
                    href="/profil"
                    className="block px-3 py-2 hover:bg-gray-200"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Profil
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                    }}
                    className="w-full text-left px-3 py-2 hover:bg-gray-200"
                  >
                    Logout
                  </button>
                </div>
              )}
            </li>


          ) : (
            <li>
              <Link
                href={`/login?redirectTo=${encodeURIComponent(pathname)}`}
                className="transition px-4 py-2 rounded-full bg-white text-black hover:bg-black hover:text-white"
              >
                Connexion
              </Link>
            </li>
          )}
        </ul>

        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)} aria-label="Ouvrir le menu">
          {isOpen ? <CloseIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
        </button>
      </nav>

      {isOpen && (
        <div
          id="mobile-menu"
          role="menu"
          className={`
            md:hidden w-full fixed top-16 left-0 shadow-lg -mt-2 z-20
            ${isTop && variant === "landing" ? "bg-black text-white" : "bg-white text-black"}
          `}
        >
          <ul className="flex flex-col items-center gap-4 py-4">
            <li>
              <Link className="text-md transition hover:bg-white hover:bg-opacity-20 p-2 rounded-full" href="/histoires" onClick={() => setIsOpen(false)}>
                Histoires
              </Link>
            </li>
            <li>
              <Link className="text-md transition hover:bg-white hover:bg-opacity-20 p-2 rounded-full" href="/about" onClick={() => setIsOpen(false)}>
                À propos
              </Link>
            </li>
            <li>
              <Link className="text-md transition hover:bg-white hover:bg-opacity-20 p-2 rounded-full" href="/contact" onClick={() => setIsOpen(false)}>
                Contact
              </Link>
            </li>

              {user ? (
                <>
                  <li>
                    <Link href="/profil" onClick={() => setIsOpen(false)} className="text-md transition hover:bg-white hover:bg-opacity-20 p-2 rounded-full">
                      Profil
                    </Link>
                  </li>
                  <li>
                    <button onClick={() => { setIsOpen(false); handleLogout(); }} className="text-md transition hover:bg-white hover:bg-opacity-20 p-2 rounded-full">
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <li>
                  <Link href={`/login?redirectTo=${encodeURIComponent(pathname)}`} onClick={() => setIsOpen(false)} className="transition px-4 py-2 rounded-full bg-white text-black hover:bg-black hover:text-white">
                    Connexion
                  </Link>
                </li>
              )}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
