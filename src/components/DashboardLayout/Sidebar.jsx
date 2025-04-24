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
  ChevronDown,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion"; // For animations
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function Sidebar({ isSidebarOpen, isMobile, toggleSidebar }) {
  const { user, loading, logout } = useAuth();
  const [isChannelsOpen, setIsChannelsOpen] = useState(true);
  const [isTeamsOpen, setIsTeamsOpen] = useState(false);
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState({});
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
  useEffect(()=>{
    if (user && user.socialMedia) {
      const updatedAccounts = channels.reduce((acc, { platform }) => {
        const isConnected = user.socialMedia.some((sm) => sm.platform === platform);
        return { ...acc, [platform]: isConnected };
      }, {});
      setConnectedAccounts(updatedAccounts);
    }
  }, [user]);
 

  // Handle connection callbacks
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get("status");
    const youtubeConnected = urlParams.get("youtubeConnected");
    const facebookConnected = urlParams.get("facebookConnected");
    const pinterestConnected = urlParams.get("pinterestConnected");

    if (status === "connected") {
      setConnectedAccounts((prev) => ({ ...prev, linkedin: true }));
      setIsLoading((prev) => ({

 ...prev, linkedin: false }));
      toast.success("LinkedIn connected successfully!");
      window.history.replaceState({}, document.title, window.location.pathname);
    } else if (youtubeConnected === "true") {
      setConnectedAccounts((prev) => ({ ...prev, youtube: true }));
      setIsLoading((prev) => ({ ...prev, youtube: false }));
      toast.success("YouTube connected successfully!");
      window.history.replaceState({}, document.title, window.location.pathname);
    } else if (facebookConnected === "true") {
      setConnectedAccounts((prev) => ({ ...prev, facebook: true }));
      setIsLoading((prev) => ({ ...prev, facebook: false }));
      toast.success("Facebook connected successfully!");
      window.history.replaceState({}, document.title, window.location.pathname);
    } else if (pinterestConnected === "true") {
      setConnectedAccounts((prev) => ({ ...prev, pinterest: true }));
      setIsLoading((prev) => ({ ...prev, pinterest: false }));
      toast.success("Pinterest connected successfully!");
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  // Connect to social media platforms
  const connectSocialMedia = async (platform) => {
    setIsLoading((prev) => ({ ...prev, [platform]: true }));
    try {
      let authUrl;
      if (platform === "linkedin") {
        const response = await axios.get("http://localhost:5000/api/linkedin/auth", {
          headers: { Authorization: `Bearer ${user.token}` },
          withCredentials: true,
        });
        authUrl = response.data.authUrl;
      } else if (platform === "youtube") {
        const response = await axios.get("http://localhost:5000/api/youtube/auth", { withCredentials: true });
        authUrl = response.data.authUrl;
      } else if (platform === "facebook") {
        const response = await axios.get("http://localhost:5000/api/facebook/auth", { withCredentials: true });
        authUrl = response.data.authUrl;
      } else if (platform === "pinterest") {
        const response = await axios.get("http://localhost:5000/api/pinterest/auth", { withCredentials: true });
        authUrl = response.data.authUrl;
      } else {
        throw new Error(`Connecting ${platform} is not implemented yet.`);
      }
      window.location.href = authUrl;
    } catch (error) {
      setIsLoading((prev) => ({ ...prev, [platform]: false }));
      toast.error(`Failed to initiate ${platform} connection: ${error.message}`);
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

  // if (loading) {
  //   return (
  //     <div className="p-4 flex items-center justify-center h-screen bg-gradient-to-b from-gray-50 to-gray-100">
  //       <Loader2 className="h-8 w-8 animate-spin text-primary" />
  //     </div>
  //   );
  // }

  return (
    <TooltipProvider>
      <motion.aside
        initial={{ x: isMobile ? "-100%" : 0 }}
        animate={{ x: isSidebarOpen || !isMobile ? 0 : "-100%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={cn(
          "w-72 flex-shrink-0 overflow-y-auto border-r bg-gradient-to-b from-white to-gray-50 fixed top-0 left-0 h-screen z-50 shadow-lg",
          isMobile && !isSidebarOpen && "hidden"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex h-16 items-center border-b px-4 bg-white/80 backdrop-blur-sm">
            <div className="flex items-center gap-2 font-bold text-lg">
              <motion.div
                className="size-8 rounded-full bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center text-white"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                AP
              </motion.div>
              <span className="text-gray-800">AutoPulse</span>
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
                className="w-full justify-between text-sm font-semibold mb-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                onClick={toggleChannels}
              >
                <span>Channels</span>
                <motion.div animate={{ rotate: isChannelsOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown className="h-4 w-4" />
                </motion.div>
              </Button>
              <AnimatePresence>
                {isChannelsOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-3 pl-2"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <Avatar className="h-8 w-8 ring-2 ring-purple-200">
                        <AvatarImage src="/placeholder-user.jpg" alt={user?.name || "User"} />
                        <AvatarFallback className="bg-purple-100 text-purple-600">{user?.name?.[0] || "U"}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium text-gray-800">{user?.name || "User"}</span>
                    </div>
                    {channels.map(({ platform, Icon, label, profileUrl }) => {
                      const isConnected = connectedAccounts[platform];
                      const accountId = isConnected
                        ? user.socialMedia.find((sm) => sm.platform === platform)?.accountId
                        : null;
                      return (
                        <motion.div
                          key={platform}
                          className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 transition-colors"
                          whileHover={{ x: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="flex items-center gap-3">
                            <Icon className="h-5 w-5 text-gray-600" />
                            <span className="text-sm text-gray-700">{label}</span>
                          </div>
                          {isConnected ? (
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="bg-green-100 text-green-700 border-green-300">
                                Connected
                              </Badge>
                              {accountId && profileUrl(accountId) !== "#" && (
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <a
                                      href={profileUrl(accountId)}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-blue-500 hover:text-blue-700"
                                    >
                                      <ExternalLink className="h-4 w-4" />
                                    </a>
                                  </TooltipTrigger>
                                  <TooltipContent>Visit Profile</TooltipContent>
                                </Tooltip>
                              )}
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Link href={`/dashboard/?sync=${platform}`}>
                                    <LayoutDashboard className="h-4 w-4 text-blue-500 hover:text-blue-700" />
                                  </Link>
                                </TooltipTrigger>
                                <TooltipContent>Sync Dashboard</TooltipContent>
                              </Tooltip>
                            </div>
                          ) : (
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-purple-300 text-purple-600 hover:bg-purple-50"
                              onClick={() => connectSocialMedia(platform)}
                              disabled={isLoading[platform]}
                            >
                              {isLoading[platform] ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                "Connect"
                              )}
                            </Button>
                          )}
                        </motion.div>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Teams Section */}
            {/* <div>
              <Button
                variant="ghost"
                className="w-full justify-between text-sm font-semibold mb-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                onClick={toggleTeams}
              >
                <span>Teams</span>
                <motion.div animate={{ rotate: isTeamsOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown className="h-4 w-4" />
                </motion.div>
              </Button>
              <AnimatePresence>
                {isTeamsOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-2 pl-2"
                  >
                    <motion.div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100" whileHover={{ x: 5 }}>
                      <Users className="h-5 w-5 text-gray-600" />
                      <span className="text-sm text-gray-700">Marketing Team</span>
                    </motion.div>
                    <motion.div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100" whileHover={{ x: 5 }}>
                      <Users className="h-5 w-5 text-gray-600" />
                      <span className="text-sm text-gray-700">Content Creators</span>
                    </motion.div>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-sm text-purple-600 hover:bg-purple-50 rounded-lg"
                    >
                      Add New Team
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div> */}

            {/* Projects Section */}
            {/* <div>
              <Button
                variant="ghost"
                className="w-full justify-between text-sm font-semibold mb-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                onClick={toggleProjects}
              >
                <span>Projects</span>
                <motion.div animate={{ rotate: isProjectsOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown className="h-4 w-4" />
                </motion.div>
              </Button>
              <AnimatePresence>
                {isProjectsOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-2 pl-2"
                  >
                    <motion.div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100" whileHover={{ x: 5 }}>
                      <Folder className="h-5 w-5 text-gray-600" />
                      <span className="text-sm text-gray-700">Spring Campaign</span>
                    </motion.div>
                    <motion.div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100" whileHover={{ x: 5 }}>
                      <Folder className="h-5 w-5 text-gray-600" />
                      <span className="text-sm text-gray-700">Product Launch</span>
                    </motion.div>
                    <motion.div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100" whileHover={{ x: 5 }}>
                      <Star className="h-5 w-5 text-gray-600" />
                      <span className="text-sm text-gray-700">Favorites</span>
                    </motion.div>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-sm text-purple-600 hover:bg-purple-50 rounded-lg"
                    >
                      New Project
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div> */}

            {/* Quick Links */}
            {/* <div className="space-y-2">
              <motion.div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100" whileHover={{ x: 5 }}>
                <Bell className="h-5 w-5 text-gray-600" />
                <span className="text-sm text-gray-700">Notifications</span>
              </motion.div>
              <motion.div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100" whileHover={{ x: 5 }}>
                <Clock className="h-5 w-5 text-gray-600" />
                <span className="text-sm text-gray-700">Recent Activity</span>
              </motion.div>
            </div> */}
          </div>

          {/* User Profile */}
          <div className="p-4 border-t bg-white/80 backdrop-blur-sm">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full justify-start px-2 hover:bg-gray-100 rounded-lg"
                >
                  <Avatar className="mr-2 h-8 w-8 ring-2 ring-purple-200">
                    <AvatarImage src="/placeholder-user.jpg" alt={user?.name || "User"} />
                    <AvatarFallback className="bg-purple-100 text-purple-600">{user?.name?.[0] || "U"}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start text-sm">
                    <span className="text-gray-800">{user?.name || "User"}</span>
                    <span className="text-xs text-gray-500">{user?.email || "user@example.com"}</span>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-white shadow-lg rounded-lg">
                <DropdownMenuLabel className="text-gray-800">My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => router.push("/profile")}
                  className="text-gray-700 hover:bg-purple-50 cursor-pointer"
                >
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-gray-700 hover:bg-purple-50 cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-red-600 hover:bg-red-50 cursor-pointer"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </motion.aside>
    </TooltipProvider>
  );
}