"use client";
import { useState } from "react"
import { ArrowUpDown, ExternalLink, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function PostPerformance({
  dateRange = "30days",
  detailed = false
}) {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortField, setSortField] = useState("date")
  const [sortDirection, setSortDirection] = useState("desc")

  // Mock post performance data
  const postPerformanceData = [
    {
      id: 1,
      content:
        "Excited to announce our new product launch! After months of hard work, we're finally ready to share it with the world.",
      date: "May 15, 2025",
      impressions: 1245,
      engagement: 24.5,
      likes: 87,
      comments: 32,
      shares: 18,
      clicks: 65,
      status: "published",
    },
    {
      id: 2,
      content:
        "Join us for a webinar on the future of AI in marketing. We'll be discussing the latest trends and how they can benefit your business.",
      date: "May 10, 2025",
      impressions: 980,
      engagement: 18.2,
      likes: 65,
      comments: 24,
      shares: 12,
      clicks: 45,
      status: "published",
    },
    {
      id: 3,
      content:
        "We're hiring! Looking for talented individuals to join our growing team. Check out our careers page for more information.",
      date: "May 5, 2025",
      impressions: 1560,
      engagement: 32.1,
      likes: 120,
      comments: 45,
      shares: 28,
      clicks: 95,
      status: "published",
    },
    {
      id: 4,
      content:
        "Throwback to last week's team building event. It was great to connect with everyone outside of work and have some fun!",
      date: "April 28, 2025",
      impressions: 875,
      engagement: 15.8,
      likes: 54,
      comments: 18,
      shares: 8,
      clicks: 32,
      status: "published",
    },
    {
      id: 5,
      content:
        "Check out our latest case study on how we helped a Fortune 500 company increase their social media engagement by 200% in just three months!",
      date: "April 20, 2025",
      impressions: 1320,
      engagement: 28.5,
      likes: 95,
      comments: 36,
      shares: 22,
      clicks: 78,
      status: "published",
    },
  ]

  // Filter posts based on search query
  const filteredPosts = postPerformanceData.filter((post) =>
    post.content.toLowerCase().includes(searchQuery.toLowerCase()))

  // Sort posts
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (sortField === "date") {
      const dateA = new Date(a.date).getTime()
      const dateB = new Date(b.date).getTime()
      return sortDirection === "asc" ? dateA - dateB : dateB - dateA
    } else if (sortField === "impressions") {
      return sortDirection === "asc" ? a.impressions - b.impressions : b.impressions - a.impressions
    } else if (sortField === "engagement") {
      return sortDirection === "asc" ? a.engagement - b.engagement : b.engagement - a.engagement
    }
    return 0
  })

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("desc")
    }
  }

  return (
    (<div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search posts..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} />
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[400px]">Post</TableHead>
              <TableHead>
                <Button variant="ghost" size="sm" onClick={() => handleSort("date")}>
                  Date
                  <ArrowUpDown className="ml-2 h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" size="sm" onClick={() => handleSort("impressions")}>
                  Impressions
                  <ArrowUpDown className="ml-2 h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" size="sm" onClick={() => handleSort("engagement")}>
                  Engagement
                  <ArrowUpDown className="ml-2 h-3 w-3" />
                </Button>
              </TableHead>
              {detailed && (
                <>
                  <TableHead>Likes</TableHead>
                  <TableHead>Comments</TableHead>
                  <TableHead>Shares</TableHead>
                  <TableHead>Clicks</TableHead>
                </>
              )}
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedPosts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={detailed ? 9 : 5} className="text-center py-8">
                  No posts found
                </TableCell>
              </TableRow>
            ) : (
              sortedPosts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell className="font-medium">
                    <div className="line-clamp-2">{post.content}</div>
                  </TableCell>
                  <TableCell>{post.date}</TableCell>
                  <TableCell>{post.impressions.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge variant={post.engagement > 20 ? "default" : "outline"}>{post.engagement}%</Badge>
                  </TableCell>
                  {detailed && (
                    <>
                      <TableCell>{post.likes}</TableCell>
                      <TableCell>{post.comments}</TableCell>
                      <TableCell>{post.shares}</TableCell>
                      <TableCell>{post.clicks}</TableCell>
                    </>
                  )}
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      <ExternalLink className="h-4 w-4" />
                      <span className="sr-only">View details</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>)
  );
}

