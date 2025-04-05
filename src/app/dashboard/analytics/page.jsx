"use client"

import { useState } from "react"
import { Calendar, Download, RefreshCw } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DashboardChart } from "@/components/dashboard-chart"
import { AudienceInsights } from "@/components/audience-insights"
import { PostPerformance } from "@/components/post-performance"

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState("30days")
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => setIsRefreshing(false), 1500)
  }

  return (
    (<div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground">Track your LinkedIn performance and engagement</p>
      </div>
      <div
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <Tabs defaultValue="overview" className="w-full sm:w-auto">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="audience">Audience</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="flex gap-2 w-full sm:w-auto">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[180px]">
              <Calendar className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Select date range" />
            </SelectTrigger>
            <SelectContent>
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
            disabled={isRefreshing}>
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>
      <TabsContent value="overview" className="mt-0 space-y-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {analyticsCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                  <card.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{card.value}</div>
                  <div className="flex items-center mt-1">
                    <span
                      className={`text-xs ${card.trend > 0 ? "text-green-500" : "text-red-500"}`}>
                      {card.trend > 0 ? "↑" : "↓"} {Math.abs(card.trend)}%
                    </span>
                    <span className="text-xs text-muted-foreground ml-1">vs. previous period</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Engagement Overview</CardTitle>
              <CardDescription>Track your engagement metrics over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <DashboardChart
                  data={engagementData}
                  color="#8b5cf6"
                  showAxis={true}
                  showTooltip={true}
                  showLegend={true} />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Audience Growth</CardTitle>
              <CardDescription>Track your follower growth over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <DashboardChart
                  data={audienceGrowthData}
                  color="#10b981"
                  showAxis={true}
                  showTooltip={true}
                  showLegend={true}
                  areaChart={true} />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Post Performance</CardTitle>
            <CardDescription>Your top performing posts for the selected period</CardDescription>
          </CardHeader>
          <CardContent>
            <PostPerformance dateRange={dateRange} />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="posts" className="mt-0 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Post Analytics</CardTitle>
            <CardDescription>Detailed performance metrics for your posts</CardDescription>
          </CardHeader>
          <CardContent>
            <PostPerformance dateRange={dateRange} detailed={true} />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="audience" className="mt-0 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Audience Insights</CardTitle>
            <CardDescription>Understand your audience demographics and interests</CardDescription>
          </CardHeader>
          <CardContent>
            <AudienceInsights />
          </CardContent>
        </Card>
      </TabsContent>
    </div>)
  );
}

const analyticsCards = [
  {
    title: "Total Impressions",
    value: "24.5K",
    trend: 12.5,
    icon: ({
      className
    }) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}>
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
    icon: ({
      className
    }) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}>
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
    icon: ({
      className
    }) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}>
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
    icon: ({
      className
    }) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <line x1="19" x2="19" y1="8" y2="14" />
        <line x1="22" x2="16" y1="11" y2="11" />
      </svg>
    ),
  },
]

const engagementData = [
  { name: "Week 1", Likes: 120, Comments: 45, Shares: 22 },
  { name: "Week 2", Likes: 150, Comments: 55, Shares: 28 },
  { name: "Week 3", Likes: 180, Comments: 70, Shares: 35 },
  { name: "Week 4", Likes: 220, Comments: 90, Shares: 42 },
]

const audienceGrowthData = [
  { name: "Jan", Followers: 500 },
  { name: "Feb", Followers: 550 },
  { name: "Mar", Followers: 620 },
  { name: "Apr", Followers: 700 },
  { name: "May", Followers: 850 },
  { name: "Jun", Followers: 1000 },
]

