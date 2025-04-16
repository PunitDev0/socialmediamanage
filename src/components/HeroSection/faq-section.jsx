"use client"

import { useRef, useEffect } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { motion } from "framer-motion"

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const faqs = [
  {
    question: "How does the 14-day free trial work?",
    answer:
      "You can sign up for SocialSync and use all features for 14 days without providing any payment information. At the end of the trial, you can choose a plan that fits your needs or continue with the free plan with limited features.",
  },
  {
    question: "Can I switch plans later?",
    answer:
      "Yes, you can upgrade, downgrade, or cancel your plan at any time. If you upgrade, the new plan will take effect immediately. If you downgrade, the new plan will take effect at the end of your current billing cycle.",
  },
  {
    question: "Which social media platforms are supported?",
    answer:
      "SocialSync supports Instagram, Facebook, Twitter, LinkedIn, Pinterest, TikTok, YouTube, and more. We're constantly adding support for new platforms based on user feedback.",
  },
  {
    question: "How does the AI caption generator work?",
    answer:
      "Our AI caption generator analyzes your content and audience to create engaging captions tailored to your brand voice. You can generate multiple options, edit them to your liking, and save your favorite styles for future use.",
  },
  {
    question: "Is there a limit to how many posts I can schedule?",
    answer:
      "The number of scheduled posts depends on your plan. The Starter plan includes 30 scheduled posts per month, while the Professional and Business plans offer unlimited scheduled posts.",
  },
  {
    question: "Can I collaborate with my team?",
    answer:
      "Yes, the Business plan includes team collaboration features. You can assign roles, manage permissions, and work together on content creation and scheduling.",
  },
]

export function FaqSection() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const accordionRef = useRef(null)

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

      // Accordion animation
      gsap.from(accordionRef.current?.children || [], {
        scrollTrigger: {
          trigger: accordionRef.current,
          start: "top 70%",
        },
        y: 20,
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
    <section ref={sectionRef} id="faq" className="py-20 bg-white">
      <div className="container px-4 md:px-6 max-w-3xl mx-auto">
        <div ref={headingRef} className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight">Frequently asked questions</h2>
          <p className="text-gray-500 mt-2">Everything you need to know about SocialSync</p>
        </div>

        <div ref={accordionRef}>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <AccordionItem value={`item-${index}`} className="border-b border-gray-200">
                  <AccordionTrigger className="text-left font-medium">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-gray-600">{faq.answer}</AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-gray-600">
            Still have questions?{" "}
            <a href="#" className="text-violet-600 font-medium hover:underline">
              Contact our support team
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  )
}