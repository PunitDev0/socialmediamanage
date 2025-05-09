"use client";

import Link from "next/link";
import { useState, useEffect, useCallback, useMemo } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  ChevronLeft,
  ChevronRight,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Ticket,
  MousePointerSquareDashed,
  Loader2,
  Linkedin,
  ExternalLink,
  Calendar,
  FileText,
  BarChart2,
  Image,
  MessageSquare,
  Globe,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

// Custom styles for enhanced sidebar
const styles = `
  .sidebar {
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.95), rgba(240, 240, 240, 0.9));
    backdrop-filter: blur(24px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1), transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    border-radius: 16px;
  }

  .sidebar-section {
    border-bottom: 1px solid rgba(200, 200, 200, 0.15);
    padding-bottom: 1.5rem;
    margin-bottom: 1.5rem;
  }

  .scrollbar-thin::-webkit-scrollbar {
    width: 8px;
  }

  .scrollbar-thin::-webkit-scrollbar-thumb {
    background-color: rgba(100, 100, 100, 0.4);
    border-radius: 8px;
    border: 2px solid transparent;
    background-clip: content-box;
  }

  .scrollbar-thin::-webkit-scrollbar-track {
    background: transparent;
  }

  .social-item {
    transition: all 0.3s ease;
    border-radius: 8px;
  }

  .social-item:hover {
    background-color: rgba(59, 130, 246, 0.15);
    transform: translateX(8px);
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.2);
  }

  .profile-card {
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(245, 245, 245, 0.8));
    border-radius: 12px;
    padding: 16px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
    transition: transform 0.3s ease;
  }

  .profile-card:hover {
    transform: translateY(-4px);
  }

  .section-title {
    font-size: 0.75rem;
    font-weight: 600;
    color: #6b7280;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    padding: 0 12px;
    margin-bottom: 8px;
  }
`;

export function Sidebar({ isOpen, isMobile, toggleSidebar, account }) {
  const { user, loading } = useAuth();
  const [open, setOpen] = useState(isOpen);
  const [isLoading, setIsLoading] = useState({});
  const [connectedAccounts, setConnectedAccounts] = useState({});

  // Navigation items for social media management
  const navItems = useMemo(
    () => [
      { icon: Calendar, label: "Content Calendar", href: "/dashboard/calendar" },
      { icon: FileText, label: "Posts", href: "/dashboard/posts" },
      { icon: BarChart2, label: "Analytics", href: "/dashboard/analytics" },
      { icon: Image, label: "Media Library", href: "/dashboard/media" },
      { icon: MessageSquare, label: "Engagement", href: "/dashboard/engagement" },
      { icon: Globe, label: "Campaigns", href: "/dashboard/campaigns" },
    ],
    []
  );

  // Social media channels
  const channels = useMemo(
    () => [
      {
        platform: "linkedin",
        Icon: Linkedin,
        label: "LinkedIn",
        profileUrl: (accountId) => `https://www.linkedin.com/in/${accountId}`,
        dashboardUrl: "/sync/linkedin/dashboard",
      },
      {
        platform: "facebook",
        Icon: Facebook,
        label: "Facebook",
        profileUrl: (accountId) => `https://www.facebook.com/${accountId}`,
        dashboardUrl: "/sync/facebook/dashboard",
      },
      {
        platform: "instagram",
        Icon: Instagram,
        label: "Instagram",
        profileUrl: (accountId) => `https://www.instagram.com/${accountId}`,
        dashboardUrl: "/sync/instagram/dashboard",
      },
      {
        platform: "twitter",
        Icon: Twitter,
        label: "Twitter / X",
        profileUrl: (accountId) => `https://twitter.com/${accountId}`,
        dashboardUrl: "/sync/twitter/dashboard",
      },
      {
        platform: "threads",
        Icon: Twitter,
        label: "Threads",
        profileUrl: (accountId) => `https://www.threads.net/@${accountId}`,
        dashboardUrl: "/sync/threads/dashboard",
      },
      {
        platform: "youtube",
        Icon: Youtube,
        label: "YouTube",
        profileUrl: (accountId) => `https://www.youtube.com/${accountId}`,
        dashboardUrl: "/sync/youtube/dashboard",
      },
      {
        platform: "tiktok",
        Icon: Ticket,
        label: "TikTok",
        profileUrl: (accountId) => `https://www.tiktok.com/@${accountId}`,
        dashboardUrl: "/sync/tiktok/dashboard",
      },
      {
        platform: "pinterest",
        Icon: MousePointerSquareDashed,
        label: "Pinterest",
        profileUrl: (accountId) => `https://www.pinterest.com/${accountId}`,
        dashboardUrl: "/sync/pinterest/dashboard",
      },
      {
        platform: "startpage",
        Icon: Loader2,
        label: "Startpage",
        profileUrl: () => "#",
        dashboardUrl: "/sync/startpage/dashboard",
      },
      {
        platform: "bluesky",
        Icon: Loader2,
        label: "Bluesky",
        profileUrl: () => "#",
        dashboardUrl: "/sync/bluesky/dashboard",
      },
      {
        platform: "googlebusiness",
        Icon: Loader2,
        label: "Google Business Profile",
        profileUrl: () => "#",
        dashboardUrl: "/sync/googlebusiness/dashboard",
      },
      {
        platform: "mastodon",
        Icon: Loader2,
        label: "Mastodon",
        profileUrl: () => "#",
        dashboardUrl: "/sync/mastodon/dashboard",
      },
    ],
    []
  );

  useEffect(() => {
    if (user && user.socialMedia) {
      const updatedAccounts = channels.reduce(
        (acc, { platform }) => ({
          ...acc,
          [platform]: user.socialMedia.some((sm) => sm.platform === platform),
        }),
        {}
      );
      setConnectedAccounts(updatedAccounts);
    }
  }, [user, channels]);

  const connectSocialMedia = useCallback(
    async (platform) => {
      setIsLoading((prev) => ({ ...prev, [platform]: true }));
      try {
        const response = await axios.get(
          `http://localhost:5000/api/${platform}/auth`,
          {
            headers: { Authorization: `Bearer ${user?.token}` },
            withCredentials: true,
          }
        );
        window.location.href = response.data.authUrl;
      } catch (error) {
        setIsLoading((prev) => ({ ...prev, [platform]: false }));
        toast.error(`Failed to connect ${platform}: ${error.message}`);
      }
    },
    [user]
  );

  // Animation variants for items
  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { delay: i * 0.12, duration: 0.5, ease: "easeOut" },
    }),
    hover: { scale: 1.08, x: 8, transition: { duration: 0.25, ease: "easeOut" } },
  };

  // Profile animation
  const profileVariants = {
    hidden: { opacity: 0, scale: 0.85, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  // Sidebar animation
  const sidebarVariants = {
    hidden: { x: -100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  // For mobile, use Sheet component
  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={(open) => {
        setOpen(open);
        toggleSidebar();
      }}>
        <SheetContent side="left" className="p-0 w-[300px] rounded-r-2xl">
          <MobileSidebarContent
            navItems={navItems}
            channels={channels}
            connectedAccounts={connectedAccounts}
            isLoading={isLoading}
            connectSocialMedia={connectSocialMedia}
            account={account}
          />
        </SheetContent>
      </Sheet>
    );
  }

  // For desktop, use floating sidebar
  return (
    <motion.div
      className={cn("sidebar fixed top-4 left-4 z-40 h-[calc(100vh-2rem)]")}
      variants={sidebarVariants}
      initial="hidden"
      animate="visible"
      style={{ width: isOpen ? 300 : 72 }}
    >
      <style>{styles}</style>
      <div className="flex h-full flex-col">
        {/* Logo and collapse button */}
        <motion.div
          className="flex h-16 items-center justify-between px-4 border-b border-gray-100/50 dark:border-gray-800/50"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Link href="/sync/account/dashboard" className="flex items-center">
            <motion.div
              className="h-8 w-8 rounded-md bg-primary flex items-center justify-center"
              whileHover={{ scale: 1.15, rotate: 15, boxShadow: "0 0 15px rgba(59, 130, 246, 0.3)" }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.25 }}
            >
              <span className="text-primary-foreground font-bold">A</span>
            </motion.div>
            {isOpen && (
              <motion.span
                className="ml-3 font-semibold text-xl tracking-tight"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                SocialSync
              </motion.span>
            )}
          </Link>
          <motion.div whileHover={{ scale: 1.3 }} whileTap={{ scale: 0.85 }}>
            <Button variant="ghost" size="icon" onClick={toggleSidebar} className="h-9 w-9">
              <motion.div
                animate={{ rotate: isOpen ? 0 : 180 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                {isOpen ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
              </motion.div>
            </Button>
          </motion.div>
        </motion.div>

        {/* Channels Section (Scrollable) */}
        <div className="sidebar-section px-3 py-4">
          {isOpen && (
            <motion.h3
              className="section-title"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              Connected Channels
            </motion.h3>
          )}
          <ScrollArea className="h-[300px] scrollbar-thin">
            <motion.div
              className="mt-2 space-y-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              {channels.map((channel, i) => (
                <motion.div
                  key={channel.platform}
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  variants={itemVariants}
                  whileHover="hover"
                >
                  <Link
                    href={channel.dashboardUrl}
                    className={cn(
                      "flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium social-item",
                      account === channel.label.toLowerCase() && "bg-primary/15 text-primary"
                    )}
                  >
                    <div className="flex items-center">
                      <motion.div
                        whileHover={{ scale: 1.25, rotate: 10 }}
                        transition={{ duration: 0.25 }}
                      >
                        <channel.Icon className="h-5 w-5" />
                      </motion.div>
                      {isOpen && <span className="ml-3 font-medium">{channel.label}</span>}
                    </div>
                    {isOpen && (
                      connectedAccounts[channel.platform] ? (
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="outline"
                            className="bg-green-100/70 text-green-800 border-green-300/70 text-xs font-semibold"
                          >
                            Connected
                          </Badge>
                          {channel.profileUrl(
                            user?.socialMedia?.find((sm) => sm.platform === channel.platform)?.accountId
                          ) !== "#" && (
                            <motion.a
                              href={channel.profileUrl(
                                user?.socialMedia?.find((sm) => sm.platform === channel.platform)?.accountId
                              )}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:text-primary/80"
                              whileHover={{ scale: 1.3, rotate: 5 }}
                              whileTap={{ scale: 0.9 }}
                              transition={{ duration: 0.2 }}
                            >
                              <ExternalLink className="h-4 w-4" />
                            </motion.a>
                          )}
                        </div>
                      ) : (
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-xs border-primary/30 hover:bg-primary/15 font-semibold"
                            onClick={() => connectSocialMedia(channel.platform)}
                            disabled={isLoading[channel.platform]}
                          >
                            {isLoading[channel.platform] ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              "Connect"
                            )}
                          </Button>
                        </motion.div>
                      )
                    )}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </ScrollArea>
        </div>

        {/* Navigation Section */}
        <ScrollArea className="flex-1 px-3 py-4 scrollbar-thin">
          <div className="sidebar-section">
            {isOpen && (
              <motion.h3
                className="section-title"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.6 }}
              >
                Management Tools
              </motion.h3>
            )}
            {navItems.map((item, i) => (
              <motion.div
                key={item.label}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={itemVariants}
                whileHover="hover"
              >
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center rounded-md px-3 py-2 text-sm font-medium social-item",
                    "hover:text-primary",
                    account === item.label.toLowerCase() && "bg-primary/15 text-primary"
                  )}
                >
                  <motion.div
                    whileHover={{ rotate: 8, scale: 1.2 }}
                    transition={{ duration: 0.25 }}
                  >
                    <item.icon className="h-5 w-5" />
                  </motion.div>
                  {isOpen && <span className="ml-3 font-medium">{item.label}</span>}
                </Link>
              </motion.div>
            ))}
          </div>
        </ScrollArea>

        {/* Footer with User Details */}
        <motion.div
          className="mt-auto border-t border-gray-100/50 dark:border-gray-800/50 px-4 py-4"
          variants={profileVariants}
          initial="hidden"
          animate="visible"
        >
          {isOpen && (
            <div className="profile-card">
              <div className="flex items-center gap-3">
                <motion.div
                  className="h-12 w-12 rounded-full bg-gradient-to-r from-primary/25 to-primary/45 flex items-center justify-center"
                  whileHover={{ scale: 1.15, boxShadow: "0 0 20px rgba(59, 130, 246, 0.4)" }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-primary font-bold text-lg">
                    {user?.name?.[0] || "U"}
                  </span>
                </motion.div>
                <div>
                  <motion.p
                    className="text-sm font-semibold text-gray-800"
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                  >
                    {user?.name || "User"}
                  </motion.p>
                  <motion.p
                    className="text-xs text-gray-500"
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                  >
                    {user?.email || "user@example.com"}
                  </motion.p>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}

// Mobile sidebar content
function MobileSidebarContent({
  navItems,
  channels,
  connectedAccounts,
  isLoading,
  connectSocialMedia,
  account,
}) {
  const { user } = useAuth();

  return (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <motion.div
        className="flex h-16 items-center px-4 border-b border-gray-100/50 dark:border-gray-800/50"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Link href="/sync/account/dashboard" className="flex items-center">
          <motion.div
            className="h-8 w-8 rounded-md bg-primary flex items-center justify-center"
            whileHover={{ scale: 1.15, rotate: 15, boxShadow: "0 0 15px rgba(59, 130, 246, 0.3)" }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.25 }}
          >
            <span className="text-primary-foreground font-bold">A</span>
          </motion.div>
          <motion.span
            className="ml-3 font-semibold text-xl tracking-tight"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            SocialSync
          </motion.span>
        </Link>
      </motion.div>

      {/* Channels Section (Scrollable) */}
      <div className="sidebar-section px-3 py-4">
        <motion.h3
          className="section-title"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          Connected Channels
        </motion.h3>
        <ScrollArea className="h-[300px] scrollbar-thin">
          <motion.div
            className="mt-2 space-y-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {channels.map((channel, i) => (
              <motion.div
                key={channel.platform}
                custom={i}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                whileHover={{ scale: 1.08, x: 8 }}
              >
                <Link
                  href={channel.dashboardUrl}
                  className={cn(
                    "flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium social-item",
                    account === channel.label.toLowerCase() && "bg-primary/15 text-primary"
                  )}
                >
                  <div className="flex items-center">
                    <motion.div
                      whileHover={{ scale: 1.25, rotate: 10 }}
                      transition={{ duration: 0.25 }}
                    >
                      <channel.Icon className="h-5 w-5" />
                    </motion.div>
                    <span className="ml-3 font-medium">{channel.label}</span>
                  </div>
                  {connectedAccounts[channel.platform] ? (
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className="bg-green-100/70 text-green-800 border-green-300/70 text-xs font-semibold"
                      >
                        Connected
                      </Badge>
                      {channel.profileUrl(
                        user?.socialMedia?.find((sm) => sm.platform === channel.platform)?.accountId
                      ) !== "#" && (
                        <motion.a
                          href={channel.profileUrl(
                            user?.socialMedia?.find((sm) => sm.platform === channel.platform)?.accountId
                          )}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary/80"
                          whileHover={{ scale: 1.3, rotate: 5 }}
                          whileTap={{ scale: 0.9 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ExternalLink className="h-4 w-4" />
                        </motion.a>
                      )}
                    </div>
                  ) : (
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-xs border-primary/30 hover:bg-primary/15 font-semibold"
                        onClick={() => connectSocialMedia(channel.platform)}
                        disabled={isLoading[channel.platform]}
                      >
                        {isLoading[channel.platform] ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          "Connect"
                        )}
                      </Button>
                    </motion.div>
                  )}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </ScrollArea>
      </div>

      {/* Navigation Section */}
      <ScrollArea className="flex-1 px-3 py-4 scrollbar-thin">
        <div className="sidebar-section">
          <motion.h3
            className="section-title"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            Management Tools
          </motion.h3>
          {navItems.map((item, i) => (
            <motion.div
              key={item.label}
              custom={i}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              whileHover={{ scale: 1.08, x: 8 }}
            >
              <Link
                href={item.href}
                className={cn(
                  "flex items-center rounded-md px-3 py-2 text-sm font-medium social-item",
                  "hover:text-primary",
                  account === item.label.toLowerCase() && "bg-primary/15 text-primary"
                )}
              >
                <motion.div
                  whileHover={{ rotate: 8, scale: 1.2 }}
                  transition={{ duration: 0.25 }}
                >
                  <item.icon className="h-5 w-5" />
                </motion.div>
                <span className="ml-3 font-medium">{item.label}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </ScrollArea>

      {/* Footer with User Details */}
      <motion.div
        className="mt-auto border-t border-gray-100/50 dark:border-gray-800/50 px-4 py-4"
        initial={{ opacity: 0, scale: 0.85, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="profile-card">
          <div className="flex items-center gap-3">
            <motion.div
              className="h-12 w-12 rounded-full bg-gradient-to-r from-primary/25 to-primary/45 flex items-center justify-center"
              whileHover={{ scale: 1.15, boxShadow: "0 0 20px rgba(59, 130, 246, 0.4)" }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-primary font-bold text-lg">
                {user?.name?.[0] || "U"}
              </span>
            </motion.div>
            <div>
              <motion.p
                className="text-sm font-semibold text-gray-800"
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                {user?.name || "User"}
              </motion.p>
              <motion.p
                className="text-xs text-gray-500"
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
              >
                {user?.email || "user@example.com"}
              </motion.p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}