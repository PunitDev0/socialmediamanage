"use client";

import { useState } from "react";
import { Calendar, Download, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DashboardChart } from "@/components/dashboard-chart";
import { AudienceInsights } from "@/components/audience-insights";
import { PostPerformance } from "@/components/post-performance";

// Analytics Dashboard Component
export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState("30days");
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Handle data refresh with a simulated delay
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1500);
  };

  return (
    <div className="flex flex-col gap-6 p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-2"
      >
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
          Analytics Dashboard
        </h1>
        <p className="text-base sm:text-lg text-gray-600">
          Monitor your LinkedIn performance and engagement metrics
        </p>
      </motion.div>

      {/* Controls Section (Sticky on Scroll) */}
      <div className="sticky top-0 z-10 bg-gray-50 py-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <Tabs defaultValue="overview" className="w-full sm:w-auto">
            <TabsList className="grid grid-cols-3 w-full sm:w-auto bg-gray-100 rounded-lg p-1">
              <TabsTrigger
                value="overview"
                className="text-sm sm:text-base font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="posts"
                className="text-sm sm:text-base font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all"
              >
                Posts
              </TabsTrigger>
              <TabsTrigger
                value="audience"
                className="text-sm sm:text-base font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all"
              >
                Audience
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab Content */}
            <TabsContent value="overview" className="mt-0 space-y-6">
              {/* Analytics Cards */}
              <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                {analyticsCards.map((card, index) => (
                  <motion.div
                    key={card.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Card className="hover:shadow-lg transition-shadow duration-300 bg-white border border-gray-200">
                      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm sm:text-base font-semibold text-gray-900">
                          {card.title}
                        </CardTitle>
                        <card.icon className="h-5 w-5 text-gray-500" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl sm:text-3xl font-bold text-gray-900">
                          {card.value}
                        </div>
                        <div className="flex items-center mt-2">
                          <span
                            className={`text-xs sm:text-sm font-medium ${
                              card.trend > 0 ? "text-green-600" : "text-red-600"
                            }`}
                          >
                            {card.trend > 0 ? "↑" : "↓"} {Math.abs(card.trend)}%
                          </span>
                          <span className="text-xs sm:text-sm text-gray-500 ml-2">
                            vs. previous period
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Charts Section */}
              <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2">
                <Card className="bg-white border border-gray-200">
                  <CardHeader>
                    <CardTitle className="text-lg sm:text-xl font-semibold text-gray-900">
                      Engagement Overview
                    </CardTitle>
                    <CardDescription className="text-sm sm:text-base text-gray-600">
                      Track your engagement metrics over time
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[250px] sm:h-[300px]">
                      {isRefreshing ? (
                        <div className="flex items-center justify-center h-full">
                          <RefreshCw className="h-8 w-8 animate-spin text-gray-400" />
                        </div>
                      ) : (
                        <DashboardChart
                          data={engagementData}
                          color="#8b5cf6"
                          showAxis={true}
                          showTooltip={true}
                          showLegend={true}
                        />
                      )}
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-white border border-gray-200">
                  <CardHeader>
                    <CardTitle className="text-lg sm:text-xl font-semibold text-gray-900">
                      Audience Growth
                    </CardTitle>
                    <CardDescription className="text-sm sm:text-base text-gray-600">
                      Track your follower growth over time
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[250px] sm:h-[300px]">
                      {isRefreshing ? (
                        <div className="flex items-center justify-center h-full">
                          <RefreshCw className="h-8 w-8 animate-spin text-gray-400" />
                        </div>
                      ) : (
                        <DashboardChart
                          data={audienceGrowthData}
                          color="#10b981"
                          showAxis={true}
                          showTooltip={true}
                          showLegend={true}
                          areaChart={true}
                        />
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Post Performance Section */}
              <Card className="bg-white border border-gray-200">
                <CardHeader>
                  <CardTitle className="text-lg sm:text-xl font-semibold text-gray-900">
                    Post Performance
                  </CardTitle>
                  <CardDescription className="text-sm sm:text-base text-gray-600">
                    Your top performing posts for the selected period
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isRefreshing ? (
                    <div className="flex items-center justify-center h-[200px]">
                      <RefreshCw className="h-8 w-8 animate-spin text-gray-400" />
                    </div>
                  ) : (
                    <PostPerformance dateRange={dateRange} />
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Posts Tab Content */}
            <TabsContent value="posts" className="mt-0 space-y-6">
              <Card className="bg-white border border-gray-200">
                <CardHeader>
                  <CardTitle className="text-lg sm:text-xl font-semibold text-gray-900">
                    Post Analytics
                  </CardTitle>
                  <CardDescription className="text-sm sm:text-base text-gray-600">
                    Detailed performance metrics for your posts
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isRefreshing ? (
                    <div className="flex items-center justify-center h-[200px]">
                      <RefreshCw className="h-8 w-8 animate-spin text-gray-400" />
                    </div>
                  ) : (
                    <PostPerformance dateRange={dateRange} detailed={true} />
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Audience Tab Content */}
            <TabsContent value="audience" className="mt-0 space-y-6">
              <Card className="bg-white border border-gray-200">
                <CardHeader>
                  <CardTitle className="text-lg sm:text-xl font-semibold text-gray-900">
                    Audience Insights
                  </CardTitle>
                  <CardDescription className="text-sm sm:text-base text-gray-600">
                    Understand your audience demographics and interests
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isRefreshing ? (
                    <div className="flex items-center justify-center h-[200px]">
                      <RefreshCw className="h-8 w-8 animate-spin text-gray-400" />
                    </div>
                  ) : (
                    <AudienceInsights />
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Date Range and Action Buttons */}
          <div className="flex gap-2 w-full sm:w-auto">
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger
                className="w-full sm:w-[180px] bg-white border-gray-200 hover:bg-gray-50 transition-colors"
                aria-label="Select date range"
              >
                <Calendar className="mr-2 h-4 w-4 text-gray-500" />
                <SelectValue placeholder="Select date range" />
              </SelectTrigger>
              <SelectContent className="bg-white border-gray-200">
                <SelectItem value="7days">Last 7 days</SelectItem>
                <SelectItem value="30days">Last 30 days</SelectItem>
                <SelectItem value="90days">Last 90 days</SelectItem>
                <SelectItem value="6months">Last 6 months</SelectItem>
                <SelectItem value="12months">Last 12 months</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              size="icon"
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="bg-white border-gray-200 hover:bg-gray-50 transition-colors"
              aria-label="Refresh data"
            >
              <RefreshCw
                className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""} text-gray-500`}
              />
            </Button>
            <Button
              variant="outline"
              className="bg-white border-gray-200 hover:bg-gray-50 transition-colors"
              aria-label="Export data"
            >
              <Download className="mr-2 h-4 w-4 text-gray-500" />
              Export
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Analytics Cards Data
const analyticsCards = [
  {
    title: "Total Impressions",
    value: "24.5K",
    trend: 12.5,
    icon: ({ className }) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
      >
        <path d="M15 3v18" />
        <rect width="18" height="18" x="3" y="3" rx="2" />
        <path d="M21 9H3" />
        <path d="M21 15H3" />
      </svg>
    ),
  },
  {
    title: "Engagement Rate",
    value: "18.2%",
    trend: 4.3,
    icon: ({ className }) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
      >
        <path d="m22 12-4 4-1.3-1.3" />
        <path d="M22 7.5V12h-4.5" />
        <path d="M2 12h.5" />
        <path d="M2 12h.5" />
        <path d="M7 12h.5" />
        <path d="M12 12h.5" />
        <path d="M17 12h.5" />
        <path d="M4.5 4.5v.5" />
        <path d="M19.5 4.5v.5" />
        <path d="M4.5 19.5v.5" />
        <path d="M19.5 19.5v.5" />
      </svg>
    ),
  },
  {
    title: "Profile Views",
    value: "1,429",
    trend: 24,
    icon: ({ className }) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
      >
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    title: "New Followers",
    value: "128",
    trend: 18.7,
    icon: ({ className }) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
      >
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <line x1="19" x2="19" y1="8" y2="14" />
        <line x1="22" x2="16" y1="11" y2="11" />
      </svg>
    ),
  },
];

// Engagement Data for Chart
const engagementData = [
  { name: "Week 1", Likes: 120, Comments: 45, Shares: 22 },
  { name: "Week 2", Likes: 150, Comments: 55, Shares: 28 },
  { name: "Week 3", Likes: 180, Comments: 70, Shares: 35 },
  { name: "Week 4", Likes: 220, Comments: 90, Shares: 42 },
];

// Audience Growth Data for Chart
const audienceGrowthData = [
  { name: "Jan", Followers: 500 },
  { name: "Feb", Followers: 550 },
  { name: "Mar", Followers: 620 },
  { name: "Apr", Followers: 700 },
  { name: "May", Followers: 850 },
  { name: "Jun", Followers: 1000 },
];