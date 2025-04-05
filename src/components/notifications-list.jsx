"use client";
import { useState } from "react"
import { Bell, Calendar, Check, MessageSquare, Trash2, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function NotificationsList() {
  const [notifications, setNotifications] = useState(mockNotifications)

  const markAllAsRead = () => {
    setNotifications(notifications.map((notification) => ({
      ...notification,
      read: true,
    })))
  }

  const markAsRead = (id) => {
    setNotifications(notifications.map(
      (notification) => (notification.id === id ? { ...notification, read: true } : notification)
    ))
  }

  const deleteNotification = (id) => {
    setNotifications(notifications.filter((notification) => notification.id !== id))
  }

  const unreadCount = notifications.filter((notification) => !notification.read).length

  return (
    (<div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="font-medium">Your Notifications</h3>
          {unreadCount > 0 && <Badge variant="secondary">{unreadCount} unread</Badge>}
        </div>
        <Button variant="outline" size="sm" onClick={markAllAsRead}>
          Mark all as read
        </Button>
      </div>
      <Tabs defaultValue="all">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="unread">Unread</TabsTrigger>
          <TabsTrigger value="mentions">Mentions</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4">
          <div className="space-y-2">
            {notifications.length === 0 ? (
              <div className="text-center py-8">
                <Bell className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                <p className="text-muted-foreground">No notifications</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  onMarkAsRead={markAsRead}
                  onDelete={deleteNotification} />
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="unread" className="mt-4">
          <div className="space-y-2">
            {notifications.filter((n) => !n.read).length === 0 ? (
              <div className="text-center py-8">
                <Check className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                <p className="text-muted-foreground">No unread notifications</p>
              </div>
            ) : (
              notifications
                .filter((notification) => !notification.read)
                .map((notification) => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                    onMarkAsRead={markAsRead}
                    onDelete={deleteNotification} />
                ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="mentions" className="mt-4">
          <div className="space-y-2">
            {notifications.filter((n) => n.type === "mention").length === 0 ? (
              <div className="text-center py-8">
                <MessageSquare className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                <p className="text-muted-foreground">No mentions</p>
              </div>
            ) : (
              notifications
                .filter((notification) => notification.type === "mention")
                .map((notification) => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                    onMarkAsRead={markAsRead}
                    onDelete={deleteNotification} />
                ))
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>)
  );
}

function NotificationItem({
  notification,
  onMarkAsRead,
  onDelete
}) {
  const getIcon = (type) => {
    switch (type) {
      case "post":
        return <Calendar className="h-5 w-5 text-blue-500" />;
      case "mention":
        return <MessageSquare className="h-5 w-5 text-purple-500" />;
      case "follow":
        return <User className="h-5 w-5 text-green-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  }

  return (
    (<div
      className={`flex items-start gap-3 p-3 rounded-md ${notification.read ? "bg-card" : "bg-muted/30"}`}>
      <div className="mt-1">{getIcon(notification.type)}</div>
      <div className="flex-1">
        <p className={`text-sm ${notification.read ? "" : "font-medium"}`}>{notification.message}</p>
        <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
      </div>
      <div className="flex gap-1">
        {!notification.read && (
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => onMarkAsRead(notification.id)}>
            <Check className="h-4 w-4" />
            <span className="sr-only">Mark as read</span>
          </Button>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7"
          onClick={() => onDelete(notification.id)}>
          <Trash2 className="h-4 w-4" />
          <span className="sr-only">Delete</span>
        </Button>
      </div>
    </div>)
  );
}

const mockNotifications = [
  {
    id: "1",
    type: "post",
    message: 'Your scheduled post "Product Launch Announcement" has been published.',
    time: "2 hours ago",
    read: false,
  },
  {
    id: "2",
    type: "mention",
    message: 'Jane Smith mentioned you in a comment: "Great work on this @John!"',
    time: "Yesterday",
    read: false,
  },
  {
    id: "3",
    type: "follow",
    message: "You have 5 new followers this week.",
    time: "2 days ago",
    read: true,
  },
  {
    id: "4",
    type: "post",
    message: 'Your post "Weekly Industry Insights" is performing 35% better than average.',
    time: "3 days ago",
    read: true,
  },
  {
    id: "5",
    type: "mention",
    message: "Bob Johnson mentioned you in a post about digital marketing trends.",
    time: "5 days ago",
    read: true,
  },
]

