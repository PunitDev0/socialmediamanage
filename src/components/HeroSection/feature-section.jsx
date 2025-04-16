"use client"

import React from "react"
import { useRef, useEffect } from "react"
import { Sparkles, Clock, BarChart3, Users2, Zap, Shield } from "lucide-react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { motion } from "framer-motion"

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export function FeatureSection() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const descriptionRef = useRef(null)
  const featuresRef = useRef(null)

  useEffect(() => {
    // Don't run animations during SSR
    if (typeof window === "undefined") return

    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      // Heading and description animation
      gsap.from([headingRef.current, descriptionRef.current], {
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

      // Features animation with stagger
      gsap.from(featuresRef.current?.children || [], {
        scrollTrigger: {
          trigger: featuresRef.current,
          start: "top 70%",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
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

  return (
    <section
      ref={sectionRef}
      id="features"
      className="py-24 bg-gradient-to-b from-white to-lavender-50 relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-violet-300/10 blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-indigo-300/10 blur-3xl animate-float-delay-3"></div>
        <div className="absolute top-1/2 right-1/3 w-40 h-40 rounded-full bg-pink-300/10 blur-3xl animate-float-delay-2"></div>
      </div>

      <div className="container px-4 md:px-6 relative z-10 mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-violet-100 text-violet-600 text-sm font-medium">
            Powerful Features
          </div>
          <h2
            ref={headingRef}
            className="text-4xl md:text-5xl font-bold tracking-tight mb-4 gradient-heading"
          >
            Everything you need to succeed
          </h2>
          <p ref={descriptionRef} className="text-xl text-gray-600 mt-2 max-w-3xl mx-auto">
            Powerful features to help you manage, schedule, and analyze your social media content
          </p>
        </div>

        <div ref={featuresRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          <FeatureCard
            icon={<Sparkles className="h-8 w-8 text-violet-500" />}
            title="AI Caption Generator"
            description="Create engaging captions with our AI-powered generator. Save time and boost engagement with captions tailored to your audience."
            imageUrl="/placeholder.svg?height=300&width=500"
            color="violet"
          />

          <FeatureCard
            icon={<Clock className="h-8 w-8 text-indigo-500" />}
            title="Smart Scheduling"
            description="Post at the perfect time with our intelligent scheduling algorithm. Analyze when your audience is most active and schedule accordingly."
            imageUrl="/placeholder.svg?height=300&width=500"
            color="indigo"
          />

          <FeatureCard
            icon={<BarChart3 className="h-8 w-8 text-purple-500" />}
            title="Analytics Dashboard"
            description="Track your performance with detailed analytics. Understand what works and optimize your strategy for better results."
            imageUrl="/placeholder.svg?height=300&width=500"
            color="purple"
          />

          <FeatureCard
            icon={<Users2 className="h-8 w-8 text-pink-500" />}
            title="Multi-Account Support"
            description="Manage all your social media accounts in one place. Switch between accounts seamlessly and maintain a consistent presence."
            imageUrl="/placeholder.svg?height=300&width=500"
            color="pink"
          />

          <FeatureCard
            icon={<Zap className="h-8 w-8 text-amber-500" />}
            title="Content Inspiration"
            description="Never run out of ideas with our content inspiration tool. Get trending topics and suggestions based on your niche and audience."
            imageUrl="/placeholder.svg?height=300&width=500"
            color="amber"
          />

          <FeatureCard
            icon={<Shield className="h-8 w-8 text-emerald-500" />}
            title="Brand Protection"
            description="Monitor mentions and protect your brand reputation. Get alerts for negative comments and respond quickly to maintain your image."
            imageUrl="/placeholder.svg?height=300&width=500"
            color="emerald"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <a
            href="#pricing"
            className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 hover:from-violet-600 hover:to-indigo-600 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            Explore All Features
          </a>
        </motion.div>
      </div>
    </section>
  )
}

function FeatureCard({
  icon,
  title,
  description,
  imageUrl,
  color,
}) {
  const colorClasses =
    {
      violet: "from-violet-500 to-violet-300",
      indigo: "from-indigo-500 to-indigo-300",
      purple: "from-purple-500 to-purple-300",
      pink: "from-pink-500 to-pink-300",
      amber: "from-amber-500 to-amber-300",
      emerald: "from-emerald-500 to-emerald-300",
    }[color] || "from-violet-500 to-violet-300"

  return (
    <motion.div
      whileHover={{ y: -10 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="group rounded-xl overflow-hidden bg-white shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 glass-card"
    >
      <div className="p-6">
        <div className="flex items-center gap-4 mb-4">
          <motion.div
            whileHover={{ rotate: 10, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400 }}
            className={`p-3 rounded-lg bg-gradient-to-br ${colorClasses} text-white shadow-md`}
          >
            {icon}
          </motion.div>
          <h3 className="text-xl font-bold">{title}</h3>
        </div>
        <p className="text-gray-600 mb-6 leading-relaxed">{description}</p>
        <div className="rounded-lg overflow-hidden border border-gray-100 shadow-md group-hover:shadow-lg transition-all duration-300">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="relative overflow-hidden"
          >
            <img
              src={imageUrl || "/placeholder.svg"}
              alt={title}
              className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}