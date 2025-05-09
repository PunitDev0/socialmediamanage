"use client"

import  React from "react"

import { useState, useEffect, useCallback } from "react"
import { Sidebar } from "@/components/DashboardLayout/Sidebar" 
import { Navbar } from "@/components/DashboardLayout/Navbar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"



export default function DashboardLayout({ children, params }) {
  // State for sidebar and mobile detection
  const {account} = React.use(params)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  // Function to toggle sidebar
  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev)
  }, [])

  // Detect screen size changes
  useEffect(() => {
    const checkScreenSize = () => {
      const isMobileView = window.innerWidth < 768
      setIsMobile(isMobileView)

      // Auto-close sidebar on mobile, keep open on desktop by default
      if (isMobileView !== isMobile) {
        setIsSidebarOpen(!isMobileView)
      }
    }

    // Initial check
    checkScreenSize()

    // Add event listener for resize
    window.addEventListener("resize", checkScreenSize)

    // Cleanup
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [isMobile])

  return (
    <div className="relative min-h-screen bg-gray-100 ">
      {/* Custom styles for transitions and width calculations */}
      <style jsx global>{`
        .dashboard-main {
          transition: width 0.4s ease, margin-left 0.4s ease;
        }
        
        .dashboard-content {
          transition: width 0.4s ease, max-width 0.4s ease;
        }
        
        @media (min-width: 768px) {
          .dashboard-main {
            width: ${isSidebarOpen ? "calc(100vw - 332px)" : "calc(100vw - 104px)"};
            margin-left: ${isSidebarOpen ? "332px" : "104px"};
          }
        }
      `}</style>

      {/* Floating Sidebar */}
      <Sidebar isOpen={isSidebarOpen} isMobile={isMobile} toggleSidebar={toggleSidebar} account={account} />

      {/* Mobile backdrop - only visible when sidebar is open on mobile */}
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 z-20  backdrop-blur-sm md:hidden"
          aria-hidden="true"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main content area */}
      <main
        className={cn(
          "dashboard-main fixed right-0 top-0 h-screen  overflow-hidden",
          "w-full md:w-[calc(100vw-104px)]",
          isMobile
            ? "ml-0"
            : isSidebarOpen
              ? "md:w-[calc(100vw-332px)] md:ml-[332px]"
              : "md:w-[calc(100vw-104px)] md:ml-[104px]",
        )}
      >
        {/* Navbar */}
        <Navbar
          toggleSidebar={toggleSidebar}
          isSidebarOpen={isSidebarOpen}
          isMobile={isMobile}
          account={account}
        />

        {/* Scrollable content area */}
        <ScrollArea className="h-[calc(100vh-64px)] w-full">
          <div className="dashboard-content p-6 min-h-[calc(100vh-64px)] w-auto max-w-full">{children}</div>
        </ScrollArea>
      </main>
    </div>
  )
}
