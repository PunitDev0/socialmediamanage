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
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "@/services/auth.service";

export default function SignupPage() {
  const [error, setError] = useState(null);
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
      PASSWORD: "",
      terms: false,
    },
  });

  // Define mutation outside of onSubmit
  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      console.log("Registration successful:", data);
      // Redirect to dashboard or home after success
      router.push("/login");
    },
    onError: (error) => {
      console.error("Registration failed:", error);
      setError(error.message || "Registration failed. Please try again.");
    },
  });

  const onSubmit = async (data) => {
    setError(null);
    mutation.mutate(data);
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
                Create your account
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-medium text-primary hover:underline"
                  aria-label="Sign in"
                >
                  Sign in
                </Link>
              </p>
            </div>

            <div className="mt-8">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First name</Label>
                    <div className="mt-2">
                      <Input
                        id="firstName"
                        type="text"
                        autoComplete="given-name"
                        className="block w-full"
                        {...register("firstName", {
                          required: "First name is required",
                          minLength: {
                            value: 2,
                            message: "First name must be at least 2 characters",
                          },
                        })}
                      />
                      {errors.firstName && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.firstName.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last name</Label>
                    <div className="mt-2">
                      <Input
                        id="lastName"
                        type="text"
                        autoComplete="family-name"
                        className="block w-full"
                        {...register("lastName", {
                          required: "Last name is required",
                          minLength: {
                            value: 2,
                            message: "Last name must be at least 2 characters",
                          },
                        })}
                      />
                      {errors.lastName && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.lastName.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

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
                      autoComplete="new-password"
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

                <div className="flex items-center">
                  <input
                    id="terms"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    {...register("terms", {
                      required: "You must agree to the terms",
                    })}
                  />
                  <Label htmlFor="terms" className="ml-2 block text-sm">
                    I agree to the{" "}
                    <Link
                      href="/terms"
                      className="font-medium text-primary hover:underline"
                      aria-label="Terms of Service"
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="/privacy"
                      className="font-medium text-primary hover:underline"
                      aria-label="Privacy Policy"
                    >
                      Privacy Policy
                    </Link>
                  </Label>
                </div>
                {errors.terms && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.terms.message}
                  </p>
                )}

                {error && <p className="text-sm text-red-600">{error}</p>}

                <div>
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={mutation.isLoading}
                  >
                    {mutation.isLoading ? "Creating account..." : "Create account"}
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
              <h2 className="text-3xl font-bold mb-4">Join AutoPulse today</h2>
              <p className="text-lg opacity-90">
                Take control of your professional brand and save hours every week with our intelligent automation platform.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}