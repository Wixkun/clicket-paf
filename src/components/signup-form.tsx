"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { useRouter, useSearchParams } from "next/navigation";

export function SignupForm({
                             className,
                             ...props
                           }: React.ComponentPropsWithoutRef<"div">) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [error, setError] = useState<Error | null>(null);
  const [success, setSuccess] = useState(false);
  const supabase = createClient();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/";

  // Calcul de la force du mot de passe
  const checkPasswordStrength = (pass: string) => {
    let score = 0;
    if (pass.length > 8) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;
    return score;
  };

  useEffect(() => {
    setPasswordStrength(checkPasswordStrength(password));
  }, [password]);

  const getStrengthColor = () => {
    if (passwordStrength <= 1) return "bg-red-500";
    if (passwordStrength === 2) return "bg-yellow-500";
    if (passwordStrength === 3) return "bg-blue-500";
    return "bg-green-500";
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get("email") as string;
    const passwordValue = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;
    const username = formData.get("username") as string;

    if (passwordValue !== confirmPassword) {
      setError(new Error("Les mots de passe ne correspondent pas."));
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: passwordValue,
        options: {
          data: {
            username: username,
          },
        },
      });
      if (error) throw error;
      console.log(data);
      setSuccess(true);
    } catch (error) {
      console.log(error);
      setError(error as Error);
    }
  };

  if (success) {
    return (
      <main className={`max-w-md mx-auto p-6 ${className}`} {...props}>
        <section className="flex flex-col items-center justify-center p-8 text-center">
          <h1 className="text-2xl font-bold mb-4 text-white">
            Vérifiez vos emails !
          </h1>
          <p className="text-gray-300 mb-2">
            Un email de confirmation a été envoyé à votre adresse.
          </p>
          <p className="text-gray-300">
            Cliquez sur le lien dans l'email pour activer votre compte.
          </p>
        </section>
      </main>
    );
  }

  return (
    <main className={`max-w-md mx-auto p-6 ${className}`} {...props}>
      <header className="text-center mb-6">
        <h1 className="text-2xl font-bold text-white mb-2">Inscription</h1>
        <p className="text-gray-300">
          Entrez vos informations pour créer un compte.
        </p>
      </header>
      <section>
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
          aria-label="Formulaire d'inscription"
        >
          <div>
            <label htmlFor="username" className="block text-gray-300 font-medium">
              Pseudo
            </label>
            <input
              autoComplete="off"
              id="username"
              name="username"
              type="text"
              placeholder="Click&Paf"
              required
              className="w-full px-4 py-2 border border-gray-600 rounded-md bg-black/30 text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>
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
                type={showPassword ? "text" : "password"}
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
                aria-label={
                  showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"
                }
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            {password && (
              <div className="mt-1">
                <div className="h-1 w-full bg-gray-200 rounded">
                  <div
                    className={`h-1 rounded transition-all ${getStrengthColor()}`}
                    style={{ width: `${(passwordStrength / 4) * 100}%` }}
                  />
                </div>
                <p className="text-xs mt-1 text-gray-500">
                  {passwordStrength <= 1 && "Faible"}
                  {passwordStrength === 2 && "Moyen"}
                  {passwordStrength === 3 && "Fort"}
                  {passwordStrength === 4 && "Très fort"}
                </p>
              </div>
            )}
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-gray-300 font-medium"
            >
              Confirmation du mot de passe
            </label>
            <div className="relative">
              <input
                autoComplete="off"
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                required
                placeholder="Confirmez votre mot de passe"
                className="w-full px-4 py-2 border border-gray-600 rounded-md bg-black/30 text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300"
                aria-label={
                  showConfirmPassword
                    ? "Masquer le mot de passe"
                    : "Afficher le mot de passe"
                }
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
          {error && (
            <section role="alert" className="text-sm text-red-500">
              {error.message || "Une erreur est survenue"}
            </section>
          )}
          <button
            type="submit"
            className="w-full bg-violet-600 text-white py-2 rounded-md hover:bg-violet-700 transition"
          >
            Inscription
          </button>
          {/*<button
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
          Vous avez déjà un compte ?{" "}
          <Link
            href={`/login?redirectTo=${encodeURIComponent(redirectTo)}`}
            className="underline underline-offset-4 text-violet-400"
          >
            connectez-vous
          </Link>
        </p>
      </footer>
    </main>
  );
}
