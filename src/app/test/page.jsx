'use client';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  Avatar,
  AvatarFallback,
} from '@/components/ui/avatar';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaPinterestP,
  FaTiktok,
  FaSpinner,
  FaYoutube,
} from 'react-icons/fa';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const OverviewMetrics = ({ isMounted }) => {
  const platformIcons = {
    f: <FaFacebookF className="text-blue-600" />,
    ig: <FaInstagram className="text-pink-600" />,
    yt: <FaYoutube className="text-red-500" />,
    in: <FaLinkedinIn className="text-blue-700" />,
    p: <FaPinterestP className="text-red-600" />,
    t: <FaTiktok className="text-black" />,
  };

  const metrics = [
    { platform: 'f', value: 1322, change: '-4.5%' },
    { platform: 'ig', value: 4134, change: '-2.1%' },
    { platform: 'yt', value: 501, change: '-3.3%' },
    { platform: 'in', value: 1013, change: '-1.8%' },
    { platform: 'p', value: 322, change: '-5.0%' },
    { platform: 't', value: 981, change: '+2.7%' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
      {metrics.map((metric, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={isMounted ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: index * 0.15, duration: 0.6, ease: 'easeOut' }}
          whileHover={{ scale: 1.03 }}
        >
          <Card className="rounded-2xl shadow-md border-none  min-h-[250px] bg-white hover:shadow-xl transition-all duration-300">
            <CardContent className="flex flex-col  space-x-3">
              <motion.span
                whileHover={{ scale: 1.1 }}
                className="text-5xl text-sta"
              >
                {platformIcons[metric.platform]}
              </motion.span>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{metric.value.toLocaleString()}</h2>
                <p className={`text-sm font-semibold ${metric.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                  {metric.change}
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

const EngagementStats = ({ isMounted }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1500);
  }, []);

  const engagementData = {
    labels: ['May 1', 'May 2', 'May 3', 'May 4', 'May 5', 'May 6', 'May 7'],
    datasets: [
      {
        label: 'Engagement',
        data: [50, 70, 60, 90, 80, 110, 100],
        backgroundColor: (context) => {
          const index = context.dataIndex;
          return index === 5 ? 'rgba(79, 70, 229, 0.8)' : 'rgba(209, 213, 219, 0.8)';
        },
        borderRadius: 6,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: 'Engagement Stats', font: { size: 18, weight: '600' }, color: '#111827' },
      tooltip: {
        backgroundColor: '#1f2937',
        titleFont: { size: 14 },
        bodyFont: { size: 12 },
      },
    },
    scales: {
      y: { beginAtZero: true, ticks: { color: '#6b7280', stepSize: 50 }, grid: { color: '#e5e7eb' } },
      x: { ticks: { color: '#6b7280' }, grid: { display: false } },
    },
    animation: {
      duration: 1500,
      easing: 'easeInOutQuart',
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={isMounted ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="w-full"
    >
      <Card className="rounded-2xl shadow-md border-none bg-white hover:shadow-xl transition-all duration-300">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl font-semibold text-gray-900">Engagement Stats</CardTitle>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="text-sm text-gray-600 hover:text-indigo-600 border-gray-200 rounded-lg hover:bg-gray-50">
                  Last 7 Days ▼
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="rounded-lg">
                <DropdownMenuItem>Last 7 Days</DropdownMenuItem>
                <DropdownMenuItem>Last 30 Days</DropdownMenuItem>
                <DropdownMenuItem>Last 90 Days</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center items-center h-48">
              <FaSpinner className="text-4xl text-indigo-600 animate-spin" />
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isMounted ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <Bar data={engagementData} options={chartOptions} />
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

const RecentPosts = ({ isMounted, platformIcons }) => {
  const posts = [
    { platform: 'f', caption: 'New product launch event photos', status: 'Published', likes: 120, comments: 15, shares: 10, date: '2025-05-07' },
    { platform: 'ig', caption: 'Behind the scenes of our latest shoot', status: 'Published', likes: 200, comments: 25, shares: 30, date: '2025-05-06' },
    { platform: 'tw', caption: 'Quick update on our project', status: 'Published', likes: 80, comments: 10, shares: 20, date: '2025-05-05' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isMounted ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="w-full"
    >
      <Card className="rounded-2xl shadow-md border-none bg-white hover:shadow-xl transition-all duration-300">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-semibold text-gray-900">Recent Posts</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-b border-gray-100">
                <TableHead className="text-gray-600 font-semibold">Platform</TableHead>
                <TableHead className="text-gray-600 font-semibold">Post</TableHead>
                <TableHead className="text-gray-600 font-semibold">Engagement</TableHead>
                <TableHead className="text-gray-600 font-semibold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {posts.map((post, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isMounted ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  className="hover:bg-gray-50"
                >
                  <TableCell>
                    <motion.div whileHover={{ scale: 1.05 }}>
                      <Badge variant="outline" className="rounded-lg flex items-center space-x-1 bg-gray-50 border-gray-200">
                        <span className="text-lg">{platformIcons[post.platform]}</span>
                        <span className="font-semibold">{post.platform.toUpperCase()}</span>
                      </Badge>
                    </motion.div>
                  </TableCell>
                  <TableCell>
                    <HoverCard>
                      <HoverCardTrigger>
                        <div className="flex flex-col">
                          <span className="text-gray-900 font-semibold">{post.caption}</span>
                          <Badge className="mt-1 w-fit text-xs bg-indigo-100 text-indigo-800 rounded-lg">{post.status}</Badge>
                        </div>
                      </HoverCardTrigger>
                      <HoverCardContent className="rounded-lg">
                        <p className="text-sm">{post.caption}</p>
                        <p className="text-xs text-gray-500 mt-1">{post.date}</p>
                      </HoverCardContent>
                    </HoverCard>
                  </TableCell>
                  <TableCell className="text-gray-600">
                    👍 {post.likes} 💬 {post.comments} 🔁 {post.shares}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="text-gray-600 hover:text-indigo-600 transition-colors rounded-lg">Actions</Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="rounded-lg">
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>View</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </motion.tr>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const PlatformBreakdown = ({ isMounted, platformIcons }) => {
  const breakdown = [
    { platform: 'f', posts: 5, engagement: '3.2%' },
    { platform: 'ig', posts: 4, engagement: '5.1%' },
    { platform: 'tw', posts: 3, engagement: '2.8%' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isMounted ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="w-full"
    >
      <Card className="rounded-2xl shadow-md border-none bg-white hover:shadow-xl transition-all duration-300">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-semibold text-gray-900">Platform Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-b border-gray-100">
                <TableHead className="text-gray-600 font-semibold">Platform</TableHead>
                <TableHead className="text-gray-600 font-semibold">Posts</TableHead>
                <TableHead className="text-gray-600 font-semibold">Engagement</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {breakdown.map((platform, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isMounted ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  className="hover:bg-gray-50"
                >
                  <TableCell>
                    <motion.div whileHover={{ scale: 1.05 }}>
                      <Badge variant="outline" className="rounded-lg flex items-center space-x-1 bg-gray-50 border-gray-200">
                        <span className="text-lg">{platformIcons[platform.platform]}</span>
                        <span className="font-semibold">{platform.platform.toUpperCase()}</span>
                      </Badge>
                    </motion.div>
                  </TableCell>
                  <TableCell className="text-gray-600 font-semibold">{platform.posts}</TableCell>
                  <TableCell className="text-gray-600 font-semibold">{platform.engagement}</TableCell>
                </motion.tr>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const RecentComments = ({ isMounted, platformIcons }) => {
  const comments = [
    { username: 'user1', platform: 'f', comment: 'Great post! Loved the visuals.', avatar: 'U1', timestamp: '2h ago' },
    { username: 'user2', platform: 'ig', comment: "Love this! Can't wait for more.", avatar: 'U2', timestamp: '4h ago' },
    { username: 'user3', platform: 'tw', comment: 'Amazing update, thanks for sharing!', avatar: 'U3', timestamp: '6h ago' },
    { username: 'user4', platform: 'in', comment: 'Really insightful content!', avatar: 'U4', timestamp: '8h ago' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isMounted ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="w-full"
    >
      <Card className="rounded-2xl shadow-md border-none bg-white hover:shadow-xl transition-all duration-300">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-semibold text-gray-900">Recent Comments</CardTitle>
        </CardHeader>
        <CardContent>
          {comments.map((comment, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={isMounted ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              className="flex items-start space-x-3 mb-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-indigo-100 text-indigo-800">{comment.avatar}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex justify-between">
                  <p className="font-semibold text-gray-900">{comment.username}</p>
                  <p className="text-xs text-gray-500 font-medium">{comment.timestamp}</p>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  <motion.span whileHover={{ scale: 1.05 }} className="inline-block">
                    <Badge variant="outline" className="rounded-lg mr-1 flex items-center space-x-1 bg-gray-50 border-gray-200">
                      <span className="text-lg">{platformIcons[comment.platform]}</span>
                      <span className="font-semibold">{comment.platform.toUpperCase()}</span>
                    </Badge>
                  </motion.span>
                  {comment.comment}
                </p>
              </div>
              <Button variant="link" className="text-indigo-600 text-sm hover:text-indigo-800 transition-colors font-semibold">Reply</Button>
            </motion.div>
          ))}
        </CardContent>
      </Card>
    </motion.div>
  );
};

const TopPerformingPost = ({ isMounted, platformIcons }) => {
  const topPost = {
    platform: 'ig',
    caption: 'Our biggest launch yet! 🚀',
    likes: 1500,
    comments: 320,
    shares: 450,
    date: '2025-05-05',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isMounted ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="w-full"
    >
      <Card className="rounded-2xl shadow-md border-none bg-white hover:shadow-xl transition-all duration-300">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-semibold text-gray-900">Top Performing Post</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-3 mb-4">
            <motion.div whileHover={{ scale: 1.05 }}>
              <Badge variant="outline" className="rounded-lg flex items-center space-x-1 bg-gray-50 border-gray-200">
                <span className="text-lg">{platformIcons[topPost.platform]}</span>
                <span className="font-semibold">{topPost.platform.toUpperCase()}</span>
              </Badge>
            </motion.div>
            <div>
              <p className="text-gray-900 font-semibold">{topPost.caption}</p>
              <p className="text-xs text-gray-500">{topPost.date}</p>
            </div>
          </div>
          <div className="flex space-x-4 text-gray-600">
            <span>👍 {topPost.likes.toLocaleString()}</span>
            <span>💬 {topPost.comments.toLocaleString()}</span>
            <span>🔁 {topPost.shares.toLocaleString()}</span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const AudienceInsights = ({ isMounted }) => {
  const insights = [
    { label: '18-24', value: '35%' },
    { label: '25-34', value: '45%' },
    { label: '35+', value: '20%' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isMounted ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="w-full"
    >
      <Card className="rounded-2xl shadow-md border-none bg-white hover:shadow-xl transition-all duration-300">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-semibold text-gray-900">Audience Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {insights.map((insight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, width: 0 }}
                animate={isMounted ? { opacity: 1, width: '100%' } : {}}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                className="flex justify-between items-center"
              >
                <span className="text-gray-600 font-semibold">{insight.label}</span>
                <span className="text-gray-900 font-semibold">{insight.value}</span>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const PostSchedulerPreview = ({ isMounted, platformIcons }) => {
  const scheduledPost = {
    platform: 'tw',
    content: 'Join us for a live Q&A session tomorrow! #SocialMedia',
    date: '2025-05-09 10:00',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isMounted ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="w-full"
    >
      <Card className="rounded-2xl shadow-md border-none bg-white hover:shadow-xl transition-all duration-300">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-semibold text-gray-900">Post Scheduler Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-3 mb-4">
            <motion.div whileHover={{ scale: 1.05 }}>
              <Badge variant="outline" className="rounded-lg flex items-center space-x-1 bg-gray-50 border-gray-200">
                <span className="text-lg">{platformIcons[scheduledPost.platform]}</span>
                <span className="font-semibold">{scheduledPost.platform.toUpperCase()}</span>
              </Badge>
            </motion.div>
            <div>
              <p className="text-gray-900 font-semibold">{scheduledPost.content}</p>
              <p className="text-xs text-gray-500">{scheduledPost.date}</p>
            </div>
          </div>
          <Button className="w-full bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg transition-all duration-200 font-semibold">
            Edit Schedule
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const EngagementRateIndicator = ({ isMounted }) => {
  const engagementRate = 65;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isMounted ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="w-full"
    >
      <Card className="rounded-2xl shadow-md border-none bg-white hover:shadow-xl transition-all duration-300">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-semibold text-gray-900">Engagement Rate</CardTitle>
        </CardHeader>
        <CardContent>
          <motion.div
            className="relative w-24 h-24 mx-auto"
            initial={{ scale: 0 }}
            animate={isMounted ? { scale: 1 } : {}}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle
                className="text-gray-200"
                strokeWidth="10"
                stroke="currentColor"
                fill="transparent"
                r="45"
                cx="50"
                cy="50"
              />
              <motion.circle
                className="text-indigo-600"
                strokeWidth="10"
                strokeDasharray={`${engagementRate * 2.83}, 283`}
                strokeDashoffset="0"
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
                r="45"
                cx="50"
                cy="50"
                initial={{ strokeDasharray: '0, 283' }}
                animate={isMounted ? { strokeDasharray: `${engagementRate * 2.83}, 283` } : {}}
                transition={{ duration: 1.5, ease: 'easeOut' }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold text-gray-900">{engagementRate}%</span>
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const MetricsCards = ({ isMounted }) => {
  const metrics = [
    { icon: '📊', value: 815, label: 'Total Likes' },
    { icon: '💬', value: 2821, label: 'Total Comments' },
    { icon: '🔁', value: 99, label: 'Total Shares' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isMounted ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="w-full"
    >
      <Card className="rounded-2xl shadow-md border-none bg-white hover:shadow-xl transition-all duration-300">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-semibold text-gray-900">Engagement Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {metrics.map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isMounted ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1, duration: 0.5, ease: 'easeOut' }}
              >
                <div className="flex items-center space-x-3">
                  <motion.span
                    whileHover={{ scale: 1.1 }}
                    className="text-2xl"
                  >
                    {metric.icon}
                  </motion.span>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{metric.value.toLocaleString()}</h2>
                    <p className="text-sm text-gray-500 font-semibold">{metric.label}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default function Dashboard() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const platformIcons = {
    f: <FaFacebookF className="text-blue-600" />,
    ig: <FaInstagram className="text-pink-600" />,
    tw: <FaTwitter className="text-sky-500" />,
    in: <FaLinkedinIn className="text-blue-700" />,
    p: <FaPinterestP className="text-red-600" />,
    t: <FaTiktok className="text-black" />,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sticky Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={isMounted ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="sticky top-0 z-20 bg-white shadow-sm px-6 py-4"
      >
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900">Social Media Dashboard</h1>
          <div className="flex space-x-3">
            {['➕ New Post', '🗓️ Schedule'].map((action, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button className="bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg px-4 py-2 text-sm font-semibold shadow-md transition-all duration-200">
                  {action}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      <div className="p-6 max-w-7xl mx-auto">
        {/* Overview Metrics */}
        <OverviewMetrics isMounted={isMounted} />

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <EngagementStats isMounted={isMounted} />
            <RecentPosts isMounted={isMounted} platformIcons={platformIcons} />
            <PlatformBreakdown isMounted={isMounted} platformIcons={platformIcons} />
          </div>
          <div className="space-y-6">
            <RecentComments isMounted={isMounted} platformIcons={platformIcons} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <TopPerformingPost isMounted={isMounted} platformIcons={platformIcons} />
              <AudienceInsights isMounted={isMounted} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <PostSchedulerPreview isMounted={isMounted} platformIcons={platformIcons} />
              <EngagementRateIndicator isMounted={isMounted} />
            </div>
            <MetricsCards isMounted={isMounted} />
          </div>
        </div>
      </div>
    </div>
  );
}