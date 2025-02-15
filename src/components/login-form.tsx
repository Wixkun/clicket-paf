"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { createClient } from "@/utils/supabase/client"
import { useRouter, useSearchParams } from "next/navigation"

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [showPassword, setShowPassword] = useState(false)
  const [password, setPassword] = useState("")
  const supabase = createClient();
  const [error, setError] = useState<Error | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirectTo') || '/';

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      if (error) {
        throw error;
      }
      console.log(data);
      router.push(redirectTo);
    } catch (error) {
      console.log(error);
      setError(error as Error);
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Signup</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  className="placeholder:text-gray-400"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-500" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-500" />
                    )}
                  </button>
                </div>
              </div>
              {error && (
                <div className="text-sm text-red-500 mb-4">
                  {error.message || "Une erreur est survenue"}
                </div>
              )}
              <Button type="submit" className="w-full">
                Login
              </Button>
              <Button variant="outline" className="w-full">
                Login with Google
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don't have an account ?{" "}
              <Link href="/signup" className="underline underline-offset-4">
                Signup
              </Link>
            </div>
            <div className="mt-4 text-center text-sm">
              Forgot your password ?{" "}
              <Link href="/forgot-password" className="underline underline-offset-4">
                Reset password
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
