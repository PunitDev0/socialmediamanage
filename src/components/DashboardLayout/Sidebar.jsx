"use client";
import { useState, useEffect } from "react";
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
  Linkedin
} from "lucide-react";

export default function Sidebar({ isSidebarOpen, isMobile, toggleSidebar }) {
  const [connectedAccounts, setConnectedAccounts] = useState({
    facebook: false,
    instagram: false,
    twitter: false,
    threads: false,
    youtube: false,
    tiktok: false,
    pinterest: false,
    startpage: false,
    bluesky: false,
    googlebusiness: false,
    mastodon: false,
    linkedin: false,
  });
  const [isChannelsOpen, setIsChannelsOpen] = useState(true);
  const [isTeamsOpen, setIsTeamsOpen] = useState(false);
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggleChannels = () => setIsChannelsOpen(prev => !prev);
  const toggleTeams = () => setIsTeamsOpen(prev => !prev);
  const toggleProjects = () => setIsProjectsOpen(prev => !prev);

  // Check LinkedIn connection status on mount
  useEffect(() => {
    checkLinkedInStatus();
  }, []);

  const checkLinkedInStatus = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/linkedin/token');
      const data = await response.json();
      if (data.status === 'connected') {
        setConnectedAccounts(prev => ({ ...prev, linkedin: true }));
      }
    } catch (error) {
      console.error('Error checking LinkedIn status:', error);
    }
  };

  const connectSocialMedia = async (platform) => {
    if (platform === 'linkedin') {
      setIsLoading(true);
      try {
        // Redirect to LinkedIn auth
        window.location.href = 'http://localhost:5000/api/linkedin/auth';
      } catch (error) {
        setIsLoading(false);
        toast.error('Failed to initiate LinkedIn connection');
      }
    } else {
      // Handle other platforms
      setConnectedAccounts(prev => ({ ...prev, [platform]: true }));
      try {
        await new Promise(resolve => setTimeout(resolve, 500));
        toast.success(`${platform.charAt(0).toUpperCase() + platform.slice(1)} connected successfully!`);
      } catch (error) {
        setConnectedAccounts(prev => ({ ...prev, [platform]: false }));
        toast.error(`Failed to connect ${platform}`);
      }
    }
  };

  // Handle callback from LinkedIn
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get('status');
    if (status === 'connected') {
      setConnectedAccounts(prev => ({ ...prev, linkedin: true }));
      setIsLoading(false);
      toast.success('LinkedIn connected successfully!');
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const channels = [
    { platform: "linkedin", Icon: Linkedin, label: "LinkedIn" },
    { platform: "facebook", Icon: Facebook },
    { platform: "instagram", Icon: Instagram },
    { platform: "twitter", Icon: Twitter, label: "Twitter / X" },
    { platform: "threads", Icon: Twitter },
    { platform: "youtube", Icon: Youtube },
    { platform: "tiktok", Icon: Ticket },
    { platform: "pinterest", Icon: MousePointerSquareDashed },
    { platform: "startpage", Icon: Loader2 },
    { platform: "bluesky", Icon: Loader2 },
    { platform: "googlebusiness", Icon: Loader2, label: "Google Business Profile" },
    { platform: "mastodon", Icon: Loader2 },
  ];

  return (
    <aside className={cn(
      "w-72 flex-shrink-0 overflow-y-auto border-r bg-card fixed top-0 left-0 h-screen z-40",
      isMobile && !isSidebarOpen && "hidden"
    )}>
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
                    <AvatarImage src="/placeholder-user.jpg" alt="Punit Nigam" />
                    <AvatarFallback>PN</AvatarFallback>
                  </Avatar>
                  <span className="font-medium">Punit Nigam</span>
                </div>
                {channels.map(({ platform, Icon, label = platform.charAt(0).toUpperCase() + platform.slice(1) }) => (
                  <div key={platform} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Icon className="h-5 w-5" />
                      <span className="text-sm">{label}</span>
                    </div>
                    <Button
                      size="sm"
                      variant={connectedAccounts[platform] ? "outline" : "default"}
                      onClick={() => !connectedAccounts[platform] && connectSocialMedia(platform)}
                      disabled={connectedAccounts[platform] || (platform === 'linkedin' && isLoading)}
                    >
                      {connectedAccounts[platform] ? (
                        <Badge variant="secondary">Connected</Badge>
                      ) : isLoading && platform === 'linkedin' ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        "Connect"
                      )}
                    </Button>
                  </div>
                ))}
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
                  <AvatarImage src="/placeholder-user.jpg" alt="User" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start text-sm">
                  <span>John Doe</span>
                  <span className="text-xs text-muted-foreground">john@example.com</span>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
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