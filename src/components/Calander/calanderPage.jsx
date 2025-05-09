"use client";

import { motion } from "framer-motion";
import { CalendarView } from "@/components/Calander/components/calendar-view";

// Simple fade-in animation variants for the page container
const pageVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};

// Simple fade-in animation variants for the main content
const mainVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.5,
      delay: 0.2,
      ease: "easeInOut",
    },
  },
};

export default function CalanderPage() {
  return (
    <motion.div
      className="flex min-h-screen flex-col"
      variants={pageVariants}
      initial="initial"
      animate="animate"
    >
      <main className="flex-1 overflow-hidden p-2 md:p-4">
        <motion.div variants={mainVariants} initial="initial" animate="animate">
          <CalendarView />
        </motion.div>
      </main>
    </motion.div>
  );
}