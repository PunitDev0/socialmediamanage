"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { motion, AnimatePresence } from "framer-motion"

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Content Creator",
    image: "/placeholder.svg?height=100&width=100",
    rating: 5,
    quote:
      "SocialSync has completely transformed how I manage my social media. The AI caption generator saves me hours every week, and the analytics help me understand what content performs best.",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Marketing Manager",
    image: "/placeholder.svg?height=100&width=100",
    rating: 5,
    quote:
      "As a marketing team, we needed a solution that could handle multiple accounts and provide detailed analytics. SocialSync delivers on all fronts and has become an essential part of our workflow.",
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    role: "Small Business Owner",
    image: "/placeholder.svg?height=100&width=100",
    rating: 4,
    quote:
      "The smart scheduling feature has been a game-changer for my small business. I've seen a 40% increase in engagement since switching to SocialSync, and the interface is so intuitive.",
  },
]

export function TestimonialSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const testimonialRef = useRef(null)

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  useEffect(() => {
    // Don't run animations during SSR
    if (typeof window === "undefined") return

    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      // Heading animation
      gsap.from(headingRef.current?.children || [], {
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 80%",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      })

      // Initial testimonial animation
      gsap.from(testimonialRef.current, {
        scrollTrigger: {
          trigger: testimonialRef.current,
          start: "top 70%",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      })
    }, sectionRef)

    // Cleanup function
    return () => {
      ctx.revert()
      // Clean up ScrollTrigger instances
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  // Animation variants for testimonial transitions
  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 200 : -200,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? 200 : -200,
      opacity: 0,
    }),
  }

  // Track the direction of the transition
  const [[page, direction], setPage] = useState([0, 0])

  const paginate = (newDirection) => {
    const newPage = (page + newDirection + testimonials.length) % testimonials.length
    setPage([newPage, newDirection])
    setCurrentIndex(newPage)
  }

  return (
    <section ref={sectionRef} className="py-20 bg-white">
      <div className="container px-4 md:px-6 mx-auto">
        <div ref={headingRef} className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight">What our users say</h2>
          <p className="text-gray-500 mt-2">Don't just take our word for it</p>
        </div>

        <div ref={testimonialRef} className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden rounded-xl bg-lavender-50 p-8 md:p-12 shadow-sm ">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={page}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="flex flex-col items-center text-center"
              >
                <div className="relative mb-6">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    className="h-20 w-20 rounded-full overflow-hidden border-4 border-white shadow-md animate-pulse-glow"
                  >
                    <img
                      src={testimonials[currentIndex].image || "/placeholder.svg"}
                      alt={testimonials[currentIndex].name}
                      className="h-full w-full object-cover"
                    />
                  </motion.div>
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-white rounded-full px-2 py-1 shadow-sm">
                    <div className="flex">
                      {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                      {[...Array(5 - testimonials[currentIndex].rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-gray-300" />
                      ))}
                    </div>
                  </div>
                </div>

                <blockquote className="mb-6 text-lg text-gray-700 italic">
                  "{testimonials[currentIndex].quote}"
                </blockquote>

                <div>
                  <h4 className="font-semibold">{testimonials[currentIndex].name}</h4>
                  <p className="text-sm text-gray-500">{testimonials[currentIndex].role}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center mt-8 gap-4">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant="outline"
                size="icon"
                onClick={() => paginate(-1)}
                className="rounded-full h-10 w-10"
              >
                <ChevronLeft className="h-5 w-5" />
                <span className="sr-only">Previous</span>
              </Button>
            </motion.div>

            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`h-2.5 w-2.5 rounded-full transition-colors ${
                    index === currentIndex
                      ? "bg-violet-500"
                      : "bg-gray-300 hover:bg-violet-300"
                  }`}
                  onClick={() => setCurrentIndex(index)}
                >
                  <span className="sr-only">Testimonial {index + 1}</span>
                </button>
              ))}
            </div>

            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant="outline"
                size="icon"
                onClick={() => paginate(1)}
                className="rounded-full h-10 w-10"
              >
                <ChevronRight className="h-5 w-5" />
                <span className="sr-only">Next</span>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}