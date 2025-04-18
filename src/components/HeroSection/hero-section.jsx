"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Instagram, Twitter, Facebook, Linkedin, Youtube, TwitterIcon as TikTok, ArrowRight } from "lucide-react"
import { gsap } from "gsap"
import { motion } from "framer-motion"
import ScatterText from "./scatter-text"
import AnimatedIcons from "./Animted-Icons"

export function HeroSection() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const descriptionRef = useRef(null)
  const formRef = useRef(null)
  const imageRef = useRef(null)

  useEffect(() => {
    // Don't run animations during SSR
    if (typeof window === "undefined") return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: {
          ease: "power3.out",
          duration: 0.8,
          opacity: 0,
          y: 30,
        },
      })

      tl.from(headingRef.current, { y: 50 })
        .from(descriptionRef.current, {}, "-=0.6")
        .from(formRef.current, {}, "-=0.6")
        .from(imageRef.current, { y: 50, duration: 1 }, "-=0.6")

      // Social icons animation with a slight delay
      const icons = document.querySelectorAll(".social-icon")
      gsap.from(icons, {
        opacity: 0,
        scale: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "back.out(1.7)",
        delay: 1,
      })
    }, sectionRef)

    // Cleanup function
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-20 md:py-32 mx-auto">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-lavender-50/50 to-sky-50/50 -z-10"></div>

      {/* Animated background shapes */}
      <div className="absolute inset-0 -z-5">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-violet-300/10 blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-indigo-300/10 blur-3xl animate-float-delay-3"></div>
      </div>

      {/* Floating social icons */}
      <div className="absolute inset-0 -z-10">
        <Instagram className="social-icon absolute text-pink-300/30 h-12 w-12 top-1/4 left-1/4 animate-float" />
        <Twitter className="social-icon absolute text-blue-300/30 h-10 w-10 top-1/3 right-1/4 animate-float-delay-1" />
        <Facebook className="social-icon absolute text-blue-400/30 h-14 w-14 bottom-1/4 left-1/3 animate-float-delay-2" />
        <Linkedin className="social-icon absolute text-blue-500/30 h-10 w-10 top-1/2 right-1/3 animate-float-delay-3" />
        <Youtube className="social-icon absolute text-red-400/30 h-12 w-12 bottom-1/3 right-1/5 animate-float-delay-4" />
        <TikTok className="social-icon absolute text-gray-400/30 h-10 w-10 bottom-1/4 left-1/5 animate-float-delay-5" />
      </div>

      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center text-center space-y-8 md:space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-2 px-4 py-1.5 rounded-full bg-violet-100 text-violet-600 text-sm font-medium"
          >
            Introducing SocialSync
          </motion.div>

          <div className="space-y-4 max-w-3xl">
            {/* <h1 ref={headingRef} className="text-4xl md:text-6xl font-bold tracking-tighter gradient-heading">
              Grow Your Reach with SocialSync
            </h1> */}
            <ScatterText/>
            <p
              ref={descriptionRef}
              className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
            >
              A smarter way to manage and schedule content across all social platforms. Save time, increase engagement,
              and grow your audience.
            </p>
          </div>

          <div className="w-full max-w-md space-y-2">
            <form ref={formRef} className="flex flex-col sm:flex-row gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="h-12 shadow-sm glass-card focus-visible:ring-violet-500"
              />
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="h-12 px-8 gradient-button animate-pulse-glow">
                  Start for Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            </form>
            <p className="text-sm text-gray-500">Free 14-day trial. No credit card required.</p>
          </div>

          <div ref={imageRef} className="relative w-full max-w-4xl mt-12">
            <div className="aspect-video rounded-xl overflow-hidden shadow-2xl border border-gray-100 glass-card shine-effect">
              <img
                src="/placeholder.svg?height=720&width=1280"
                alt="SocialSync Dashboard"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 -z-10 h-full w-full rounded-xl bg-gradient-to-r from-violet-200 to-indigo-200 opacity-70"></div>
          </div>
        </div>
      </div>
    </section>
  )
}