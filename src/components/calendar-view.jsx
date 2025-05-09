"use client";
import { useState } from "react"
import { Clock, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { motion, AnimatePresence } from "framer-motion"

export function CalendarView({
  posts = []
}) {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [hoveredPost, setHoveredPost] = useState(null)

  // Get days in month
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  }

  // Get day of week for first day of month (0 = Sunday, 6 = Saturday)
  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  }

  const year = currentMonth.getFullYear()
  const month = currentMonth.getMonth()
  const daysInMonth = getDaysInMonth(year, month)
  const firstDayOfMonth = getFirstDayOfMonth(year, month)

  // Create calendar days array
  const days = []

  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push({ day: null, isCurrentMonth: false })
  }

  // Add days of the current month
  for (let i = 1; i <= daysInMonth; i++) {
    days.push({ day: i, isCurrentMonth: true })
  }

  // Get posts for each day
  const getPostsForDay = (day) => {
    if (!posts.length) return []

    // Mock data for demo with image URLs
    const mockPosts = [
      { 
        date: "May 15, 2025", 
        time: "10:00 AM", 
        content: "Product Launch Announcement", 
        status: "scheduled",
        description: "Announcing our new product line with innovative features",
        platform: "X, LinkedIn",
        imageUrl: "https://via.placeholder.com/150x100?text=Product+Launch"
      },
      { 
        date: "May 18, 2025", 
        time: "2:00 PM", 
        content: "Webinar Promotion", 
        status: "scheduled",
        description: "Promoting our upcoming webinar on digital marketing",
        platform: "X, Instagram",
        imageUrl: "https://via.placeholder.com/150x100?text=Webinar"
      },
      { 
        date: "May 20, 2025", 
        time: "9:00 AM", 
        content: "Hiring Announcement", 
        status: "scheduled",
        description: "We're hiring for multiple positions in our tech team",
        platform: "LinkedIn",
        imageUrl: "https://via.placeholder.com/150x100?text=Hiring"
      },
      { 
        date: "May 22, 2025", 
        time: "3:00 PM", 
        content: "Team Building Event", 
        status: "draft",
        description: "Internal team building event for employees",
        platform: "Internal",
        imageUrl: "https://via.placeholder.com/150x100?text=Team+Building"
      },
      { 
        date: "May 25, 2025", 
        time: "11:00 AM", 
        content: "Case Study Highlight", 
        status: "scheduled",
        description: "Showcasing our latest client success story",
        platform: "X, Website",
        imageUrl: "https://via.placeholder.com/150x100?text=Case+Study"
      },
      { 
        date: "May 28, 2025", 
        time: "1:00 PM", 
        content: "Digital Marketing Summit", 
        status: "draft",
        description: "Announcing our participation in the annual summit",
        platform: "X, LinkedIn",
        imageUrl: "https://via.placeholder.com/150x100?text=Marketing+Summit"
      },
    ]

    // For demo purposes, assign posts to specific days
    if (day === 15 || day === 18 || day === 20 || day === 22 || day === 25 || day === 28) {
      return mockPosts.filter((post) => Number.parseInt(post.date.split(" ")[1]) === day);
    }

    return []
  }

  // Navigate to previous month
  const prevMonth = () => {
    setCurrentMonth(new Date(year, month - 1, 1))
  }

  // Navigate to next month
  const nextMonth = () => {
    setCurrentMonth(new Date(year, month + 1, 1))
  }

  // Format month name
  const monthName = currentMonth.toLocaleString("default", { month: "long" })

  // Day names
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  // Animation variants for the hover card
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8, x: -10 },
    visible: { opacity: 1, scale: 1, x: 0, transition: { duration: 0.2, ease: "easeOut" } },
    exit: { opacity: 0, scale: 0.8, x: -10, transition: { duration: 0.15, ease: "easeIn" } }
  }

  // Animation variants for the image
  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: "easeOut" } }
  }

  return (
    (<div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">
          {monthName} {year}
        </h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={prevMonth}>
            Previous
          </Button>
          <Button variant="outline" size="sm" onClick={nextMonth}>
            Next
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {/* Day names */}
        {dayNames.map((day, index) => (
          <div key={index} className="text-center font-medium text-sm py-2">
            {day}
          </div>
        ))}

        {/* Calendar days */}
        {days.map((day, index) => {
          const postsForDay = day.day ? getPostsForDay(day.day) : []

          return (
            (<div
              key={index}
              className={`min-h-[100px] border rounded-md p-2 ${
                day.isCurrentMonth ? "bg-card" : "bg-muted/30"
              } ${day.day === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear() ? "border-primary" : ""}`}>
              {day.day && (
                <>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{day.day}</span>
                    {postsForDay.length > 0 && (
                      <Badge variant="outline" className="text-xs">
                        {postsForDay.length} post{postsForDay.length > 1 ? "s" : ""}
                      </Badge>
                    )}
                  </div>
                  <div className="space-y-1">
                    {postsForDay.map((post, postIndex) => {
                      const postKey = `${day.day}-${postIndex}`; // Unique key for each post
                      return (
                        <div
                          key={postIndex}
                          className={`text-xs p-1 rounded-sm relative group ${
                            post.status === "scheduled" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                          }`}
                          onMouseEnter={() => setHoveredPost(postKey)}
                          onMouseLeave={() => setHoveredPost(null)}
                        >
                          <div className="flex items-center justify-between">
                            <span className="truncate">{post.content}</span>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-4 w-4 ml-1">
                                  <MoreHorizontal className="h-3 w-3" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                <DropdownMenuItem>Delete</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                          <div className="flex items-center mt-1">
                            <Clock className="h-3 w-3 mr-1" />
                            <span>{post.time}</span>
                          </div>
                          <AnimatePresence>
                            {hoveredPost === postKey && (
                              <motion.div
                                className="absolute z-10 w-64 p-4 bg-card border rounded-md shadow-lg -top-2 left-full ml-2"
                                variants={cardVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                              >
                                <motion.img 
                                  src={post.imageUrl} 
                                  alt={post.content} 
                                  className="w-full h-24 object-cover rounded-md mb-2"
                                  variants={imageVariants}
                                  initial="hidden"
                                  animate="visible"
                                />
                                <h3 className="text-sm font-semibold">{post.content}</h3>
                                <p className="text-xs text-muted-foreground mt-1">{post.description}</p>
                                <div className="mt-2 space-y-1">
                                  <p className="text-xs">
                                    <span className="font-medium">Time:</span> {post.time}
                                  </p>
                                  <p className="text-xs">
                                    <span className="font-medium">Status:</span> {post.status}
                                  </p>
                                  <p className="text-xs">
                                    <span className="font-medium">Platform:</span> {post.platform}
                                  </p>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </div>)
          );
        })}
      </div>
    </div>)
  );
}