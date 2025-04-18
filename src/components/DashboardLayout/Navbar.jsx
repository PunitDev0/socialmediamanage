"use client";
import { Button } from "@/components/ui/button";
import {
  Inbox,
  Home,
  BarChart3,
  Calendar,
  LayoutDashboard,
  PenSquare,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname, useSearchParams } from "next/navigation";

export default function Navbar({ toggleSidebar, isMobile }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const sync = searchParams.get("sync"); // 'linkedin', 'facebook', etc.

  const navItems = [
    { name: "Dashboard", href: `/dashboard?sync=${sync}`, icon: LayoutDashboard },
    { name: "Create Post", href: `/dashboard/create-post?sync=${sync}`, icon: PenSquare },
    { name: "Scheduled Posts", href: `/dashboard/scheduled-posts?sync=${sync}`, icon: Calendar },
    { name: "Analytics", href: `/dashboard/analytics?sync=${sync}`, icon: BarChart3 },
    { name: "Settings", href: `/dashboard/settings?sync=${sync}`, icon: Settings },
  ];

  return (
    <header className="top-0 right-0 h-16 bg-card border-b z-30 fixed backdrop-blur-2xl">
      <div className="flex items-center h-full px-4 md:px-6">
        <Button
          variant="ghost"
          size="icon"
          className="mr-2 md:hidden"
          onClick={toggleSidebar}
        >
          <svg
            className="h-6 w-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
          </svg>
        </Button>
        <nav className="hidden md:flex flex-1 space-x-2 px-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <a
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center rounded-md px-3 py-2 text-sm font-medium",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted"
                )}
              >
                <item.icon className="mr-2 h-5 w-5" />
                {item.name}
              </a>
            );
          })}
        </nav>
        <div className="ml-auto flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <Inbox className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Home className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
