import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { NotificationsList } from "@/components/notifications-list"

export default function NotificationsTab() {
  return (
    <Card className="bg-white/30 backdrop-blur-lg border border-white/20 shadow-lg hover:shadow-xl transition-shadow">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-800">Notifications</CardTitle>
        <CardDescription className="text-gray-600">Stay updated with your account activity</CardDescription>
      </CardHeader>
      <CardContent>
        <NotificationsList />
      </CardContent>
    </Card>
  )
}