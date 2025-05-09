"use client";

import { useState, useRef, useEffect } from "react";
import { Instagram, Twitter, Facebook, Linkedin, Youtube } from "lucide-react";
import { format, parseISO } from "date-fns";
import { motion } from "framer-motion";
import gsap from "gsap";

import { cn } from "@/lib/utils";

export function PostBlock({ post, onClick }) {
  const [isDragging, setIsDragging] = useState(false);
  const blockRef = useRef(null);

  const platformIcons = {
    instagram: Instagram,
    twitter: Twitter,
    facebook: Facebook,
    linkedin: Linkedin,
    youtube: Youtube,
  };

  const PlatformIcon = platformIcons[post.platform];

  const platformColors = {
    instagram:
      "bg-gradient-to-r from-pink-100 to-purple-100 border-pink-300 text-pink-800 ",
    twitter:
      "bg-gradient-to-r from-blue-100 to-sky-100 border-blue-300 text-blue-800 ",
    facebook:
      "bg-gradient-to-r from-indigo-100 to-blue-100 border-indigo-300 text-indigo-800 ",
    linkedin:
      "bg-gradient-to-r from-sky-100 to-blue-100 border-sky-300 text-sky-800",
    youtube:
      "bg-gradient-to-r from-red-100 to-rose-100 border-red-300 text-red-800 ",
  };

  const colorClass = platformColors[post.platform];

  // GSAP animation for drag start
  useEffect(() => {
    if (isDragging && blockRef.current) {
      gsap.to(blockRef.current, {
        scale: 1.05,
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        duration: 0.2,
      });
    } else if (blockRef.current) {
      gsap.to(blockRef.current, {
        scale: 1,
        boxShadow: "none",
        duration: 0.2,
      });
    }
  }, [isDragging]);

  return (
    <motion.div
      ref={blockRef}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "cursor-pointer rounded-md border p-1.5 text-xs shadow-sm transition-all",
        colorClass,
        isDragging && "opacity-50",
      )}
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData("postId", post.id);
        setIsDragging(true);
      }}
      onDragEnd={() => setIsDragging(false)}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 font-medium">
          <PlatformIcon className="h-3 w-3" />
          <span className="truncate">{post.title}</span>
        </div>
      </div>
      <div className="mt-1 text-[10px] opacity-80">{format(parseISO(post.scheduledTime), "h:mm a")}</div>
    </motion.div>
  );
}