import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardChart } from "@/components/dashboard-chart"

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

export default function AnalyticsTab() {
  return (
    <Card className="bg-white/30 backdrop-blur-lg border border-white/20 shadow-lg hover:shadow-xl transition-shadow">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-800">Analytics Overview</CardTitle>
        <CardDescription className="text-gray-600">Detailed analytics for your LinkedIn account</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-6">
            <div className="h-[300px] bg-white/20 rounded-lg p-4">
              <DashboardChart
                data={analyticsData.impressions}
                color="#8b5cf6"
                showAxis={true}
                showTooltip={true}
                showLegend={true}
                title="Impressions"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-white/20 backdrop-blur-md border border-white/20">
                <CardContent className="p-4">
                  <div className="text-sm font-medium text-gray-800">Avg. Engagement Rate</div>
                  <div className="text-2xl font-bold text-gray-900">18.2%</div>
                  <div className="text-xs text-green-500">↑ 4.3%</div>
                </CardContent>
              </Card>
              <Card className="bg-white/20 backdrop-blur-md border border-white/20">
                <CardContent className="p-4">
                  <div className="text-sm font-medium text-gray-800">Total Reactions</div>
                  <div className="text-2xl font-bold text-gray-900">2,845</div>
                  <div className="text-xs text-green-500">↑ 12.8%</div>
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="space-y-6">
            <div className="h-[300px] bg-white/20 rounded-lg p-4">
              <DashboardChart
                data={analyticsData.followers}
                color="#10b981"
                showAxis={true}
                showTooltip={true}
                showLegend={true}
                title="Followers Growth"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-white/20 backdrop-blur-md border border-white/20">
                <CardContent className="p-4">
                  <div className="text-sm font-medium text-gray-800">Profile Views</div>
                  <div className="text-2xl font-bold text-gray-900">1,429</div>
                  <div className="text-xs text-green-500">↑ 24%</div>
                </CardContent>
              </Card>
              <Card className="bg-white/20 backdrop-blur-md border border-white/20">
                <CardContent className="p-4">
                  <div className="text-sm font-medium text-gray-800">Click-through Rate</div>
                  <div className="text-2xl font-bold text-gray-900">5.7%</div>
                  <div className="text-xs text-green-500">↑ 1.2%</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}