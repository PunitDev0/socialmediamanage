"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Loader2, Check, Github, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function SignupPage() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      terms: false,
    },
  });

  const onSubmit = async (data) => {
    setError(null);
    setIsLoading(true);
    try {
      const response = await axios.post("/api/auth/register", data);
      console.log("Registration successful:", response.data);
      setIsSuccess(true);
      setTimeout(() => {
        router.push("/login");
      }, 1000);
    } catch (error) {
      console.error("Registration failed:", error);
      setError(error.response?.data?.message || "Registration failed. Please try again.");
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
              <Link
                href="/"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Back to home"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="text-sm font-medium">Back to home</span>
              </Link>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center">
                  <AutoPulseLogo className="h-10 w-10" />
                </div>
                <h2 className="text-2xl font-bold tracking-tight">AutoPulse</h2>
              </div>
              <h2 className="mt-2 text-3xl font-bold tracking-tight">Create your account</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-medium text-primary hover:text-primary/90 hover:underline transition-colors"
                  aria-label="Sign in"
                >
                  Sign in
                </Link>
              </p>
            </div>

            <div className="mt-8">
              <div className="space-y-4">
                <Button variant="outline" className="w-full" type="button">
                  <Github className="mr-2 h-4 w-4" />
                  Continue with GitHub
                </Button>
                <Button variant="outline" className="w-full" type="button">
                  <Mail className="mr-2 h-4 w-4" />
                  Continue with Google
                </Button>
              </div>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                </div>
              </div>

              <AnimatePresence mode="wait">
                {error && (
                  <motion.div
                    className="p-3 rounded-md bg-red-50 text-red-600 text-sm mb-4"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label htmlFor="firstName" className="text-sm font-medium">
                      First name
                    </Label>
                    <Input
                      id="firstName"
                      type="text"
                      autoComplete="given-name"
                      className={`block w-full ${errors.firstName ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                      {...register("firstName", {
                        required: "First name is required",
                        minLength: {
                          value: 2,
                          message: "First name must be at least 2 characters",
                        },
                      })}
                    />
                    {errors.firstName && (
                      <motion.p className="mt-1 text-sm text-red-600" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        {errors.firstName.message}
                      </motion.p>
                    )}
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="lastName" className="text-sm font-medium">
                      Last name
                    </Label>
                    <Input
                      id="lastName"
                      type="text"
                      autoComplete="family-name"
                      className={`block w-full ${errors.lastName ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                      {...register("lastName", {
                        required: "Last name is required",
                        minLength: {
                          value: 2,
                          message: "Last name must be at least 2 characters",
                        },
                      })}
                    />
                    {errors.lastName && (
                      <motion.p className="mt-1 text-sm text-red-600" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        {errors.lastName.message}
                      </motion.p>
                    )}
                  </div>
                </div>

                <div className="space-y-1">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    className={`block w-full ${errors.email ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                  />
                  {errors.email && (
                    <motion.p className="mt-1 text-sm text-red-600" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      {errors.email.message}
                    </motion.p>
                  )}
                </div>

                <div className="space-y-1">
                  <Label htmlFor="password" className="text-sm font-medium">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    autoComplete="new-password"
                    className={`block w-full ${errors.password ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters",
                      },
                    })}
                  />
                  {errors.password && (
                    <motion.p className="mt-1 text-sm text-red-600" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      {errors.password.message}
                    </motion.p>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    {...register("terms", {
                      required: "You must agree to the terms",
                    })}
                  />
                  <Label htmlFor="terms" className="text-sm font-medium">
                    I agree to the{" "}
                    <Link
                      href="/terms"
                      className="font-medium text-primary hover:text-primary/90 hover:underline transition-colors"
                      aria-label="Terms of Service"
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="/privacy"
                      className="font-medium text-primary hover:text-primary/90 hover:underline transition-colors"
                      aria-label="Privacy Policy"
                    >
                      Privacy Policy
                    </Link>
                  </Label>
                </div>
                {errors.terms && (
                  <motion.p className="mt-1 text-sm text-red-600" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    {errors.terms.message}
                  </motion.p>
                )}

                <Button
                  type="submit"
                  className="w-full h-11 relative"
                  disabled={isLoading || isSuccess}
                >
                  <AnimatePresence mode="wait">
                    {isLoading && (
                      <motion.div
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 flex items-center justify-center"
                      >
                        <Loader2 className="h-5 w-5 animate-spin" />
                      </motion.div>
                    )}
                    {isSuccess && (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 flex items-center justify-center"
                      >
                        <Check className="h-5 w-5" />
                      </motion.div>
                    )}
                    <motion.span
                      animate={{ opacity: isLoading || isSuccess ? 0 : 1 }}
                      className="flex items-center justify-center"
                    >
                      Create account
                    </motion.span>
                  </AnimatePresence>
                </Button>
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
          <div className="absolute inset-0 h-full w-full bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=800')] opacity-10 bg-repeat"></div>
            <motion.div
              className="p-8 text-white max-w-md z-10"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold mb-4">Join AutoPulse today</h2>
              <p className="text-lg opacity-90 mb-6">
                Take control of your professional brand and save hours every week with our intelligent automation platform.
              </p>
              <div className="flex space-x-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full border-2 border-white bg-blue-400/30 flex items-center justify-center text-xs font-medium"
                    >
                      {["JD", "MK", "AS", "TW"][i - 1]}
                    </div>
                  ))}
                </div>
                <div className="ml-2 flex items-center text-sm">
                  <span>Join 10,000+ users already growing with AutoPulse</span>
                </div>
              </div>
            </motion.div>

            <div className="absolute inset-0 overflow-hidden">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full bg-white/10 backdrop-blur-sm"
                  style={{
                    width: `${Math.random() * 300 + 100}px`,
                    height: `${Math.random() * 300 + 100}px`,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  initial={{
                    x: Math.random() * 100 - 50,
                    y: Math.random() * 100 - 50,
                    opacity: 0.1 + Math.random() * 0.2,
                  }}
                  animate={{
                    x: Math.random() * 100 - 50,
                    y: Math.random() * 100 - 50,
                    opacity: 0.1 + Math.random() * 0.2,
                  }}
                  transition={{
                    duration: 20 + Math.random() * 10,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                    ease: "linear",
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function AutoPulseLogo({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="32" cy="32" r="30" className="fill-blue-50 stroke-blue-500" />
      <path
        d="M20 32 A12 12 0 0 1 32 20 A12 12 0 0 1 44 32 A12 12 0 0 1 32 44 A12 12 0 0 1 20 32 Z"
        className="stroke-blue-500"
        strokeDasharray="4 2"
      />
      <circle cx="32" cy="20" r="4" className="fill-blue-500" />
      <circle cx="20" cy="32" r="4" className="fill-cyan-500" />
      <circle cx="32" cy="44" r="4" className="fill-purple-500" />
      <circle cx="44" cy="32" r="4" className="fill-indigo-500" />
      <path d="M32 20 L20 32 L32 44 L44 32 Z" className="stroke-blue-400" strokeDasharray="2 2" />
    </svg>
  );
}