import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Clock, ExternalLink, PenSquare, Users, TrendingUp, BarChart3 } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Skeleton Loader Component for LinkedIn Posts (Flex Row, Compact)
const SkeletonLoader = () => (
  <div className="flex space-x-3 overflow-x-auto pb-3 snap-x snap-mandatory">
    {[...Array(3)].map((_, index) => (
      <div
        key={index}
        className="flex-shrink-0 w-72 p-3 rounded-lg bg-white/10 animate-pulse snap-start"
      >
        <div className="w-full h-32 bg-gray-200/50 rounded-md mb-3"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200/50 rounded w-3/4"></div>
          <div className="h-3 bg-gray-200/50 rounded w-1/2"></div>
          <div className="flex space-x-3">
            <div className="h-3 bg-gray-200/50 rounded w-1/3"></div>
            <div className="h-3 bg-gray-200/50 rounded w-1/3"></div>
          </div>
        </div>
      </div>
    ))}
  </div>
)

// Post Item Component (Compact)
const PostItem = ({ post, isUpcoming = false }) => {
  const truncateText = (text, maxLength = 80) =>
    text.length > maxLength ? `${text.slice(0, maxLength)}...` : text

  return (
    <motion.div
      className={`flex-shrink-0 ${isUpcoming ? "flex items-center p-3 rounded-lg" : "w-72 p-3 rounded-lg"} bg-white/10 hover:bg-white/20 transition-all duration-200 snap-start`}
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.98 }}
    >
      {isUpcoming ? (
        <>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-indigo-400 flex items-center justify-center mr-3">
            <Calendar className="h-5 w-5 text-white" />
          </div>
          <div className="flex-1 space-y-0.5">
            <p className="text-xs font-medium text-gray-900">{post.title}</p>
            <p className="text-xs text-gray-500 flex items-center">
              <Clock className="mr-1 h-3 w-3" />
              {post.date}
            </p>
          </div>
        </>
      ) : (
        <div className="space-y-2">
          {post.imageUrl && (
            <img
              src={post.imageUrl}
              alt="LinkedIn post image"
              className="w-full h-32 rounded-md object-cover"
              style={{ aspectRatio: "1.91/1" }}
            />
          )}
          <p className="text-xs font-medium text-gray-900">{truncateText(post.text)}</p>
          <p className="text-xs text-gray-500 flex items-center">
            <Clock className="mr-1 h-3 w-3" />
            {new Date(post.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
          <div className="flex items-center text-xs text-gray-600 space-x-3">
            <div className="flex items-center">
              <Users className="mr-1 h-3 w-3 text-purple-500" />
              <span>{post.impressions}</span>
            </div>
            <div className="flex items-center">
              <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
              <span>{post.engagement}%</span>
            </div>
          </div>
        </div>
      )}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="hover:bg-purple-100/50 transition-colors mt-2"
              asChild={!isUpcoming}
            >
              {isUpcoming ? (
                <ExternalLink className="h-4 w-4 text-purple-500" />
              ) : (
                <Link href={post.postUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 text-purple-500" />
                </Link>
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{isUpcoming ? "Edit post" : "View on LinkedIn"}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </motion.div>
  )
}

// Static Data
const upcomingPosts = [
  { title: "Weekly Industry Insights", date: "Today, 2:00 PM" },
  { title: "Product Feature Highlight", date: "Tomorrow, 10:00 AM" },
  { title: "Team Spotlight: Engineering", date: "Wed, 9:00 AM" },
  { title: "Customer Success Story", date: "Thu, 11:00 AM" },
  { title: "Weekend Reading List", date: "Fri, 4:00 PM" },
]

const recentActivity = [
  { icon: PenSquare, description: "You published a new post: 'The Future of AI in Marketing'", time: "2 hours ago" },
  { icon: Users, description: "Your post received 45 new likes and 12 comments", time: "Yesterday" },
  { icon: Calendar, description: "You scheduled 3 new posts for next week", time: "2 days ago" },
  { icon: TrendingUp, description: "Your profile views increased by 28% this week", time: "3 days ago" },
  { icon: Users, description: "You gained 15 new followers", time: "4 days ago" },
]

export default function OverviewTab() {
  const [linkedinPosts, setLinkedinPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch LinkedIn posts
  const fetchLinkedinPosts = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const mockResponse = await new Promise((resolve) =>
        setTimeout(() =>
          resolve({
            json: () =>
              Promise.resolve([
                {
                  id: "1",
                  text: "Just shared our latest AI project! Excited to see where this takes us. #AI #Innovation",
                  createdAt: "2025-04-24T10:00:00Z",
                  postUrl: "https://www.linkedin.com/feed/update/urn:li:share:1",
                  imageUrl: "https://images.unsplash.com/photo-1516321310764-8d9c548607f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=627&q=80",
                  impressions: 1200,
                  engagement: 24,
                },
                {
                  id: "2",
                  text: "Looking forward to the upcoming tech conference! Who's joining? #Tech #Networking",
                  createdAt: "2025-04-23T14:30:00Z",
                  postUrl: "https://www.linkedin.com/feed/update/urn:li:share:2",
                  imageUrl: "https://images.unsplash.com/photo-1540575466980-59b25ae80faf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=627&q=80",
                  impressions: 850,
                  engagement: 18,
                },
                {
                  id: "3",
                  text: "New blog post on LinkedIn strategies. Check it out and share your thoughts! #Marketing",
                  createdAt: "2025-04-22T09:15:00Z",
                  postUrl: "https://www.linkedin.com/feed/update/urn:li:share:3",
                  imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=627&q=80",
                  impressions: 600,
                  engagement: 15,
                },
              ]),
          }), 1000)
        )
      const data = await mockResponse.json()
      setLinkedinPosts(data)
    } catch (err) {
      setError("Failed to fetch LinkedIn posts. Please try again.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchLinkedinPosts()
  }, [])

  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8  min-h-screen">
      {/* Upper Grid: Upcoming Posts and LinkedIn Posts */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:gap-8">
        {/* Upcoming Posts Card */}
        <Card className="bg-white/40 backdrop-blur-xl border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300">
          <CardHeader className="pb-3">
            <CardTitle className="text-xl font-bold text-gray-900">Upcoming Posts</CardTitle>
            <CardDescription className="text-sm text-gray-600">Scheduled posts for the next 7 days</CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="space-y-3">
              <AnimatePresence>
                {upcomingPosts.map((post, index) => (
                  <PostItem key={index} post={post} isUpcoming />
                ))}
              </AnimatePresence>
              <Button
                variant="outline"
                size="sm"
                className="w-full bg-white/30 hover:bg-white/40 border-white/40 text-gray-900 font-medium"
                asChild
              >
                <Link href="/dashboard/scheduled-posts">
                  View all scheduled posts
                  <ExternalLink className="ml-2 h-3 w-3" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* LinkedIn Posts Card (Compact, Flex Row) */}
        <Card className="bg-white/40 backdrop-blur-xl border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300">
          <CardHeader className="pb-3">
            <CardTitle className="text-xl font-bold text-gray-900">Your Facebook Posts</CardTitle>
            <CardDescription className="text-sm text-gray-600">Recent posts on Facebook</CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="space-y-3">
              {isLoading ? (
                <SkeletonLoader />
              ) : error ? (
                <div className="text-center space-y-3">
                  <p className="text-xs text-red-500 font-medium">{error}</p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={fetchLinkedinPosts}
                    className="bg-white/30 hover:bg-white/40 border-white/40 text-gray-900"
                  >
                    Retry
                  </Button>
                </div>
              ) : linkedinPosts.length === 0 ? (
                <div className="text-center space-y-3">
                  <p className="text-xs text-gray-600 font-medium">No posts found. Start sharing on LinkedIn!</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-white/30 hover:bg-white/40 border-white/40 text-gray-900"
                    asChild
                  >
                    <Link href="/dashboard/create-post">Create a Post</Link>
                  </Button>
                </div>
              ) : (
                <div
                  className="flex space-x-3 overflow-x-auto pb-3 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 md:flex-row flex-col md:space-y-0 space-y-3"
                  role="region"
                  aria-label="LinkedIn posts carousel"
                >
                  <AnimatePresence>
                    {linkedinPosts.map((post) => (
                      <motion.div
                        key={post.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                      >
                        <PostItem post={post} />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
              <Button
                variant="outline"
                size="sm"
                className="w-full bg-white/30 hover:bg-white/40 border-white/40 text-gray-900 font-medium"
                asChild
              >
                <Link href="/dashboard/linkedin-posts">
                  View all LinkedIn posts
                  <ExternalLink className="ml-2 h-3 w-3" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lower Grid: Recent Activity, Top Performing Post, Quick Actions (Compact) */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:gap-8">
        {/* Recent Activity Card */}
        <Card className="bg-white/40 backdrop-blur-xl border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300">
          <CardHeader className="pb-3">
            <CardTitle className="text-xl font-bold text-gray-900">Recent Activity</CardTitle>
            <CardDescription className="text-sm text-gray-600">Your recent LinkedIn activity</CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="space-y-3">
              <AnimatePresence>
                {recentActivity.map((activity, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-200"
                    whileHover={{ scale: 1.02 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.1 }}
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-indigo-400 flex items-center justify-center mr-3">
                      <activity.icon className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1 space-y-0.5">
                      <p className="text-xs text-gray-900 font-medium">{activity.description}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </CardContent>
        </Card>

        {/* Top Performing Post Card */}
        <Card className="bg-white/40 backdrop-blur-xl border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300">
          <CardHeader className="pb-3">
            <CardTitle className="text-xl font-bold text-gray-900">Top Performing Post</CardTitle>
            <CardDescription className="text-sm text-gray-600">Best performing post this month</CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="space-y-3">
              <motion.div
                className="rounded-md border border-white/30 p-3 bg-white/10"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <img
                  src="https://images.unsplash.com/photo-1516321310764-8d9c548607f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=627&q=80"
                  alt="Top performing post image"
                  className="w-full h-32 rounded-md object-cover mb-3"
                  style={{ aspectRatio: "1.91/1" }}
                />
                <p className="text-xs text-gray-900 font-medium">
                  Excited to announce our new product launch! After months of hard work, we’re ready to share it with the world. #ProductLaunch
                </p>
                <div className="mt-3 flex items-center text-xs text-gray-600 space-x-3">
                  <div className="flex items-center">
                    <Users className="mr-1 h-3 w-3 text-purple-500" />
                    <span>1.2k</span>
                  </div>
                  <div className="flex items-center">
                    <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                    <span>24%</span>
                  </div>
                </div>
              </motion.div>
              <Button
                variant="outline"
                size="sm"
                className="w-full bg-white/30 hover:bg-white/40 border-white/40 text-gray-900 font-medium"
              >
                View post details
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions Card */}
        <Card className="bg-white/40 backdrop-blur-xl border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300">
          <CardHeader className="pb-3">
            <CardTitle className="text-xl font-bold text-gray-900">Quick Actions</CardTitle>
            <CardDescription className="text-sm text-gray-600">Frequently used actions</CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="grid gap-3">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      className="w-full justify-start bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium transition-all duration-300 text-sm"
                      aria-label="Create new post"
                    >
                      <PenSquare className="mr-2 h-4 w-4" />
                      Create new post
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Start writing a new LinkedIn post</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start bg-white/30 hover:bg-white/40 border-white/40 text-gray-900 font-medium text-sm"
                      aria-label="Schedule post"
                    >
                      <Calendar className="mr-2 h-4 w-4 text-purple-500" />
                      Schedule post
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Plan a post for later</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start bg-white/30 hover:bg-white/40 border-white/40 text-gray-900 font-medium text-sm"
                      aria-label="View analytics"
                    >
                      <BarChart3 className="mr-2 h-4 w-4 text-green-500" />
                      View analytics
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Check your LinkedIn performance</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}