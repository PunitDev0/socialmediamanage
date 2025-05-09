"use client";

import { useState, useEffect } from "react";
import { CalendarDays, ChevronLeft, ChevronRight, LayoutGrid } from "lucide-react";
import {
  format,
  addMonths,
  subMonths,
  addWeeks,
  subWeeks,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  parseISO,
} from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";

import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PostBlock } from "./post-block";
import { EditPostModal } from "./edit-post-modal";
import { cn } from "@/lib/utils";
import { initialPosts } from "@/lib/data";
import { DateDetailModal } from "./date-detail-modal";

export function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState("month");
  const [posts, setPosts] = useState(initialPosts);
  const [editingPost, setEditingPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isDateDetailOpen, setIsDateDetailOpen] = useState(false);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    gsap.from(".calendar-header", {
      y: -20,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out",
    });
  }, []);

  const goToPrevious = () => {
    setDirection(-1);
    if (view === "month") {
      setCurrentDate(subMonths(currentDate, 1));
    } else {
      setCurrentDate(subWeeks(currentDate, 1));
    }
  };

  const goToNext = () => {
    setDirection(1);
    if (view === "month") {
      setCurrentDate(addMonths(currentDate, 1));
    } else {
      setCurrentDate(addWeeks(currentDate, 1));
    }
  };

  const goToToday = () => {
    setDirection(0);
    setCurrentDate(new Date());
  };

  const getDaysToDisplay = () => {
    if (view === "month") {
      const start = startOfWeek(startOfMonth(currentDate));
      const end = endOfWeek(endOfMonth(currentDate));
      return eachDayOfInterval({ start, end });
    } else {
      const start = startOfWeek(currentDate);
      const end = endOfWeek(currentDate);
      return eachDayOfInterval({ start, end });
    }
  };

  const getPostsForDay = (day) => {
    return posts.filter((post) => {
      const postDate = parseISO(post.scheduledTime);
      return isSameDay(postDate, day);
    });
  };

  const handleDrop = (postId, newDate) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === postId) {
          const oldDate = parseISO(post.scheduledTime);
          const newScheduledTime = new Date(
            newDate.getFullYear(),
            newDate.getMonth(),
            newDate.getDate(),
            oldDate.getHours(),
            oldDate.getMinutes(),
          ).toISOString();

          return { ...post, scheduledTime: newScheduledTime };
        }
        return post;
      }),
    );
  };

  const handlePostClick = (post) => {
    setEditingPost(post);
    setIsModalOpen(true);
  };

  const handleUpdatePost = (updatedPost) => {
    setPosts((prevPosts) => prevPosts.map((post) => (post.id === updatedPost.id ? updatedPost : post)));
    setIsModalOpen(false);
    setEditingPost(null);
  };

  const handleDateClick = (day) => {
    setSelectedDate(day);
    setIsDateDetailOpen(true);
  };

  const days = getDaysToDisplay();

  const calendarVariants = {
    hidden: (direction) => ({
      x: direction * 50,
      opacity: 0,
    }),
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
    exit: (direction) => ({
      x: direction * -50,
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "easeIn",
      },
    }),
  };

  return (
    <div className="flex h-full flex-col rounded-xl bg-white shadow-sm ">
      <div className="calendar-header flex items-center justify-between border-b p-4 ">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={goToPrevious} className="group">
            <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          </Button>
          <Button variant="outline" size="sm" onClick={goToNext} className="group">
            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Button>
          <Button variant="outline" size="sm" onClick={goToToday}>
            Today
          </Button>
          <motion.h2
            key={format(currentDate, view === "month" ? "MMMM-yyyy" : "ww-yyyy")}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="ml-4 text-xl font-semibold"
          >
            {view === "month"
              ? format(currentDate, "MMMM yyyy")
              : `Week of ${format(startOfWeek(currentDate), "MMM d")} - ${format(endOfWeek(currentDate), "MMM d, yyyy")}`}
          </motion.h2>
        </div>
        <Tabs value={view} onValueChange={(v) => setView(v)}>
          <TabsList>
            <TabsTrigger value="month" className="relative">
              <CalendarDays className="mr-2 h-4 w-4" />
              Month
              {view === "month" && (
                <motion.div
                  className="absolute inset-0 -z-10 rounded-md bg-primary/10"
                  layoutId="activeTab"
                  transition={{ type: "spring", duration: 0.5 }}
                />
              )}
            </TabsTrigger>
            <TabsTrigger value="week" className="relative">
              <LayoutGrid className="mr-2 h-4 w-4" />
              Week
              {view === "week" && (
                <motion.div
                  className="absolute inset-0 -z-10 rounded-md bg-primary/10"
                  layoutId="activeTab"
                  transition={{ type: "spring", duration: 0.5 }}
                />
              )}
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid grid-cols-7 border-b bg-muted/30 text-center  ">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="p-2 text-sm font-medium">
            {day}
          </div>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={format(currentDate, view === "month" ? "MMMM-yyyy" : "ww-yyyy")}
            custom={direction}
            variants={calendarVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={cn("grid grid-cols-7", view === "month" ? "auto-rows-fr" : "grid-rows-1 h-full")}
          >
            {days.map((day) => {
              const dayPosts = getPostsForDay(day);
              const isCurrentMonth = isSameMonth(day, currentDate);
              const isToday = isSameDay(day, new Date());

              return (
                <motion.div
                  key={day.toISOString()}
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.2, delay: Math.random() * 0.2 }}
                  className={cn(
                    "group min-h-[120px] border p-1 transition-colors hover:bg-slate-50  ",
                    !isCurrentMonth && "bg-muted/20 text-muted-foreground ",
                    isToday && "bg-blue-50/50 ring-1 ring-blue-200  ",
                    "cursor-pointer",
                  )}
                  onClick={() => handleDateClick(day)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    const postId = e.dataTransfer.getData("postId");
                    handleDrop(postId, day);
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={cn(
                        "flex h-6 w-6 items-center justify-center rounded-full text-xs transition-colors",
                        isToday && "bg-primary text-primary-foreground",
                        "group-hover:bg-primary/90 group-hover:text-primary-foreground",
                      )}
                    >
                      {format(day, "d")}
                    </span>
                    {dayPosts.length > 0 && (
                      <span className="rounded-full bg-muted px-1.5 text-xs font-medium ">
                        {dayPosts.length}
                      </span>
                    )}
                  </div>
                  <div className="mt-1 space-y-1 overflow-y-auto">
                    <AnimatePresence>
                      {dayPosts.map((post) => (
                        <PostBlock key={post.id} post={post} onClick={() => handlePostClick(post)} />
                      ))}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      {editingPost && (
        <EditPostModal
          post={editingPost}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingPost(null);
          }}
          onUpdate={handleUpdatePost}
        />
      )}
      {selectedDate && (
        <DateDetailModal
          date={selectedDate}
          posts={getPostsForDay(selectedDate)}
          isOpen={isDateDetailOpen}
          onClose={() => setIsDateDetailOpen(false)}
          onPostClick={handlePostClick}
          onUpdatePost={handleUpdatePost}
        />
      )}
    </div>
  );
}