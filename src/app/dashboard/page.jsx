"use client"

import { useState } from "react"
import Link from "next/link"
import { BarChart3, Calendar, Clock, ExternalLink, PenSquare, TrendingUp, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import { DashboardChart } from "@/components/dashboard-chart"
import { CalendarView } from "@/components/calendar-view"
import { NotificationsList } from "@/components/notifications-list"
import { AddPostForm } from "@/components/add-post-form"
import { useParams, useSearchParams } from "next/navigation"

export default function DashboardPage() {
  const [isAddPostOpen, setIsAddPostOpen] = useState(false)
  const searchParams = useSearchParams()
  const sync = searchParams.get('sync') // gets 'linkedin', 'facebook', etc.
  console.log(sync);
  
  const handleAddPost = (values) => {
    console.log("New post values:", values)
    // Here you would typically send this data to your API
  }

  return (
    (<div className="flex flex-col gap-6">
      <div
        className="flex flex-col md:flex-row md:items-center justify-between gap-2">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's an overview of your LinkedIn automation.</p>
        </div>
        <Button onClick={() => setIsAddPostOpen(true)}>
          <PenSquare className="mr-2 h-4 w-4" />
          Create New Post
        </Button>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {dashboardCards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}>
            <Card className="overflow-hidden">
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
                  <span className="text-xs text-muted-foreground ml-1">from last month</span>
                </div>
                {card.sparkline && (
                  <div className="h-8 mt-2">
                    <DashboardChart data={card.sparkline} color={card.trend > 0 ? "#10b981" : "#ef4444"} />
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Engagement Overview</CardTitle>
                <CardDescription>Your post engagement for the last 30 days</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <div className="h-[300px] w-full">
                  <DashboardChart
                    data={engagementData}
                    color="#8b5cf6"
                    showAxis={true}
                    showTooltip={true}
                    showLegend={true} />
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Upcoming Posts</CardTitle>
                <CardDescription>Your scheduled posts for the next 7 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingPosts.map((post, index) => (
                    <div key={index} className="flex items-center">
                      <div
                        className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mr-3">
                        <Calendar className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">{post.title}</p>
                        <p className="text-xs text-muted-foreground flex items-center">
                          <Clock className="mr-1 h-3 w-3" />
                          {post.date}
                        </p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <Link href="/dashboard/scheduled-posts">
                      View all scheduled posts
                      <ExternalLink className="ml-2 h-3 w-3" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your recent LinkedIn activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start">
                      <div
                        className="w-8 h-8 rounded-full bg-muted flex items-center justify-center mr-3">
                        <activity.icon className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm">{activity.description}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Post</CardTitle>
                <CardDescription>Your best performing post this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-md border p-3">
                    <p className="text-sm">
                      "Excited to announce our new product launch! After months of hard work, we're finally ready to
                      share it with the world. #ProductLaunch #Innovation"
                    </p>
                    <div className="mt-3 flex items-center text-xs text-muted-foreground">
                      <div className="flex items-center mr-3">
                        <Users className="mr-1 h-3 w-3" />
                        <span>1.2k impressions</span>
                      </div>
                      <div className="flex items-center">
                        <TrendingUp className="mr-1 h-3 w-3" />
                        <span>24% engagement</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    View post details
                  </Button>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Frequently used actions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  <Button className="w-full justify-start" onClick={() => setIsAddPostOpen(true)}>
                    <PenSquare className="mr-2 h-4 w-4" />
                    Create new post
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Calendar className="mr-2 h-4 w-4" />
                    Schedule post
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    View analytics
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Analytics Overview</CardTitle>
              <CardDescription>Detailed analytics for your LinkedIn account</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="h-[300px]">
                    <DashboardChart
                      data={analyticsData.impressions}
                      color="#8b5cf6"
                      showAxis={true}
                      showTooltip={true}
                      showLegend={true}
                      title="Impressions" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-sm font-medium">Avg. Engagement Rate</div>
                        <div className="text-2xl font-bold">18.2%</div>
                        <div className="text-xs text-green-500">↑ 4.3%</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-sm font-medium">Total Reactions</div>
                        <div className="text-2xl font-bold">2,845</div>
                        <div className="text-xs text-green-500">↑ 12.8%</div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="h-[300px]">
                    <DashboardChart
                      data={analyticsData.followers}
                      color="#10b981"
                      showAxis={true}
                      showTooltip={true}
                      showLegend={true}
                      title="Followers Growth" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-sm font-medium">Profile Views</div>
                        <div className="text-2xl font-bold">1,429</div>
                        <div className="text-xs text-green-500">↑ 24%</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-sm font-medium">Click-through Rate</div>
                        <div className="text-2xl font-bold">5.7%</div>
                        <div className="text-xs text-green-500">↑ 1.2%</div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="calendar" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Content Calendar</CardTitle>
              <CardDescription>View and manage your scheduled content</CardDescription>
            </CardHeader>
            <CardContent>
              <CalendarView />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>Stay updated with your account activity</CardDescription>
            </CardHeader>
            <CardContent>
              <NotificationsList />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      {/* Add Post Form Dialog */}
      <AddPostForm
        open={isAddPostOpen}
        onOpenChange={setIsAddPostOpen}
        onSubmit={handleAddPost} />
    </div>)
  );
}

const dashboardCards = [
  {
    title: "Total Posts",
    value: "24",
    trend: 12,
    description: "+12% from last month",
    icon: PenSquare,
    sparkline: [4, 7, 5, 8, 10, 12, 14, 16, 18, 14, 20, 24],
  },
  {
    title: "Scheduled Posts",
    value: "8",
    trend: 5,
    description: "Next post in 2 hours",
    icon: Calendar,
    sparkline: [2, 3, 5, 4, 6, 5, 7, 6, 8, 7, 8, 8],
  },
  {
    title: "Engagement Rate",
    value: "18.2%",
    trend: 4.3,
    description: "+4.3% from last month",
    icon: TrendingUp,
    sparkline: [10, 12, 11, 13, 15, 14, 16, 15, 17, 16, 18, 18.2],
  },
  {
    title: "Profile Views",
    value: "1,429",
    trend: 24,
    description: "+24% from last month",
    icon: Users,
    sparkline: [800, 850, 900, 950, 1000, 1050, 1100, 1150, 1200, 1250, 1350, 1429],
  },
]

const upcomingPosts = [
  {
    title: "Weekly Industry Insights",
    date: "Today, 2:00 PM",
  },
  {
    title: "Product Feature Highlight",
    date: "Tomorrow, 10:00 AM",
  },
  {
    title: "Team Spotlight: Engineering",
    date: "Wed, 9:00 AM",
  },
  {
    title: "Customer Success Story",
    date: "Thu, 11:00 AM",
  },
  {
    title: "Weekend Reading List",
    date: "Fri, 4:00 PM",
  },
]

const recentActivity = [
  {
    icon: PenSquare,
    description: "You published a new post: 'The Future of AI in Marketing'",
    time: "2 hours ago",
  },
  {
    icon: Users,
    description: "Your post received 45 new likes and 12 comments",
    time: "Yesterday",
  },
  {
    icon: Calendar,
    description: "You scheduled 3 new posts for next week",
    time: "2 days ago",
  },
  {
    icon: TrendingUp,
    description: "Your profile views increased by 28% this week",
    time: "3 days ago",
  },
  {
    icon: Users,
    description: "You gained 15 new followers",
    time: "4 days ago",
  },
]

const engagementData = [
  { name: "Week 1", Likes: 120, Comments: 45, Shares: 22 },
  { name: "Week 2", Likes: 150, Comments: 55, Shares: 28 },
  { name: "Week 3", Likes: 180, Comments: 70, Shares: 35 },
  { name: "Week 4", Likes: 220, Comments: 90, Shares: 42 },
]

const analyticsData = {
  impressions: [
    { name: "Jan", value: 1200 },
    { name: "Feb", value: 1400 },
    { name: "Mar", value: 1800 },
    { name: "Apr", value: 2200 },
    { name: "May", value: 2600 },
    { name: "Jun", value: 3000 },
  ],
  followers: [
    { name: "Jan", value: 500 },
    { name: "Feb", value: 550 },
    { name: "Mar", value: 620 },
    { name: "Apr", value: 700 },
    { name: "May", value: 850 },
    { name: "Jun", value: 1000 },
  ],
}

