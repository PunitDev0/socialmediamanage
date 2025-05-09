"use client"
import { Button } from "@/components/ui/button"
import { PlusCircle, Link2, Info } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"


export default function Dashboard({ selectedChannel, onConnectChannel }) {
  // Sample data for the dashboard (replace with real data from an API or state)
  const upcomingPosts = [
    { title: "Weekly Industry Insights", time: "Today, 2:30 PM" },
    { title: "Product Feature Spotlight", time: "Tomorrow, 10:00 AM" },
    { title: "Team Spotlight: ENGINEERING", time: "Wed, 9:00 AM" },
    { title: "Customer Success Story", time: "Thu, 11:00 AM" },
    { title: "Weekend Reading List", time: "Fri, 4:00 PM" },
  ]

  const recentPosts = [
    {
      content: "Just shared our latest project! Excited to see where this takes us at AI Innov...",
      time: "Apr 24, 03:30 PM",
      views: 12000,
      engagement: "24%",
    },
    {
      content: "Looking forward to the upcoming tech conference! Who joining? #Tech #Net...",
      time: "Apr 23, 08:00 PM",
      views: 850,
      engagement: "18%",
    },
  ]

  // If no channel is selected, show the enhanced empty state
  if (!selectedChannel) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] w-full px-4">
        <div className="max-w-md w-full flex flex-col items-center text-center space-y-8">
          <div className="rounded-full bg-muted p-8 w-32 h-32 flex items-center justify-center animate-pulse">
            <Link2 className="h-16 w-16 text-muted-foreground" />
          </div>

          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tight">No Channel Selected</h2>
            <p className="text-muted-foreground text-lg">
              Connect a social media channel to unlock powerful automation tools and start managing your posts effectively.
            </p>
            <Alert variant="default" className="bg-muted">
              <Info className="h-4 w-4" />
              <AlertDescription className="text-sm">
                Supported channels include LinkedIn, Facebook, Instagram, and more. Check the sidebar to connect!
              </AlertDescription>
            </Alert>
          </div>

          <Button size="lg" onClick={onConnectChannel} className="gap-2 px-8 bg-green-600 hover:bg-green-700">
            <PlusCircle className="h-5 w-5" />
            Connect a Channel Now
          </Button>
        </div>
      </div>
    )
  }

  // If a channel is selected, show the dashboard content
  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's an overview of your {selectedChannel} automation.
          </p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700 gap-2">
          <PlusCircle className="h-4 w-4" />
          Create New Post
        </Button>
      </div>

      {/* Tabs for Overview, Calendar, Notifications */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="calendar">
            <Calendar className="h-4 w-4 mr-2" />
            Calendar
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Main Dashboard Content */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Upcoming Posts */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Upcoming Posts</CardTitle>
            <p className="text-sm text-muted-foreground">Scheduled posts for the next 7 days</p>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {upcomingPosts.map((post, index) => (
                <li key={index} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{post.title}</p>
                    <p className="text-sm text-muted-foreground">{post.time}</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </li>
              ))}
            </ul>
            <Button variant="link" className="mt-4">
              View all scheduled posts
            </Button>
          </CardContent>
        </Card>

        {/* Recent Posts */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Your {selectedChannel} Posts</CardTitle>
            <p className="text-sm text-muted-foreground">Recent posts on {selectedChannel}</p>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {recentPosts.map((post, index) => (
                <li key={index} className="border-b pb-4">
                  <p className="text-sm">{post.content}</p>
                  <p className="text-xs text-muted-foreground mt-1">{post.time}</p>
                  <div className="flex space-x-4 mt-2">
                    <div className="flex items-center text-sm">
                      <Eye className="h-4 w-4 mr-1" />
                      {post.views.toLocaleString()}
                    </div>
                    <div className="text-sm">{post.engagement}</div>
                  </div>
                </li>
              ))}
            </ul>
            <Button variant="link" className="mt-4">
              View all {selectedChannel} posts
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activity, Top Performing Post, Quick Actions */}
        <div className="col-span-1 space-y-6">
          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <p className="text-sm text-muted-foreground">Your recent {selectedChannel} activity</p>
            </CardHeader>
            <CardContent>
              {/* Placeholder for recent activity */}
              <p className="text-sm text-muted-foreground">No recent activity to display.</p>
            </CardContent>
          </Card>

          {/* Top Performing Post */}
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Post</CardTitle>
              <p className="text-sm text-muted-foreground">Best performing post this month</p>
            </CardHeader>
            <CardContent>
              {/* Placeholder for top performing post */}
              <p className="text-sm text-muted-foreground">No data available yet.</p>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <p className="text-sm text-muted-foreground">Frequently used actions</p>
            </CardHeader>
            <CardContent>
              {/* Placeholder for quick actions */}
              <p className="text-sm text-muted-foreground">No quick actions set.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}