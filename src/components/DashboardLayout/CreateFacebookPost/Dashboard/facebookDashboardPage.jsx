"use client"

import { useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { AddPostForm } from "@/components/add-post-form" 
import DashboardHeader from "./header"
import OverviewTab from "./overviewtab"
import AnalyticsTab from "./analytics"
import CalendarTab from "./calanderTab"
import NotificationsTab from "./notificationsTab"

export default function FacebookDashboardPage() {
  const [isAddPostOpen, setIsAddPostOpen] = useState(false)
  const searchParams = useSearchParams()
  const sync = searchParams.get('sync')
  console.log(sync)

  const handleAddPost = (values) => {
    console.log("New post values:", values)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-8  mx-auto p-4 max-w-7xl"
      >
        <DashboardHeader onCreatePost={() => setIsAddPostOpen(true)} />

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-white/30 backdrop-blur-md rounded-lg p-1 shadow-sm border border-white/20">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white"
            >
              Overview
            </TabsTrigger>
          
            <TabsTrigger
              value="calendar"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white"
            >
              Calendar
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white"
            >
              Notifications
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <OverviewTab />
          </TabsContent>
          <TabsContent value="analytics">
            <AnalyticsTab />
          </TabsContent>
          <TabsContent value="calendar">
            <CalendarTab />
          </TabsContent>
          <TabsContent value="notifications">
            <NotificationsTab />
          </TabsContent>
        </Tabs>

        <AddPostForm
          open={isAddPostOpen}
          onOpenChange={setIsAddPostOpen}
          onSubmit={handleAddPost}
        />
      </motion.div>
    </div>
  )
}