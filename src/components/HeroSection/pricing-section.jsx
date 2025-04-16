"use client"

import { useState, useRef, useEffect } from "react"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { motion } from "framer-motion"

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(true)
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const pricingRef = useRef(null)

  const plans = [
    {
      name: "Starter",
      description: "Perfect for individuals and small creators",
      price: isAnnual ? 9 : 12,
      features: ["3 social accounts", "30 scheduled posts per month", "Basic analytics", "AI caption suggestions"],
      cta: "Get Started",
      highlighted: false,
    },
    {
      name: "Professional",
      description: "Ideal for growing creators and small businesses",
      price: isAnnual ? 19 : 24,
      features: [
        "10 social accounts",
        "Unlimited scheduled posts",
        "Advanced analytics",
        "AI caption generator",
        "Content calendar",
        "Priority support",
      ],
      cta: "Get Started",
      highlighted: true,
    },
    {
      name: "Business",
      description: "For teams and businesses with multiple brands",
      price: isAnnual ? 49 : 59,
      features: [
        "25 social accounts",
        "Unlimited scheduled posts",
        "Advanced analytics with exports",
        "AI caption generator",
        "Content calendar",
        "Team collaboration",
        "API access",
        "Dedicated support",
      ],
      cta: "Contact Sales",
      highlighted: false,
    },
  ]

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

      // Pricing cards animation
      gsap.from(pricingRef.current?.children || [], {
        scrollTrigger: {
          trigger: pricingRef.current,
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

  // Animation for price change
  const priceVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 300 } },
  }

  return (
    <section ref={sectionRef} id="pricing" className="py-20 bg-lavender-50">
      <div className="container px-4 md:px-6 mx-auto bg-white">
        <div ref={headingRef} className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight">Simple, transparent pricing</h2>
          <p className="text-gray-500 mt-2">Choose the plan that's right for you</p>

          <div className="flex items-center justify-center mt-6">
            <span
              className={`text-sm ${!isAnnual ? "text-gray-900 font-medium" : "text-gray-500"}`}
            >
              Monthly
            </span>
            <Switch checked={isAnnual} onCheckedChange={setIsAnnual} className="mx-3" />
            <span
              className={`text-sm ${isAnnual ? "text-gray-900 font-medium" : "text-gray-500"}`}
            >
              Annually <span className="text-green-500 font-medium">Save 20%</span>
            </span>
          </div>
        </div>

        <div ref={pricingRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 300 }}
              className={`rounded-xl overflow-hidden  bg-white ${
                plan.highlighted
                  ? "bg-white border-2 border-violet-500 shadow-lg relative"
                  : "bg-white border border-gray-200 shadow-sm"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-violet-500 text-white text-xs font-medium px-3 py-1 rounded-full animate-pulse-glow">
                  Most Popular
                </div>
              )}

              <div className="p-6 bg-white">
                <h3 className="text-xl font-bold">{plan.name}</h3>
                <p className="text-gray-500 mt-1 h-12">{plan.description}</p>

                <div className="mt-4 mb-6">
                  <motion.div
                    key={`${plan.name}-${isAnnual ? "annual" : "monthly"}`}
                    variants={priceVariants}
                    initial="initial"
                    animate="animate"
                  >
                    <span className="text-4xl font-bold">${plan.price}</span>
                    <span className="text-gray-500">/month</span>
                    {isAnnual && <div className="text-sm text-gray-500">Billed annually</div>}
                  </motion.div>
                </div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    className={`w-full ${plan.highlighted ? "gradient-button" : ""}`}
                    variant={plan.highlighted ? "default" : "outline"}
                  >
                    {plan.cta}
                  </Button>
                </motion.div>
              </div>

              <div className="border-t border-gray-100 p-6 bg-white">
                <h4 className="font-medium mb-4">What's included:</h4>
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                      <span className="text-gray-600 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-500">
            Need a custom plan?{" "}
            <a href="#" className="text-violet-600 font-medium hover:underline">
              Contact our sales team
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}