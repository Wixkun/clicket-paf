'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';
import { useRouter, useSearchParams } from 'next/navigation';

export function LoginForm({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const supabase = createClient();
  const [error, setError] = useState<Error | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirectTo') || '/';

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        throw error;
      }
      router.push(redirectTo);
    } catch (error) {
      console.log(error);
      setError(error as Error);
    }
  };

  return (
    <main className={`max-w-md mx-auto p-6 ${className}`} {...props}>
      <header className="text-center mb-6">
        <h1 className="text-2xl font-bold text-white mb-2">Connexion</h1>
        <p className="text-gray-300">Entrez vos identifiants pour vous connecter à votre compte</p>
      </header>
      <section>
        <form onSubmit={handleSubmit} className="space-y-4" aria-label="Formulaire de connexion">
          <div>
            <label htmlFor="email" className="block text-gray-300 font-medium">
              Email
            </label>
            <input
              autoComplete="off"
              id="email"
              name="email"
              type="email"
              placeholder="m@example.com"
              required
              className="w-full px-4 py-2 border border-gray-600 rounded-md bg-black/30 text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-300 font-medium">
              Mot de passe
            </label>
            <div className="relative">
              <input
                autoComplete="off"
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Votre mot de passe"
                className="w-full px-4 py-2 border border-gray-600 rounded-md bg-black/30 text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300"
                aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
          {error && (
            <section role="alert" className="text-sm text-red-500">
              {error.message || 'Une erreur est survenue'}
            </section>
          )}
          <button type="submit" className="w-full bg-violet-600 text-white py-2 rounded-md hover:bg-violet-700 transition">
            Connexion
          </button>
          {/* <button
            type="button"
            onClick={() => {}}
            className="w-full bg-transparent border border-gray-600 text-white py-2 rounded-md hover:bg-gray-800 transition"
          >
            Connexion avec Google
          </button>*/}
        </form>
      </section>
      <footer className="mt-4 text-center text-sm">
        <p className="text-white">
          Vous n'avez pas de compte ?{' '}
          <Link href="/signup" className="underline underline-offset-4 text-violet-400">
            inscrivez-vous
          </Link>
        </p>
        <p className="text-white mt-2">
          Mot de passe oublié ?{' '}
          <Link href="/forgot-password" className="underline underline-offset-4 text-violet-400">
            Réinitialiser mon mot de passe
          </Link>
        </p>
      </footer>
    </main>
  );
}
