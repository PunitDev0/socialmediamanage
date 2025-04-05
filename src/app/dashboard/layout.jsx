"use client";
import { useState, useEffect } from "react";
import Sidebar from "@/components/DashboardLayout/Sidebar";
import Navbar from "@/components/DashboardLayout/Navbar";

export default function DashboardLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setIsSidebarOpen(!mobile);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <Sidebar 
        isSidebarOpen={isSidebarOpen} 
        isMobile={isMobile} 
        toggleSidebar={toggleSidebar} 
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}

        {/* Scrollable Content */}
        <main className={`flex-1 overflow-y-auto ${isMobile ? 'pl-0' : 'pl-72'} `}>
        <Navbar toggleSidebar={toggleSidebar} isMobile={isMobile} />
          <div className="p-4 md:p-6">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Backdrop */}
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 md:hidden"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
}