import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarView } from "@/components/calendar-view"

export default function CalendarTab() {
  return (
    <Card className="bg-white/30 backdrop-blur-lg border border-white/20 shadow-lg hover:shadow-xl transition-shadow">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-800">Content Calendar</CardTitle>
        <CardDescription className="text-gray-600">View and manage your scheduled content</CardDescription>
      </CardHeader>
      <CardContent>
        <CalendarView />
      </CardContent>
    </Card>
  )
}