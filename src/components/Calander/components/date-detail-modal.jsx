"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { motion } from "framer-motion";
import gsap from "gsap";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TimeSlotEditor } from "./time-slot-editor";

export function DateDetailModal({ date, posts, isOpen, onClose, onPostClick, onUpdatePost }) {
  const [selectedPost, setSelectedPost] = useState(null);
  const [isTimeEditorOpen, setIsTimeEditorOpen] = useState(false);

  // GSAP animation for posts list
  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(
        ".post-item",
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          stagger: 0.05,
          duration: 0.4,
          ease: "power2.out",
          delay: 0.2,
        },
      );
    }
  }, [isOpen, posts]);

  const handlePostClick = (post) => {
    setSelectedPost(post);
    setIsTimeEditorOpen(true);
  };

  const handleTimeEditorClose = () => {
    setIsTimeEditorOpen(false);
    setSelectedPost(null);
  };

  const handleTimeUpdate = (updatedPost) => {
    onUpdatePost(updatedPost);
    setIsTimeEditorOpen(false);
    setSelectedPost(null);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[600px]  ">
          <DialogHeader>
            <DialogTitle className="text-xl">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                Posts for {format(date, "MMMM d, yyyy")}
              </motion.div>
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            {posts.length === 0 ? (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-muted-foreground">
                No posts scheduled for this date
              </motion.p>
            ) : (
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-4">
                  {posts.map((post, index) => (
                    <motion.div
                      key={post.id}
                      className="post-item flex cursor-pointer items-start gap-3 rounded-lg border p-3 transition-colors hover:bg-slate-50  "
                      onClick={() => handlePostClick(post)}
                      whileHover={{ scale: 1.01, boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                          post.platform === "instagram"
                            ? "bg-pink-100 text-pink-600 "
                            : post.platform === "twitter"
                              ? "bg-blue-100 text-blue-600 "
                              : post.platform === "facebook"
                                ? "bg-indigo-100 text-indigo-600  "
                                : post.platform === "linkedin"
                                  ? "bg-sky-100 text-sky-600 "
                                  : "bg-red-100 text-red-600 "
                        }`}
                      >
                        <span className="text-xs font-medium uppercase">{post.platform.slice(0, 2)}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">{post.title}</h3>
                          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-sm  ">
                            {format(new Date(post.scheduledTime), "h:mm a")}
                          </span>
                        </div>
                        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{post.content}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </ScrollArea>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {selectedPost && (
        <TimeSlotEditor
          post={selectedPost}
          isOpen={isTimeEditorOpen}
          onClose={handleTimeEditorClose}
          onUpdate={handleTimeUpdate}
        />
      )}
    </>
  );
}