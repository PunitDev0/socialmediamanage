"use client"

import { useState } from "react"
import { Calendar, Clock, Edit, MoreHorizontal, Trash2, Filter, Search, CheckCircle, ArrowUpDown } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { CalendarView } from "@/components/calendar-view"
import { AddPostForm } from "@/components/add-post-form"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function ScheduledPostsPage() {
  const [posts, setPosts] = useState(scheduledPosts)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [bulkActionDialogOpen, setBulkActionDialogOpen] = useState(false)
  const [postToDelete, setPostToDelete] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState("list")
  const [selectedPosts, setSelectedPosts] = useState([])
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortOrder, setSortOrder] = useState("asc")
  const [isAddPostOpen, setIsAddPostOpen] = useState(false)

  const handleDeletePost = () => {
    if (postToDelete !== null) {
      setPosts(posts.filter((_, index) => index !== postToDelete))
      setDeleteDialogOpen(false)
      setPostToDelete(null)
    }
  }

  const confirmDelete = (index) => {
    setPostToDelete(index)
    setDeleteDialogOpen(true)
  }

  const handleBulkDelete = () => {
    setPosts(posts.filter((_, index) => !selectedPosts.includes(index)))
    setSelectedPosts([])
    setBulkActionDialogOpen(false)
  }

  const togglePostSelection = (index) => {
    if (selectedPosts.includes(index)) {
      setSelectedPosts(selectedPosts.filter((i) => i !== index))
    } else {
      setSelectedPosts([...selectedPosts, index])
    }
  }

  const selectAllPosts = () => {
    if (selectedPosts.length === filteredPosts.length) {
      setSelectedPosts([])
    } else {
      setSelectedPosts(filteredPosts.map((_, index) => index))
    }
  }

  const handleAddPost = (values) => {
    console.log("New post values:", values)
    // Here you would typically send this data to your API

    // For demo purposes, add a mock post to the list
    const newPost = {
      content: values.content,
      date: values.scheduledDate
        ? new Date(values.scheduledDate).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
        : "Today",
      time: values.scheduledTime || "12:00 PM",
      status: values.scheduledDate ? "scheduled" : "draft",
      image: values.image || null,
      hashtags: values.hashtags || [],
    }

    setPosts([newPost, ...posts])
  }

  const filteredPosts = posts
    .filter((post) => {
      // Filter by status
      if (statusFilter !== "all" && post.status !== statusFilter) {
        return false
      }

      // Filter by search query
      if (searchQuery) {
        return post.content.toLowerCase().includes(searchQuery.toLowerCase());
      }

      return true
    })
    .sort((a, b) => {
      // Sort by date
      const dateA = new Date(`${a.date} ${a.time}`).getTime()
      const dateB = new Date(`${b.date} ${b.time}`).getTime()
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA
    })

  return (
    (<div className="flex flex-col gap-6 ">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Scheduled Posts</h1>
        <p className="text-muted-foreground">Manage your upcoming LinkedIn posts</p>
      </div>
      <div
        className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <Tabs defaultValue="upcoming" className="w-full md:w-auto">
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="published">Published</TabsTrigger>
            <TabsTrigger value="drafts">Drafts</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search posts..."
              className="pl-8 w-full md:w-[200px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} />
          </div>
          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuCheckboxItem
                  checked={statusFilter === "all"}
                  onCheckedChange={() => setStatusFilter("all")}>
                  All Posts
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={statusFilter === "scheduled"}
                  onCheckedChange={() => setStatusFilter("scheduled")}>
                  Scheduled
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={statusFilter === "draft"}
                  onCheckedChange={() => setStatusFilter("draft")}>
                  Drafts
                </DropdownMenuCheckboxItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>
                  <ArrowUpDown className="mr-2 h-4 w-4" />
                  Sort by {sortOrder === "asc" ? "Latest" : "Earliest"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setViewMode(viewMode === "list" ? "calendar" : "list")}>
              {viewMode === "list" ? (
                <>
                  <Calendar className="mr-2 h-4 w-4" />
                  Calendar
                </>
              ) : (
                <>
                  <Clock className="mr-2 h-4 w-4" />
                  List
                </>
              )}
            </Button>
            <Button onClick={() => setIsAddPostOpen(true)}>Create New Post</Button>
          </div>
        </div>
      </div>
      {selectedPosts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="bg-muted p-2 rounded-md flex items-center justify-between">
          <span className="text-sm">{selectedPosts.length} posts selected</span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setSelectedPosts([])}>
              Clear Selection
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => setBulkActionDialogOpen(true)}>
              Delete Selected
            </Button>
          </div>
        </motion.div>
      )}
      {viewMode === "list" ? (
        <div className="grid gap-6">
          {filteredPosts.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                <div className="rounded-full bg-muted p-3 mb-4">
                  <Calendar className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium">No posts found</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {searchQuery ? "Try a different search term" : "Create your first post to get started"}
                </p>
                <Button className="mt-4" onClick={() => setIsAddPostOpen(true)}>
                  Create New Post
                </Button>
              </CardContent>
            </Card>
          ) : (
            filteredPosts.map((post, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}>
                <Card className={selectedPosts.includes(index) ? "border-primary" : ""}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex-1 space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300"
                              checked={selectedPosts.includes(index)}
                              onChange={() => togglePostSelection(index)} />
                            <Avatar className="h-10 w-10">
                              <AvatarImage src="/placeholder-user.jpg" alt="User" />
                              <AvatarFallback>JD</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium">John Doe</p>
                              <p className="text-xs text-muted-foreground">Product Manager at Acme Inc.</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant={post.status === "scheduled" ? "outline" : "secondary"}>
                              {post.status === "scheduled" ? "Scheduled" : "Draft"}
                            </Badge>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">More options</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit post
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Clock className="mr-2 h-4 w-4" />
                                  Reschedule
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <CheckCircle className="mr-2 h-4 w-4" />
                                  Publish now
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => confirmDelete(index)}>
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete post
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm whitespace-pre-wrap">{post.content}</p>
                          {post.hashtags && post.hashtags.length > 0 && (
                            <p className="text-sm text-blue-500 mt-1">
                              {post.hashtags.map((tag) => `#${tag}`).join(" ")}
                            </p>
                          )}
                        </div>
                        {post.image && (
                          <div className="rounded-md overflow-hidden">
                            <img
                              src={post.image || "/placeholder.svg"}
                              alt="Post"
                              className="w-full h-auto max-h-[200px] object-cover" />
                          </div>
                        )}
                      </div>
                      <div className="md:w-64 space-y-4">
                        <Card>
                          <CardHeader className="p-4">
                            <CardTitle className="text-sm">Schedule Details</CardTitle>
                          </CardHeader>
                          <CardContent className="p-4 pt-0">
                            <div className="space-y-2">
                              <div className="flex items-center text-sm">
                                <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                                <span>{post.date}</span>
                              </div>
                              <div className="flex items-center text-sm">
                                <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                                <span>{post.time}</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="flex-1">
                            Edit
                          </Button>
                          <Button size="sm" className="flex-1">
                            Publish Now
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          )}
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Content Calendar</CardTitle>
            <CardDescription>View your scheduled posts in calendar format</CardDescription>
          </CardHeader>
          <CardContent>
            <CalendarView posts={filteredPosts} />
          </CardContent>
        </Card>
      )}
      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Post</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this post? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeletePost}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* Bulk Action Dialog */}
      <Dialog open={bulkActionDialogOpen} onOpenChange={setBulkActionDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Multiple Posts</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {selectedPosts.length} posts? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setBulkActionDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleBulkDelete}>
              Delete {selectedPosts.length} Posts
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* Add Post Form Dialog */}
      <AddPostForm
        open={isAddPostOpen}
        onOpenChange={setIsAddPostOpen}
        onSubmit={handleAddPost} />
    </div>)
  );
}

const scheduledPosts = [
  {
    content:
      "Excited to announce our new product launch! After months of hard work, we're finally ready to share it with the world. #ProductLaunch #Innovation",
    date: "May 15, 2025",
    time: "10:00 AM",
    status: "scheduled",
    image: "/placeholder.svg?height=400&width=600",
    hashtags: ["ProductLaunch", "Innovation"],
  },
  {
    content:
      "Join us for a webinar on the future of AI in marketing. We'll be discussing the latest trends and how they can benefit your business. Register now at the link in bio!",
    date: "May 18, 2025",
    time: "2:00 PM",
    status: "scheduled",
    image: null,
    hashtags: ["AI", "Marketing", "Webinar"],
  },
  {
    content:
      "We're hiring! Looking for talented individuals to join our growing team. Check out our careers page for more information.",
    date: "May 20, 2025",
    time: "9:00 AM",
    status: "scheduled",
    image: "/placeholder.svg?height=400&width=600",
    hashtags: ["Hiring", "Careers", "JobOpportunity"],
  },
  {
    content:
      "Throwback to last week's team building event. It was great to connect with everyone outside of work and have some fun!",
    date: "May 22, 2025",
    time: "3:00 PM",
    status: "draft",
    image: "/placeholder.svg?height=400&width=600",
    hashtags: ["TeamBuilding", "CompanyCulture"],
  },
  {
    content:
      "Check out our latest case study on how we helped a Fortune 500 company increase their social media engagement by 200% in just three months!",
    date: "May 25, 2025",
    time: "11:00 AM",
    status: "scheduled",
    image: "/placeholder.svg?height=400&width=600",
    hashtags: ["CaseStudy", "SocialMedia", "Success"],
  },
  {
    content:
      "Proud to announce that our CEO will be speaking at the upcoming Digital Marketing Summit. Don't miss this opportunity to gain insights from industry leaders!",
    date: "May 28, 2025",
    time: "1:00 PM",
    status: "draft",
    image: null,
    hashtags: ["DigitalMarketing", "Summit", "Leadership"],
  },
]

