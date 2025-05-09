'use client';
import { useEffect, useState, useMemo, Suspense, lazy } from 'react';
import { Calendar, Clock, Edit, MoreHorizontal, Trash2, Filter, Search, CheckCircle, ArrowUpDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import axios from 'axios';
import { linkedinSchedulePost } from '@/services/SchedulePosts.service';
import { CalendarView } from '@/components/calendar-view';
import { AddPostForm } from '@/components/add-post-form';
import { debounce } from 'lodash';

// Skeleton Loader for Posts
const SkeletonLoader = () => (
  <div className="space-y-3">
    {[...Array(3)].map((_, index) => (
      <motion.div
        key={index}
        className="p-3 rounded-2xl bg-white/10 animate-pulse"
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 bg-gray-200/50 rounded"></div>
            <div className="w-8 h-8 rounded-full bg-gray-200/50"></div>
            <div className="space-y-1">
              <div className="h-3 bg-gray-200/50 rounded w-24"></div>
              <div className="h-2 bg-gray-200/50 rounded w-32"></div>
            </div>
          </div>
          <div className="h-3 bg-gray-200/50 rounded w-16"></div>
        </div>
        <div className="h-32 bg-gray-200/50 rounded-md mb-2"></div>
        <div className="flex gap-2">
          <div className="h-3 bg-gray-200/50 rounded w-1/3"></div>
          <div className="h-3 bg-gray-200/50 rounded w-1/3"></div>
        </div>
      </motion.div>
    ))}
  </div>
);

export default function ScheduledPostsPage({ account }) {
  const [posts, setPosts] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [bulkActionDialogOpen, setBulkActionDialogOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('list'); // Options: "list", "row", "calendar"
  const [selectedPosts, setSelectedPosts] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('asc');
  const [isAddPostOpen, setIsAddPostOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Debounced search handler
  const debouncedSetSearchQuery = useMemo(
    () => debounce((value) => setSearchQuery(value), 300),
    []
  );

  // Fetch posts based on account
  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        let fetchedPosts = [];
        switch (account?.toLowerCase()) {
          case 'linkedin':
            fetchedPosts = await linkedinSchedulePost();
            break;
          default:
            console.warn('Unsupported account type:', account);
            fetchedPosts = [];
            break;
        }
        setPosts(
          fetchedPosts?.map((post) => ({
            id: post?.id,
            content: post?.content,
            date: post?.scheduledAt
              ? new Date(post.scheduledAt).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })
              : 'N/A',
            time: post?.scheduledAt
              ? new Date(post.scheduledAt).toLocaleTimeString('en-US', {
                  hour: 'numeric',
                  minute: '2-digit',
                })
              : 'N/A',
            status: post?.status,
            image: post?.mediaUrl || null,
            hashtags: post?.content?.match(/#[^\s#]+/g) || [],
            description: post?.content?.slice(0, 100) + (post?.content?.length > 100 ? '...' : ''),
            platform: 'LinkedIn',
          })) || []
        );
      } catch (err) {
        setError('Failed to fetch posts. Please try again.');
        console.error('Error fetching posts:', err);
      } finally {
        setIsLoading(false);
      }
    };

    if (account) {
      fetchPosts();
    }
  }, [account]);

  // Handle delete post
  const handleDeletePost = () => {
    if (postToDelete !== null) {
      setPosts(posts?.filter((_, index) => index !== postToDelete) || []);
      setDeleteDialogOpen(false);
      setPostToDelete(null);
    }
  };

  const confirmDelete = (index) => {
    setPostToDelete(index);
    setDeleteDialogOpen(true);
  };

  // Handle bulk delete
  const handleBulkDelete = () => {
    setPosts(posts?.filter((_, index) => !selectedPosts.includes(index)) || []);
    setSelectedPosts([]);
    setBulkActionDialogOpen(false);
  };

  // Toggle post selection
  const togglePostSelection = (index) => {
    setSelectedPosts((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  // Select all posts
  const selectAllPosts = () => {
    setSelectedPosts((prev) =>
      prev.length === filteredPosts.length
        ? []
        : filteredPosts.map((_, index) => index)
    );
  };

  // Handle adding new post
  const handleAddPost = (values) => {
    const newPost = {
      id: Date.now().toString(),
      content: values?.content,
      date: values?.scheduledDate
        ? new Date(values.scheduledDate).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })
        : 'Today',
      time: values?.scheduledTime || '12:00 PM',
      status: values?.scheduledDate ? 'scheduled' : 'draft',
      image: values?.image || null,
      hashtags: values?.hashtags || [],
      description: values?.content?.slice(0, 100) + (values?.content?.length > 100 ? '...' : ''),
      platform: 'LinkedIn',
    };
    setPosts((prev) => [newPost, ...(prev || [])]);
    setIsAddPostOpen(false);
  };

  // Memoized filtered and sorted posts
  const filteredPosts = useMemo(() => {
    return (posts || [])
      .filter((post) => {
        if (statusFilter !== 'all' && post?.status !== statusFilter) return false;
        if (searchQuery) return post?.content?.toLowerCase()?.includes(searchQuery.toLowerCase());
        return true;
      })
      .sort((a, b) => {
        const dateA = new Date(`${a?.date} ${a?.time}`)?.getTime() || 0;
        const dateB = new Date(`${b?.date} ${b?.time}`)?.getTime() || 0;
        return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
      });
  }, [posts, statusFilter, searchQuery, sortOrder]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: 'easeOut' },
    },
  };

  return (
    <motion.div
      className="min-h-screen bg-gray-100"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        <motion.div variants={itemVariants} className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Scheduled Posts</h1>
          <p className="text-sm text-gray-600">Manage your upcoming {account} posts</p>
        </motion.div>
        {error && (
          <motion.div variants={itemVariants}>
            <Card className="bg-red-100 border-red-300 rounded-2xl">
              <CardContent className="p-4 text-red-700">{error}</CardContent>
            </Card>
          </motion.div>
        )}
        <motion.div
          variants={itemVariants}
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
        >
          <Tabs defaultValue="upcoming" className="w-full md:w-auto">
            <TabsList className="bg-gray-100 rounded-xl p-1">
              {['upcoming', 'published', 'drafts'].map((tab, index) => (
                <motion.div
                  key={tab}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <TabsTrigger
                    value={tab}
                    className="rounded-lg py-2 text-sm font-medium text-gray-600 data-[state=active]:bg-white data-[state=active]:text-indigo-600 data-[state=active]:shadow-sm transition-all duration-200 hover:text-indigo-600"
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </TabsTrigger>
                </motion.div>
              ))}
            </TabsList>
          </Tabs>
          <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
            <motion.div
              variants={itemVariants}
              className="relative w-full md:w-auto"
            >
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search posts..."
                className="pl-8 w-full md:w-[200px] rounded-lg border-gray-200 focus:border-indigo-600 bg-white"
                value={searchQuery}
                onChange={(e) => debouncedSetSearchQuery(e.target.value)}
              />
            </motion.div>
            <motion.div variants={itemVariants} className="flex gap-2 items-center">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-white rounded-lg border-gray-200 hover:bg-gray-50"
                        >
                          <Filter className="mr-2 h-4 w-4" />
                          Filter
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="rounded-lg">
                        {['all', 'scheduled', 'posted', 'draft'].map((filter) => (
                          <DropdownMenuCheckboxItem
                            key={filter}
                            checked={statusFilter === filter}
                            onCheckedChange={() => setStatusFilter(filter)}
                          >
                            {filter === 'all'
                              ? 'All Posts'
                              : filter.charAt(0).toUpperCase() + filter.slice(1)}
                          </DropdownMenuCheckboxItem>
                        ))}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
                          <ArrowUpDown className="mr-2 h-4 w-4" />
                          Sort by {sortOrder === 'asc' ? 'Latest' : 'Earliest'}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Filter and sort posts</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setViewMode(
                          viewMode === 'list'
                            ? 'row'
                            : viewMode === 'row'
                            ? 'calendar'
                            : 'list'
                        )
                      }
                      className="bg-white rounded-lg border-gray-200 hover:bg-gray-50"
                    >
                      {viewMode === 'list' ? (
                        <>
                          <Calendar className="mr-2 h-4 w-4" />
                          Row
                        </>
                      ) : viewMode === 'row' ? (
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
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Switch view mode</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      onClick={() => setIsAddPostOpen(true)}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg"
                    >
                      Create New Post
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Add a new post</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </motion.div>
          </div>
        </motion.div>
        {selectedPosts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="bg-white p-3 rounded-lg shadow-sm flex items-center justify-between"
          >
            <span className="text-sm text-gray-600">{selectedPosts.length} posts selected</span>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedPosts([])}
                className="rounded-lg border-gray-200 hover:bg-gray-50"
              >
                Clear Selection
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => setBulkActionDialogOpen(true)}
                className="rounded-lg"
              >
                Delete Selected
              </Button>
            </div>
          </motion.div>
        )}
        {viewMode === 'list' ? (
          <motion.div
            className="grid gap-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredPosts.length === 0 ? (
              <motion.div variants={itemVariants}>
                <Card className="bg-white rounded-2xl shadow-md border-none hover:shadow-lg transition-all duration-300">
                  <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                    <div className="rounded-full bg-gray-100 p-3 mb-3">
                      <Calendar className="h-5 w-5 text-gray-500" />
                    </div>
                    <h3 className="text-sm font-semibold text-gray-900">No posts found</h3>
                    <p className="text-xs text-gray-600 mt-1">
                      {searchQuery ? 'Try a different search term' : 'Create your first post to get started'}
                    </p>
                    <Button
                      className="mt-3 text-sm bg-indigo-600 hover:bg-indigo-700 rounded-lg"
                      onClick={() => setIsAddPostOpen(true)}
                    >
                      Create New Post
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ) : isLoading ? (
              <SkeletonLoader />
            ) : (
              filteredPosts.map((post, index) => (
                <motion.div
                  key={post?.id || index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.01, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  transition={{ duration: 0.2 }}
                >
                  <Card
                    className={`bg-white rounded-2xl shadow-md border-none ${
                      selectedPosts.includes(index) ? 'border-indigo-500 border-2' : ''
                    } transition-all duration-300`}
                  >
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 accent-indigo-600"
                                checked={selectedPosts.includes(index)}
                                onChange={() => togglePostSelection(index)}
                              />
                              <Avatar className="h-8 w-8">
                                <AvatarImage src="/placeholder-user.jpg" alt="User" />
                                <AvatarFallback className="bg-indigo-100 text-indigo-800">JD</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="text-sm font-semibold text-gray-900">John Doe</p>
                                <p className="text-xs text-gray-600">Product Manager at Acme Inc.</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge
                                variant={post?.status === 'scheduled' ? 'outline' : 'secondary'}
                                className="text-xs text-indigo-600 border-indigo-600"
                              >
                                {post?.status?.charAt(0).toUpperCase() + post?.status?.slice(1)}
                              </Badge>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 hover:bg-gray-100 rounded-lg"
                                  >
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">More options</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="rounded-lg">
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
                            <p className="text-sm text-gray-800 whitespace-pre-wrap">{post?.content}</p>
                            {post?.hashtags?.length > 0 && (
                              <p className="text-xs text-indigo-600 mt-1">{post.hashtags.join(' ')}</p>
                            )}
                          </div>
                          {post?.image && (
                            <div className="rounded-lg overflow-hidden">
                              <img
                                src={post.image}
                                alt="Post"
                                className="w-full h-auto max-h-[150px] object-cover"
                                loading="lazy"
                              />
                            </div>
                          )}
                        </div>
                        <div className="md:w-56 space-y-3">
                          <Card className="bg-gray-50 rounded-lg border-gray-200">
                            <CardHeader className="p-3">
                              <CardTitle className="text-sm font-semibold text-gray-900">Schedule Details</CardTitle>
                            </CardHeader>
                            <CardContent className="p-3 pt-0">
                              <div className="space-y-1">
                                <div className="flex items-center text-sm text-gray-600">
                                  <Calendar className="mr-2 h-4 w-4 text-indigo-600" />
                                  <span>{post?.date}</span>
                                </div>
                                <div className="flex items-center text-sm text-gray-600">
                                  <Clock className="mr-2 h-4 w-4 text-indigo-600" />
                                  <span>{post?.time}</span>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1 rounded-lg border-gray-200 hover:bg-gray-50 text-sm"
                            >
                              Edit
                            </Button>
                            <Button
                              size="sm"
                              className="flex-1 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-sm"
                            >
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
          </motion.div>
        ) : viewMode === 'row' ? (
          <motion.div
            className="flex space-x-3 overflow-x-auto pb-3 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredPosts.length === 0 ? (
              <motion.div variants={itemVariants}>
                <Card className="bg-white rounded-2xl shadow-md border-none flex-shrink-0 w-full hover:shadow-lg transition-all duration-300">
                  <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                    <div className="rounded-full bg-gray-100 p-3 mb-3">
                      <Calendar className="h-5 w-5 text-gray-500" />
                    </div>
                    <h3 className="text-sm font-semibold text-gray-900">No posts found</h3>
                    <p className="text-xs text-gray-600 mt-1">
                      {searchQuery ? 'Try a different search term' : 'Create your first post to get started'}
                    </p>
                    <Button
                      className="mt-3 text-sm bg-indigo-600 hover:bg-indigo-700 rounded-lg"
                      onClick={() => setIsAddPostOpen(true)}
                    >
                      Create New Post
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ) : isLoading ? (
              <SkeletonLoader />
            ) : (
              filteredPosts.map((post, index) => (
                <motion.div
                  key={post?.id || index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  transition={{ duration: 0.2 }}
                  className="flex-shrink-0 w-72 p-3 rounded-2xl bg-white shadow-md snap-start"
                >
                  <div className="space-y-2">
                    {post?.image && (
                      <img
                        src={post.image}
                        alt="Post"
                        className="w-full h-32 rounded-lg object-cover"
                        loading="lazy"
                      />
                    )}
                    <p className="text-sm font-medium text-gray-800">
                      {post?.content?.slice(0, 80) + (post?.content?.length > 80 ? '...' : '')}
                    </p>
                    <p className="text-xs text-gray-600 flex items-center">
                      <Clock className="mr-1 h-3 w-3 text-indigo-600" />
                      {post?.date} {post?.time}
                    </p>
                    <Badge
                      variant={post?.status === 'scheduled' ? 'outline' : 'secondary'}
                      className="text-xs text-indigo-600 border-indigo-600"
                    >
                      {post?.status?.charAt(0).toUpperCase() + post?.status?.slice(1)}
                    </Badge>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 rounded-lg border-gray-200 hover:bg-gray-50 text-sm"
                      >
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => confirmDelete(index)}
                        className="flex-1 rounded-lg text-sm"
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>
        ) : (
          <motion.div variants={itemVariants}>
            <Card className="bg-white rounded-2xl shadow-md border-none hover:shadow-lg transition-all duration-300">
              <CardHeader className="p-6">
                <CardTitle className="text-xl font-semibold text-gray-900">Content Calendar</CardTitle>
                <CardDescription className="text-sm text-gray-600">
                  View your scheduled posts in calendar format
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <Suspense fallback={<SkeletonLoader />}>
                  <CalendarView posts={filteredPosts} />
                </Suspense>
              </CardContent>
            </Card>
          </motion.div>
        )}
        <AnimatePresence>
          {deleteDialogOpen && (
            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
              <DialogContent className="rounded-lg">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <DialogHeader>
                    <DialogTitle>Delete Post</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to delete this post? This action cannot be undone.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setDeleteDialogOpen(false)}
                      className="rounded-lg border-gray-200 hover:bg-gray-50"
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={handleDeletePost}
                      className="rounded-lg"
                    >
                      Delete
                    </Button>
                  </DialogFooter>
                </motion.div>
              </DialogContent>
            </Dialog>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {bulkActionDialogOpen && (
            <Dialog open={bulkActionDialogOpen} onOpenChange={setBulkActionDialogOpen}>
              <DialogContent className="rounded-lg">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <DialogHeader>
                    <DialogTitle>Delete Multiple Posts</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to delete {selectedPosts.length} posts? This action cannot be undone.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setBulkActionDialogOpen(false)}
                      className="rounded-lg border-gray-200 hover:bg-gray-50"
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={handleBulkDelete}
                      className="rounded-lg"
                    >
                      Delete {selectedPosts.length} Posts
                    </Button>
                  </DialogFooter>
                </motion.div>
              </DialogContent>
            </Dialog>
          )}
        </AnimatePresence>
        <Suspense fallback={<SkeletonLoader />}>
          <AddPostForm
            open={isAddPostOpen}
            onOpenChange={setIsAddPostOpen}
            onSubmit={handleAddPost}
          />
        </Suspense>
      </div>
    </motion.div>
  );
}