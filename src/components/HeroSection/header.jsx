'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { user, loading, logout } = useAuth() || { user: null, loading: false, logout: () => {} };

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!mounted || loading) {
    return null;
  }

  const navItems = [
    { name: 'Features', href: '#features' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Blog', href: '/blog' },
  ];

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md' : 'bg-gray-100'
      }`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2" aria-label="SocialSync Home">
            <Image
              src="/assets/logos/socialsynclogo.png"
              alt="SocialSync Logo"
              width={132}
              height={132}
              className="rounded-full"
            />
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <motion.div
                key={item.name}
                whileHover={{ y: -3, color: '#4F46E5' }}
                whileTap={{ y: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  href={item.href}
                  className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors"
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/sync/account/dashboard">
                  <Button
                    variant="ghost"
                    className="hidden md:inline-flex text-gray-600 hover:text-indigo-600 hover:bg-gray-50 rounded-lg"
                  >
                    Dashboard
                  </Button>
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="ghost"
                  className="hidden md:inline-flex text-gray-600 hover:text-indigo-600 hover:bg-gray-50 rounded-lg"
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
                  <Button
                    variant="ghost"
                    className="hidden md:inline-flex text-gray-600 hover:text-indigo-600 hover:bg-gray-50 rounded-lg"
                  >
                    Sign in
                  </Button>
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/signup">
                  <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200">
                    Get Started
                  </Button>
                </Link>
              </motion.div>
            </>
          )}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden text-gray-600 hover:text-indigo-600">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[240px] sm:w-[300px]">
              <nav className="flex flex-col gap-6 mt-8">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
                {user ? (
                  <>
                    <Link
                      href="/sync/account/dashboard"
                      className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors"
                    >
                      Dashboard
                    </Link>
                    <Button
                      variant="outline"
                      className="w-full text-gray-600 hover:text-indigo-600 border-gray-200 hover:bg-gray-50 rounded-lg"
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
                      <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg">
                        Get Started
                      </Button>
                    </Link>
                    <Link href="/login">
                      <Button
                        variant="outline"
                        className="w-full text-gray-600 hover:text-indigo-600 border-gray-200 hover:bg-gray-50 rounded-lg"
                      >
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