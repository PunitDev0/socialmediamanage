"use client"

import React from "react"
import { useRef, useEffect } from "react"
import { Users, Calendar, Share2, Award, Globe, Zap } from "lucide-react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { motion } from "framer-motion"

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export function SocialProofSection() {
  const sectionRef = useRef(null)
  const statsRef = useRef(null)
  const brandsRef = useRef(null)

  useEffect(() => {
    // Don't run animations during SSR
    if (typeof window === "undefined") return

    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      // Stats animation
      gsap.from(statsRef.current?.children || [], {
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      })

      // Brands animation
      gsap.from(brandsRef.current?.children || [], {
        scrollTrigger: {
          trigger: brandsRef.current,
          start: "top 85%",
        },
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
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
    <section ref={sectionRef} className="py-20 bg-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full bg-violet-300/5 blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/4 w-64 h-64 rounded-full bg-indigo-300/5 blur-3xl"></div>
      </div>

      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-block mb-4 px-4 py-1.5 rounded-full bg-violet-100 text-violet-600 text-sm font-medium"
          >
            Trusted Worldwide
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold tracking-tight gradient-heading mb-4"
          >
            Trusted by creators worldwide
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Join thousands of content creators who trust SocialSync to grow their online presence
          </motion.p>
        </div>

        <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          <StatCard
            icon={<Users className="h-8 w-8 text-violet-500" />}
            value="100,000+"
            label="Active Users"
            color="violet"
          />
          <StatCard
            icon={<Calendar className="h-8 w-8 text-indigo-500" />}
            value="5 Million+"
            label="Posts Scheduled"
            color="indigo"
          />
          <StatCard
            icon={<Share2 className="h-8 w-8 text-purple-500" />}
            value="12+"
            label="Platforms Supported"
            color="purple"
          />
          <StatCard
            icon={<Award className="h-8 w-8 text-pink-500" />}
            value="98%"
            label="Customer Satisfaction"
            color="pink"
          />
          <StatCard
            icon={<Globe className="h-8 w-8 text-blue-500" />}
            value="150+"
            label="Countries Served"
            color="blue"
          />
          <StatCard
            icon={<Zap className="h-8 w-8 text-amber-500" />}
            value="40%"
            label="Engagement Increase"
            color="amber"
          />
        </div>

        <div className="text-center mb-10">
          <h3 className="text-xl font-semibold mb-6">Trusted by leading brands</h3>
        </div>

        <div ref={brandsRef} className="flex flex-wrap justify-center gap-8 items-center">
          {["Brand 1", "Brand 2", "Brand 3", "Brand 4", "Brand 5", "Brand 6"].map((brand, index) => (
            <LogoPlaceholder key={brand} text={brand} delay={index * 0.1} />
          ))}
        </div>
      </div>
    </section>
  )
}

function StatCard({
  icon,
  value,
  label,
  color,
}) {
  const colorClasses =
    {
      violet: "from-violet-500 to-violet-300",
      indigo: "from-indigo-500 to-indigo-300",
      purple: "from-purple-500 to-purple-300",
      pink: "from-pink-500 to-pink-300",
      blue: "from-blue-500 to-blue-300",
      amber: "from-amber-500 to-amber-300",
    }[color] || "from-violet-500 to-violet-300"

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="flex flex-col items-center p-6 rounded-xl bg-white shadow-md border border-gray-100 hover:shadow-xl transition-all duration-300 hover-3d"
    >
      <div className={`p-3 rounded-full bg-gradient-to-br ${colorClasses} text-white shadow-md mb-4`}>{icon}</div>
      <h3 className="text-3xl font-bold mb-1">{value}</h3>
      <p className="text-gray-600">{label}</p>
    </motion.div>
  )
}

function LogoPlaceholder({ text, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05 }}
      className="h-16 w-40 px-6 flex items-cente`r justify-center text-gray-400 font-medium border border-gray-200 rounded-lg bg-white/50 backdrop-blur-sm"
    >
      {text}
    </motion.div>
  )
}
