"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-white"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.2, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-4"
            >
              <AutoPulseLogo className="h-16 w-16" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-2xl font-bold bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600 bg-clip-text text-transparent"
            >
              SocialSync
            </motion.h1>
            <div className="mt-6 flex space-x-2">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1, 0] }}
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "loop",
                    duration: 1,
                    delay: i * 0.2,
                    ease: "easeInOut",
                  }}
                  className="h-3 w-3 rounded-full bg-blue-500"
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
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