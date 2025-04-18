"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { user, loading, logout } = useAuth() || { user: null, loading: false, logout: () => {} }; // Fallback to prevent errors

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent hydration mismatch and wait for auth loading
  if (!mounted || loading) {
    return null;
  }

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        isScrolled ? "bg-white/95 backdrop-blur-sm shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container flex h-16 items-center justify-between mx-auto">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2" aria-label="AutoPulse Home">
            <AutoPulseLogo className="h-8 w-8" />
            <span className="text-xl font-bold tracking-tight">AutoPulse</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            {["Features", "Pricing", "FAQ", "Blog"].map((item) => (
              <motion.div key={item} whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
                <Link
                  href={item === "Blog" ? "/blog" : `#${item.toLowerCase()}`}
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                >
                  {item}
                </Link>
              </motion.div>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/dashboard">
                  <Button variant="ghost" className="hidden md:inline-flex text-muted-foreground hover:text-primary">
                    Dashboard
                  </Button>
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="ghost"
                  className="hidden md:inline-flex text-muted-foreground hover:text-primary"
                  onClick={logout}
                  aria-label="Log out"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </motion.div>
            </>
          ) : (
            <>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/login">
                  <Button variant="ghost" className="hidden md:inline-flex text-muted-foreground hover:text-primary">
                    Sign in
                  </Button>
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/signup">
                  <Button className="bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600 hover:from-cyan-600 hover:via-blue-600 hover:to-purple-700 text-white shadow-md hover:shadow-lg transition-shadow">
                    Get Started
                  </Button>
                </Link>
              </motion.div>
            </>
          )}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col gap-4 mt-8">
                {["Features", "Pricing", "FAQ", "Blog"].map((item) => (
                  <Link
                    key={item}
                    href={item === "Blog" ? "/blog" : `#${item.toLowerCase()}`}
                    className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item}
                  </Link>
                ))}
                {user ? (
                  <>
                    <Link
                      href="/dashboard"
                      className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                    >
                      Dashboard
                    </Link>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={logout}
                      aria-label="Log out"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Link href="/signup">
                      <Button className="w-full bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600 hover:from-cyan-600 hover:via-blue-600 hover:to-purple-700 text-white">
                        Get Started
                      </Button>
                    </Link>
                    <Link href="/login">
                      <Button variant="outline" className="w-full">
                        Sign in
                      </Button>
                    </Link>
                  </>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
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