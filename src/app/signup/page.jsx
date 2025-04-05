"use client";
import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { motion } from "framer-motion"

export default function SignupPage() {
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      window.location.href = "/dashboard"
    }, 1500)
  }

  return (
    (<div className="flex min-h-screen flex-col">
      <div className="flex flex-1">
        <motion.div
          className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}>
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div className="flex items-center gap-2 mb-8">
              <Link href="/" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                <span className="text-sm">Back to home</span>
              </Link>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div
                  className="size-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white">
                  AP
                </div>
                <h2 className="text-2xl font-bold tracking-tight">AutoPulse</h2>
              </div>
              <h2 className="mt-2 text-3xl font-bold tracking-tight">Create your account</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link href="/login" className="font-medium text-primary hover:underline">
                  Sign in
                </Link>
              </p>
            </div>

            <div className="mt-8">
              <div className="mt-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="first-name">First name</Label>
                      <div className="mt-2">
                        <Input
                          id="first-name"
                          name="first-name"
                          type="text"
                          autoComplete="given-name"
                          required
                          className="block w-full" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="last-name">Last name</Label>
                      <div className="mt-2">
                        <Input
                          id="last-name"
                          name="last-name"
                          type="text"
                          autoComplete="family-name"
                          required
                          className="block w-full" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email address</Label>
                    <div className="mt-2">
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className="block w-full" />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="password">Password</Label>
                    <div className="mt-2">
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="new-password"
                        required
                        className="block w-full" />
                    </div>
                  </div>

                  <div className="flex items-center">
                    <input
                      id="terms"
                      name="terms"
                      type="checkbox"
                      required
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" />
                    <Label htmlFor="terms" className="ml-2 block text-sm">
                      I agree to the{" "}
                      <Link href="#" className="font-medium text-primary hover:underline">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="#" className="font-medium text-primary hover:underline">
                        Privacy Policy
                      </Link>
                    </Label>
                  </div>

                  <div>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Creating account..." : "Create account"}
                    </Button>
                  </div>
                </form>
              </div>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                  </div>
                </div>

                <div className="mt-6">
                  <Button variant="outline" className="w-full" type="button">
                    <Linkedin className="mr-2 h-4 w-4" />
                    Sign up with LinkedIn
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        <motion.div
          className="relative hidden w-0 flex-1 lg:block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}>
          <div
            className="absolute inset-0 h-full w-full bg-gradient-to-r from-purple-600 to-blue-500 flex items-center justify-center">
            <div className="p-8 text-white max-w-md">
              <h2 className="text-3xl font-bold mb-4">Join AutoPulse today</h2>
              <p className="text-lg opacity-90">
                Take control of your professional brand and save hours every week with our intelligent LinkedIn
                automation platform.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>)
  );
}

