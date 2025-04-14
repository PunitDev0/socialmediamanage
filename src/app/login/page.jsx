"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { loginUser } from "@/services/auth.service";

export default function LoginPage() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    setError(null);
    setIsLoading(true);
    try {
      const response = await loginUser(data);
      console.log("Login successful:", response);
      router.push("/dashboard"); // Redirect to dashboard
    } catch (error) {
      console.error("Login failed:", error.message);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1">
        <motion.div
          className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div className="flex items-center gap-2 mb-8">
              <Link href="/" className="flex items-center gap-2" aria-label="Back to home">
                <ArrowLeft className="h-4 w-4" />
                <span className="text-sm">Back to home</span>
              </Link>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="size-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white">
                  AP
                </div>
                <h2 className="text-2xl font-bold tracking-tight">AutoPulse</h2>
              </div>
              <h2 className="mt-2 text-3xl font-bold tracking-tight">
                Sign in to your account
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link
                  href="/signup"
                  className="font-medium text-primary hover:underline"
                  aria-label="Sign up"
                >
                  Sign up
                </Link>
              </p>
            </div>

            <div className="mt-8">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <Label htmlFor="email">Email address</Label>
                  <div className="mt-2">
                    <Input
                      id="email"
                      type="email"
                      autoComplete="email"
                      className="block w-full"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      })}
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="password">Password</Label>
                  <div className="mt-2">
                    <Input
                      id="password"
                      type="password"
                      autoComplete="current-password"
                      className="block w-full"
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 8,
                          message: "Password must be at least 8 characters",
                        },
                      })}
                    />
                    {errors.password && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                </div>

                {error && <p className="text-sm text-red-600">{error}</p>}

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <Label htmlFor="remember-me" className="ml-2 block text-sm">
                      Remember me
                    </Label>
                  </div>

                  <div className="text-sm">
                    <Link
                      href="/forgot-password"
                      className="font-medium text-primary hover:underline"
                      aria-label="Forgot your password"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                </div>

                <div>
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing in..." : "Sign in"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </motion.div>
        <motion.div
          className="relative hidden w-0 flex-1 lg:block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-purple-600 to-blue-500 flex items-center justify-center">
            <div className="p-8 text-white max-w-md">
              <h2 className="text-3xl font-bold mb-4">
                Automate your social presence
              </h2>
              <p className="text-lg opacity-90">
                Schedule posts, analyze performance, and grow your network with our intelligent automation platform.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}