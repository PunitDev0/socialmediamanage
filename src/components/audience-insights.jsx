"use client"

import { useState } from "react"
import { DashboardChart } from "@/components/dashboard-chart"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function AudienceInsights() {
  const [period, setPeriod] = useState("30days")

  return (
    (<div className="space-y-6">
      <Tabs defaultValue="demographics" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="demographics">Demographics</TabsTrigger>
          <TabsTrigger value="interests">Interests</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="demographics" className="space-y-6 mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Age Distribution</CardTitle>
                <CardDescription>Age breakdown of your audience</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <DashboardChart
                    data={ageDistributionData}
                    color="#8b5cf6"
                    showAxis={true}
                    showTooltip={true}
                    showLegend={true} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Gender Distribution</CardTitle>
                <CardDescription>Gender breakdown of your audience</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <DashboardChart
                    data={genderDistributionData}
                    color="#10b981"
                    showAxis={true}
                    showTooltip={true}
                    showLegend={true} />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Location</CardTitle>
              <CardDescription>Geographic distribution of your audience</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <DashboardChart
                  data={locationData}
                  color="#3b82f6"
                  showAxis={true}
                  showTooltip={true}
                  showLegend={true} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="interests" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Top Interests</CardTitle>
              <CardDescription>What your audience is interested in</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <DashboardChart
                  data={interestsData}
                  color="#f59e0b"
                  showAxis={true}
                  showTooltip={true}
                  showLegend={true} />
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Industry</CardTitle>
                <CardDescription>Industries your audience works in</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <DashboardChart
                    data={industryData}
                    color="#8b5cf6"
                    showAxis={true}
                    showTooltip={true}
                    showLegend={true} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Job Functions</CardTitle>
                <CardDescription>Job functions of your audience</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <DashboardChart
                    data={jobFunctionData}
                    color="#10b981"
                    showAxis={true}
                    showTooltip={true}
                    showLegend={true} />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="activity" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Activity by Time of Day</CardTitle>
              <CardDescription>When your audience is most active</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <DashboardChart
                  data={activityByTimeData}
                  color="#3b82f6"
                  showAxis={true}
                  showTooltip={true}
                  showLegend={true} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Activity by Day of Week</CardTitle>
              <CardDescription>Which days your audience is most active</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <DashboardChart
                  data={activityByDayData}
                  color="#f59e0b"
                  showAxis={true}
                  showTooltip={true}
                  showLegend={true} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>)
  );
}

// Mock data
const ageDistributionData = [
  { name: "18-24", value: 15 },
  { name: "25-34", value: 35 },
  { name: "35-44", value: 25 },
  { name: "45-54", value: 15 },
  { name: "55+", value: 10 },
]

const genderDistributionData = [
  { name: "Male", value: 55 },
  { name: "Female", value: 42 },
  { name: "Other", value: 3 },
]

const locationData = [
  { name: "United States", value: 45 },
  { name: "United Kingdom", value: 15 },
  { name: "Canada", value: 10 },
  { name: "Australia", value: 8 },
  { name: "Germany", value: 7 },
  { name: "Other", value: 15 },
]

const interestsData = [
  { name: "Technology", value: 65 },
  { name: "Business", value: 55 },
  { name: "Marketing", value: 45 },
  { name: "Finance", value: 35 },
  { name: "Leadership", value: 30 },
]

const industryData = [
  { name: "Technology", value: 30 },
  { name: "Marketing", value: 20 },
  { name: "Finance", value: 15 },
  { name: "Healthcare", value: 10 },
  { name: "Education", value: 10 },
  { name: "Other", value: 15 },
]

const jobFunctionData = [
  { name: "Marketing", value: 25 },
  { name: "Sales", value: 20 },
  { name: "IT", value: 15 },
  { name: "Operations", value: 15 },
  { name: "HR", value: 10 },
  { name: "Other", value: 15 },
]

const activityByTimeData = [
  { name: "6am-9am", value: 15 },
  { name: "9am-12pm", value: 25 },
  { name: "12pm-3pm", value: 20 },
  { name: "3pm-6pm", value: 30 },
  { name: "6pm-9pm", value: 10 },
  { name: "9pm-12am", value: 5 },
]

const activityByDayData = [
  { name: "Monday", value: 15 },
  { name: "Tuesday", value: 20 },
  { name: "Wednesday", value: 25 },
  { name: "Thursday", value: 20 },
  { name: "Friday", value: 15 },
  { name: "Saturday", value: 5 },
  { name: "Sunday", value: 5 },
]

