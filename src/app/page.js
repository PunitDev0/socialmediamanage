// "use client"

// import Link from "next/link"
// import { ArrowRight, CheckCircle } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { motion } from "framer-motion"

// export default function LandingPage() {
//   return (
//     <div className="flex min-h-screen flex-col">
//       <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
//         <div className="container flex h-16 items-center justify-between max-w-7xl mx-auto">
//           <div className="flex items-center gap-2 font-bold">
//             <div className="size-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white">
//               AP
//             </div>
//             <Link href={'/'}>
//             <span>AutoPulse</span>
//             </Link>
//           </div>
//           <nav className="hidden md:flex gap-6">
//             <Link href="#features" className="text-sm font-medium hover:text-primary">
//               Features
//             </Link>
//             <Link href="#pricing" className="text-sm font-medium hover:text-primary">
//               Pricing
//             </Link>
//             <Link href="#testimonials" className="text-sm font-medium hover:text-primary">
//               Testimonials
//             </Link>
//             <Link href="#faq" className="text-sm font-medium hover:text-primary">
//               FAQ
//             </Link>
//           </nav>
//           <div className="flex items-center gap-4">
//             <Link href="/login">
//               <Button variant="ghost" size="sm">
//                 Log in
//               </Button>
//             </Link>
//             <Link href="/signup">
//               <Button size="sm">Sign up</Button>
//             </Link>
//           </div>
//         </div>
//       </header>
//       <main className="flex-1 flex flex-col items-center justify-center">
//         <section className="py-20 md:py-32 w-full max-w-7xl">
//           <div className="container px-4 md:px-6 mx-auto">
//             <div className="flex flex-col items-center justify-center space-y-4 text-center">
//               <div className="space-y-2">
//                 <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Launching Soon</div>
//                 <motion.h1
//                   className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl"
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.5 }}
//                 >
//                   Automate Your{" "}
//                   <span className="bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
//                     Social Presence
//                   </span>
//                 </motion.h1>
//                 <motion.p
//                   className="mx-auto max-w-[700px] text-muted-foreground md:text-xl"
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.5, delay: 0.2 }}
//                 >
//                   Schedule posts, analyze performance, and grow your professional network with our intelligent
//                   automation platform.
//                 </motion.p>
//               </div>
//               <motion.div
//                 className="flex flex-col gap-2 min-[400px]:flex-row"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, delay: 0.4 }}
//               >
//                 <Link href="/signup">
//                   <Button size="lg" className="group">
//                     Get Started
//                     <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
//                   </Button>
//                 </Link>
//                 <Link href="/dashboard">
//                   <Button variant="outline" size="lg">
//                     View Demo
//                   </Button>
//                 </Link>
//               </motion.div>
//             </div>
//           </div>
//         </section>
//         <section id="features" className="bg-muted/50 py-20 w-full max-w-7xl">
//           <div className="container px-4 md:px-6 mx-auto">
//             <div className="flex flex-col items-center justify-center space-y-4 text-center">
//               <div className="space-y-2">
//                 <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Features</div>
//                 <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Everything You Need</h2>
//                 <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
//                   Our platform provides all the tools you need to manage your LinkedIn presence effectively.
//                 </p>
//               </div>
//             </div>
//             <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
//               {features.map((feature, index) => (
//                 <motion.div
//                   key={index}
//                   className="flex flex-col items-center space-y-2 rounded-lg border p-6 backdrop-blur-sm bg-white/30 dark:bg-black/30 shadow-sm"
//                   initial={{ opacity: 0, y: 20 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.5, delay: index * 0.1 }}
//                   viewport={{ once: true }}
//                 >
//                   <div className="size-12 rounded-full bg-muted flex items-center justify-center">{feature.icon}</div>
//                   <h3 className="text-xl font-bold">{feature.title}</h3>
//                   <p className="text-muted-foreground text-center">{feature.description}</p>
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         </section>
//         <section id="pricing" className="py-20 w-full max-w-7xl">
//           <div className="container px-4 md:px-6 mx-auto">
//             <div className="flex flex-col items-center justify-center space-y-4 text-center">
//               <div className="space-y-2">
//                 <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Pricing</div>
//                 <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
//                   Simple, Transparent Pricing
//                 </h2>
//                 <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
//                   Choose the plan thats right for you and start automating your LinkedIn presence today.
//                 </p>
//               </div>
//             </div>
//             <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
//               {pricingPlans.map((plan, index) => (
//                 <motion.div
//                   key={index}
//                   className={`flex flex-col rounded-lg border p-6 ${
//                     plan.featured ? "border-purple-500 shadow-lg" : ""
//                   }`}
//                   initial={{ opacity: 0, y: 20 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.5, delay: index * 0.1 }}
//                   viewport={{ once: true }}
//                 >
//                   {plan.featured && (
//                     <div className="mb-4 rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-800 dark:bg-purple-900 dark:text-purple-300 w-fit">
//                       Most Popular
//                     </div>
//                   )}
//                   <h3 className="text-2xl font-bold">{plan.name}</h3>
//                   <div className="mt-4 flex items-baseline">
//                     <span className="text-3xl font-bold">${plan.price}</span>
//                     <span className="ml-1 text-muted-foreground">/month</span>
//                   </div>
//                   <p className="mt-2 text-muted-foreground">{plan.description}</p>
//                   <ul className="mt-6 space-y-3">
//                     {plan.features.map((feature, featureIndex) => (
//                       <li key={featureIndex} className="flex items-center">
//                         <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
//                         <span>{feature}</span>
//                       </li>
//                     ))}
//                   </ul>
//                   <div className="mt-auto pt-6">
//                     <Button className="w-full" variant={plan.featured ? "default" : "outline"}>
//                       Get Started
//                     </Button>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         </section>
//         <section className="bg-muted/50 py-20 w-full max-w-7xl">
//           <div className="container px-4 md:px-6 mx-auto">
//             <div className="flex flex-col items-center justify-center space-y-4 text-center">
//               <div className="space-y-2">
//                 <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
//                   Ready to Automate Your LinkedIn Presence?
//                 </h2>
//                 <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
//                   Join thousands of professionals who are saving time and growing their network with AutoPulse.
//                 </p>
//               </div>
//               <motion.div
//                 className="flex flex-col gap-2 min-[400px]:flex-row"
//                 whileInView={{ opacity: [0, 1], y: [20, 0] }}
//                 transition={{ duration: 0.5 }}
//                 viewport={{ once: true }}
//               >
//                 <Link href="/signup">
//                   <Button size="lg" className="group">
//                     Get Started
//                     <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
//                   </Button>
//                 </Link>
//                 <Link href="#demo">
//                   <Button variant="outline" size="lg">
//                     View Demo
//                   </Button>
//                 </Link>
//               </motion.div>
//             </div>
//           </div>
//         </section>
//       </main>
//       <footer className="border-t py-6 md:py-10 w-full">
//         <div className="container flex flex-col items-center justify-between gap-4 md:flex-row max-w-7xl mx-auto">
//           <div className="flex items-center gap-2 font-bold">
//             <div className="size-6 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white text-xs">
//               AP
//             </div>
//             <span>AutoPulse</span>
//           </div>
//           <p className="text-center text-sm text-muted-foreground md:text-left">
//             © {new Date().getFullYear()} AutoPulse. All rights reserved.
//           </p>
//           <div className="flex gap-4">
//             <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
//               Terms
//             </Link>
//             <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
//               Privacy
//             </Link>
//             <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
//               Contact
//             </Link>
//           </div>
//         </div>
//       </footer>
//     </div>
//   )
// }

// const features = [
//   {
//     title: "Post Scheduling",
//     description: "Schedule your LinkedIn posts in advance and let AutoPulse post them at the optimal time.",
//     icon: (
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         width="24"
//         height="24"
//         viewBox="0 0 24 24"
//         fill="none"
//         stroke="currentColor"
//         strokeWidth="2"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         className="lucide lucide-calendar"
//       >
//         <path d="M8 2v4" />
//         <path d="M16 2v4" />
//         <rect width="18" height="18" x="3" y="4" rx="2" />
//         <path d="M3 10h18" />
//       </svg>
//     ),
//   },
//   {
//     title: "Content Creation",
//     description: "Create engaging content with our easy-to-use editor and preview how it will look on LinkedIn.",
//     icon: (
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         width="24"
//         height="24"
//         viewBox="0 0 24 24"
//         fill="none"
//         stroke="currentColor"
//         strokeWidth="2"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         className="lucide lucide-pencil"
//       >
//         <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
//       </svg>
//     ),
//   },
//   {
//     title: "Analytics",
//     description: "Track the performance of your posts and understand what content resonates with your audience.",
//     icon: (
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         width="24"
//         height="24"
//         viewBox="0 0 24 24"
//         fill="none"
//         stroke="currentColor"
//         strokeWidth="2"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         className="lucide lucide-bar-chart"
//       >
//         <line x1="12" x2="12" y1="20" y2="10" />
//         <line x1="18" x2="18" y1="20" y2="4" />
//         <line x1="6" x2="6" y1="20" y2="16" />
//       </svg>
//     ),
//   },
//   {
//     title: "Multi-Account Management",
//     description: "Manage multiple LinkedIn accounts from a single dashboard with ease.",
//     icon: (
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         width="24"
//         height="24"
//         viewBox="0 0 24 24"
//         fill="none"
//         stroke="currentColor"
//         strokeWidth="2"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         className="lucide lucide-users"
//       >
//         <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
//         <circle cx="9" cy="7" r="4" />
//         <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
//         <path d="M16 3.13a4 4 0 0 1 0 7.75" />
//       </svg>
//     ),
//   },
//   {
//     title: "Image Optimization",
//     description: "Automatically optimize your images for LinkedIn to ensure they look great on all devices.",
//     icon: (
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         width="24"
//         height="24"
//         viewBox="0 0 24 24"
//         fill="none"
//         stroke="currentColor"
//         strokeWidth="2"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         className="lucide lucide-image"
//       >
//         <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
//         <circle cx="9" cy="9" r="2" />
//         <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
//       </svg>
//     ),
//   },
//   {
//     title: "AI Suggestions",
//     description: "Get AI-powered suggestions to improve your content and increase engagement.",
//     icon: (
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         width="24"
//         height="24"
//         viewBox="0 0 24 24"
//         fill="none"
//         stroke="currentColor"
//         strokeWidth="2"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         className="lucide lucide-sparkles"
//       >
//         <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
//         <path d="M5 3v4" />
//         <path d="M19 17v4" />
//         <path d="M3 5h4" />
//         <path d="M17 19h4" />
//       </svg>
//     ),
//   },
// ]

// const pricingPlans = [
//   {
//     name: "Starter",
//     price: 9,
//     description: "Perfect for individuals just getting started.",
//     features: ["1 LinkedIn Account", "10 Scheduled Posts per Month", "Basic Analytics", "Email Support"],
//     featured: false,
//   },
//   {
//     name: "Professional",
//     price: 29,
//     description: "Ideal for professionals and small businesses.",
//     features: [
//       "3 LinkedIn Accounts",
//       "50 Scheduled Posts per Month",
//       "Advanced Analytics",
//       "Priority Support",
//       "AI Content Suggestions",
//     ],
//     featured: true,
//   },
//   {
//     name: "Business",
//     price: 79,
//     description: "For teams and businesses with multiple accounts.",
//     features: [
//       "10 LinkedIn Accounts",
//       "Unlimited Scheduled Posts",
//       "Premium Analytics",
//       "24/7 Priority Support",
//       "AI Content Suggestions",
//       "Team Collaboration",
//     ],
//     featured: false,
//   },
// ]

import Home from '@/components/HeroSection/Landing-Page'
import React from 'react'

const page = () => {
  return (
    <div>
      <Home/>
    </div>
  )
}

export default page
