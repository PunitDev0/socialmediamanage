"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Ticket,
  MousePointerSquareDashed,
  Loader2,
  User,
  Settings,
  LogOut,
  Users,
  Bell,
  Folder,
  Star,
  Clock,
  Linkedin,
  ExternalLink,
  LayoutDashboard,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Sidebar({ isSidebarOpen, isMobile, toggleSidebar }) {
  const { user, loading, logout } = useAuth();
  const [isChannelsOpen, setIsChannelsOpen] = useState(true);
  const [isTeamsOpen, setIsTeamsOpen] = useState(false);
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const toggleChannels = () => setIsChannelsOpen((prev) => !prev);
  const toggleTeams = () => setIsTeamsOpen((prev) => !prev);
  const toggleProjects = () => setIsProjectsOpen((prev) => !prev);

  // Map backend platform names to frontend display
  const channels = [
    { platform: "linkedin", Icon: Linkedin, label: "LinkedIn", profileUrl: (accountId) => `https://www.linkedin.com/in/${accountId}` },
    { platform: "facebook", Icon: Facebook, label: "Facebook", profileUrl: (accountId) => `https://www.facebook.com/${accountId}` },
    { platform: "instagram", Icon: Instagram, label: "Instagram", profileUrl: (accountId) => `https://www.instagram.com/${accountId}` },
    { platform: "twitter", Icon: Twitter, label: "Twitter / X", profileUrl: (accountId) => `https://twitter.com/${accountId}` },
    { platform: "threads", Icon: Twitter, label: "Threads", profileUrl: (accountId) => `https://www.threads.net/@${accountId}` },
    { platform: "youtube", Icon: Youtube, label: "YouTube", profileUrl: (accountId) => `https://www.youtube.com/${accountId}` },
    { platform: "tiktok", Icon: Ticket, label: "TikTok", profileUrl: (accountId) => `https://www.tiktok.com/@${accountId}` },
    { platform: "pinterest", Icon: MousePointerSquareDashed, label: "Pinterest", profileUrl: (accountId) => `https://www.pinterest.com/${accountId}` },
    { platform: "startpage", Icon: Loader2, label: "Startpage", profileUrl: () => "#" },
    { platform: "bluesky", Icon: Loader2, label: "Bluesky", profileUrl: () => "#" },
    { platform: "googlebusiness", Icon: Loader2, label: "Google Business Profile", profileUrl: () => "#" },
    { platform: "mastodon", Icon: Loader2, label: "Mastodon", profileUrl: () => "#" },
  ];

  // Initialize connected accounts based on user.socialMedia
  const [connectedAccounts, setConnectedAccounts] = useState(
    channels.reduce((acc, { platform }) => ({ ...acc, [platform]: false }), {})
  );

  // Update connected accounts when user data changes
  useEffect(() => {
    if (user && user.socialMedia) {
      const updatedAccounts = channels.reduce((acc, { platform }) => {
        const isConnected = user.socialMedia.some((sm) => sm.platform === platform);
        return { ...acc, [platform]: isConnected };
      }, {});
      setConnectedAccounts(updatedAccounts);
    }
  }, [user]);

  // Handle LinkedIn connection callback
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get("status");
    if (status === "connected") {
      setConnectedAccounts((prev) => ({ ...prev, linkedin: true }));
      setIsLoading(false);
      toast.success("LinkedIn connected successfully!");
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const connectSocialMedia = async (platform) => {
    if (platform === "linkedin") {
      setIsLoading(true);
      try {
        window.location.href = "http://localhost:5000/api/linkedin/auth";
      } catch (error) {
        setIsLoading(false);
        toast.error("Failed to initiate LinkedIn connection");
      }
    } else if(platform == "facebook"){
      setIsLoading(true);
      try {
        window.location.href = "http://localhost:5000/api/facebook/auth";
      } catch (error) {
        setIsLoading(false);
        toast.error("Failed to initiate LinkedIn connection");
      }
    }else {
      // Placeholder for other platforms
      toast.info(`Connecting ${platform} is not implemented yet.`);
    }
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await logout();
      router.push("/login");
      toast.success("Logged out successfully!");
    } catch (error) {
      toast.error("Failed to log out");
    }
  };

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <aside
      className={cn(
        "w-72 flex-shrink-0 overflow-y-auto border-r bg-card fixed top-0 left-0 h-screen z-40",
        isMobile && !isSidebarOpen && "hidden"
      )}
    >
      <div className="flex flex-col h-full">
        {/* Sidebar Header */}
        <div className="flex h-16 items-center border-b px-4">
          <div className="flex items-center gap-2 font-bold">
            <div className="size-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white">
              AP
            </div>
            <span>AutoPulse</span>
          </div>
          {isMobile && (
            <Button variant="ghost" size="icon" className="ml-auto" onClick={toggleSidebar}>
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </Button>
          )}
        </div>

        {/* Sidebar Content */}
        <div className="p-4 space-y-6 flex-1 overflow-y-auto">
          {/* Channels Section */}
          <div>
            <Button
              variant="ghost"
              className="w-full justify-between text-sm font-medium mb-2"
              onClick={toggleChannels}
            >
              <span>Channels</span>
              <svg
                className={cn("h-4 w-4", isChannelsOpen && "rotate-180")}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M19 9l-7 7-7-7" />
              </svg>
            </Button>
            {isChannelsOpen && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 mb-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder-user.jpg" alt={user?.name || "User"} />
                    <AvatarFallback>{user?.name?.[0] || "U"}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{user?.name || "User"}</span>
                </div>
                {channels.map(({ platform, Icon, label, profileUrl }) => {
                  const isConnected = connectedAccounts[platform];
                  const accountId = isConnected
                    ? user.socialMedia.find((sm) => sm.platform === platform)?.accountId
                    : null;
                  return (
                    <div key={platform} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Icon className="h-5 w-5" />
                        <span className="text-sm">{label}</span>
                      </div>
                      {isConnected ? (
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">Connected</Badge>
                          {accountId && profileUrl(accountId) !== "#" && (
                            <a
                              href={profileUrl(accountId)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 hover:text-blue-700"
                            >
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          )}
                          <Link href={`/dashboard/?sync=${platform}`}>
                            <LayoutDashboard className="h-4 w-4 text-blue-500 hover:text-blue-700" />
                          </Link>
                        </div>
                      ) : (
                        <Button
                          size="sm"
                          variant="default"
                          onClick={() => connectSocialMedia(platform)}
                          disabled={isLoading && platform === "linkedin"}
                        >
                          {isLoading && platform === "linkedin" ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            "Connect"
                          )}
                        </Button>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Teams Section */}
          <div>
            <Button
              variant="ghost"
              className="w-full justify-between text-sm font-medium mb-2"
              onClick={toggleTeams}
            >
              <span>Teams</span>
              <svg
                className={cn("h-4 w-4", isTeamsOpen && "rotate-180")}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M19 9l-7 7-7-7" />
              </svg>
            </Button>
            {isTeamsOpen && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  <span className="text-sm">Marketing Team</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  <span className="text-sm">Content Creators</span>
                </div>
                <Button variant="ghost" className="w-full justify-start text-sm">
                  Add New Team
                </Button>
              </div>
            )}
          </div>

          {/* Projects Section */}
          <div>
            <Button
              variant="ghost"
              className="w-full justify-between text-sm font-medium mb-2"
              onClick={toggleProjects}
            >
              <span>Projects</span>
              <svg
                className={cn("h-4 w-4", isProjectsOpen && "rotate-180")}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M19 9l-7 7-7-7" />
              </svg>
            </Button>
            {isProjectsOpen && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Folder className="h-5 w-5" />
                  <span className="text-sm">Spring Campaign</span>
                </div>
                <div className="flex items-center gap-2">
                  <Folder className="h-5 w-5" />
                  <span className="text-sm">Product Launch</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5" />
                  <span className="text-sm">Favorites</span>
                </div>
                <Button variant="ghost" className="w-full justify-start text-sm">
                  New Project
                </Button>
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              <span className="text-sm">Notifications</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              <span className="text-sm">Recent Activity</span>
            </div>
          </div>
        </div>

        {/* User Profile */}
        <div className="p-4 border-t">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-full justify-start px-2">
                <Avatar className="mr-2 h-8 w-8">
                  <AvatarImage src="/placeholder-user.jpg" alt={user?.name || "User"} />
                  <AvatarFallback>{user?.name?.[0] || "U"}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start text-sm">
                  <span>{user?.name || "User"}</span>
                  <span className="text-xs text-muted-foreground">{user?.email || "user@example.com"}</span>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push("/profile")}>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </aside>
  );
}