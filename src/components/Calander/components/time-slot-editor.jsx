"use client"

import  React from "react"
import { useState, useRef, useEffect } from "react"
import { format, parseISO, setHours, setMinutes } from "date-fns"
import { motion, AnimatePresence } from "framer-motion"
import gsap from "gsap"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Post } from "@/lib/data"



export function TimeSlotEditor({ post, isOpen, onClose, onUpdate }) {
  const [editedPost, setEditedPost] = useState({ ...post })
  const [isDragging, setIsDragging] = useState(false)
  const [currentHour, setCurrentHour] = useState(0)
  const [currentMinute, setCurrentMinute] = useState(0)
  const timelineRef = useRef(null)
  const indicatorRef = useRef(null)
  const timeDisplayRef = useRef(null)

  // Initialize time from post
  useEffect(() => {
    if (post) {
      const date = parseISO(post.scheduledTime)
      setCurrentHour(date.getHours())
      setCurrentMinute(date.getMinutes())
    }
  }, [post])

  // GSAP animation for timeline
  useEffect(() => {
    if (isOpen && timelineRef.current) {
      gsap.fromTo(
        timelineRef.current,
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 0.6, ease: "power3.out", delay: 0.2 },
      )

      gsap.fromTo(".time-marker", { opacity: 0, y: 10 }, { opacity: 1, y: 0, stagger: 0.02, duration: 0.4, delay: 0.4 })
    }
  }, [isOpen])

  // Update indicator position based on current time
  useEffect(() => {
    if (indicatorRef.current && timelineRef.current) {
      const totalMinutes = currentHour * 60 + currentMinute
      const percentage = (totalMinutes / (24 * 60)) * 100

      gsap.to(indicatorRef.current, {
        left: `${percentage}%`,
        duration: 0.3,
        ease: "power2.out",
      })

      if (timeDisplayRef.current) {
        gsap.to(timeDisplayRef.current, {
          scale: isDragging ? 1.1 : 1,
          duration: 0.2,
        })
      }
    }
  }, [currentHour, currentMinute, isDragging])

  const handleTimelineClick = (e) => {
    if (timelineRef.current) {
      const rect = timelineRef.current.getBoundingClientRect()
      const position = (e.clientX - rect.left) / rect.width
      const totalMinutes = Math.floor(position * 24 * 60)

      const hours = Math.floor(totalMinutes / 60)
      const minutes = Math.floor((totalMinutes % 60) / 5) * 5 // Round to nearest 5 minutes

      setCurrentHour(hours)
      setCurrentMinute(minutes)
      updatePostTime(hours, minutes)
    }
  }

  const handleDragStart = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragMove = (e) => {
    if (isDragging && timelineRef.current) {
      const rect = timelineRef.current.getBoundingClientRect()
      const position = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
      const totalMinutes = Math.floor(position * 24 * 60)

      const hours = Math.floor(totalMinutes / 60)
      const minutes = Math.floor((totalMinutes % 60) / 5) * 5 // Round to nearest 5 minutes

      setCurrentHour(hours)
      setCurrentMinute(minutes)
      updatePostTime(hours, minutes)
    }
  }

  const handleDragEnd = () => {
    setIsDragging(false)
  }

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging && timelineRef.current) {
        const rect = timelineRef.current.getBoundingClientRect()
        const position = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
        const totalMinutes = Math.floor(position * 24 * 60)

        const hours = Math.floor(totalMinutes / 60)
        const minutes = Math.floor((totalMinutes % 60) / 5) * 5 // Round to nearest 5 minutes

        setCurrentHour(hours)
        setCurrentMinute(minutes)
        updatePostTime(hours, minutes)
      }
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove)
      window.addEventListener("mouseup", handleMouseUp)
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDragging])

  const updatePostTime = (hours, minutes) => {
    const date = parseISO(editedPost.scheduledTime)
    const newDate = setMinutes(setHours(date, hours), minutes)
    setEditedPost({ ...editedPost, scheduledTime: newDate.toISOString() })
  }

  const handleSave = () => {
    onUpdate(editedPost)
  }

  // Generate time markers for the timeline
  const timeMarkers = Array.from({ length: 25 }, (_, i) => i).map((hour) => {
    const displayHour = hour % 12 === 0 ? (hour === 0 ? "12" : "12") : hour % 12
    const amPm = hour < 12 ? "AM" : "PM"
    return { hour, display: `${displayHour}${hour % 3 === 0 ? amPm : ""}` }
  })

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] ">
        <DialogHeader>
          <DialogTitle className="text-xl">
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              Adjust Time for "{editedPost.title}"
            </motion.div>
          </DialogTitle>
        </DialogHeader>
        <div className="py-6">
          <motion.div
            className="mb-8 text-center"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <h3 className="text-3xl font-bold text-primary">{format(parseISO(editedPost.scheduledTime), "h:mm a")}</h3>
            <p className="text-sm text-muted-foreground">
              {format(parseISO(editedPost.scheduledTime), "EEEE, MMMM d, yyyy")}
            </p>
          </motion.div>

          <div className="relative mt-12">
            <div
              ref={timelineRef}
              className="h-16 w-full cursor-pointer rounded-md bg-slate-100 p-2 "
              onClick={handleTimelineClick}
            >
              <div className="relative h-12 w-full">
                {/* Time markers */}
                <AnimatePresence>
                  {timeMarkers.map((marker) => (
                    <motion.div
                      key={marker.hour}
                      className="time-marker absolute top-12 -translate-x-1/2 text-[10px] text-muted-foreground"
                      style={{ left: `${(marker.hour / 24) * 100}%` }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: marker.hour * 0.02 }}
                    >
                      {marker.display}
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Hour lines */}
                {timeMarkers.map((marker) => (
                  <motion.div
                    key={marker.hour}
                    className="absolute bottom-0 h-4 w-px bg-slate-300 "
                    style={{ left: `${(marker.hour / 24) * 100}%` }}
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ duration: 0.4, delay: marker.hour * 0.02 }}
                  />
                ))}

                {/* AM/PM divider */}
                <motion.div
                  className="absolute bottom-0 h-8 w-0.5 bg-primary/50"
                  style={{ left: "50%" }}
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                />

                {/* Draggable time indicator */}
                <motion.div
                  ref={indicatorRef}
                  className={`absolute -top-1 h-10 w-4 cursor-grab rounded-full bg-primary shadow-lg ${isDragging ? "cursor-grabbing" : ""}`}
                  style={{ left: `${((currentHour * 60 + currentMinute) / (24 * 60)) * 100}%` }}
                  onMouseDown={handleDragStart}
                  onMouseMove={handleDragMove}
                  onMouseUp={handleDragEnd}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  whileTap={{ scale: 1.2 }}
                >
                  <motion.div
                    ref={timeDisplayRef}
                    className="absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap rounded-md bg-primary px-2 py-1 text-xs font-medium text-primary-foreground shadow-md"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 }}
                  >
                    {format(parseISO(editedPost.scheduledTime), "h:mm a")}
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Time</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
