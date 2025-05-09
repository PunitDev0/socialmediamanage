import { Button } from "@/components/ui/button"
import { PenSquare } from "lucide-react"

export default function DashboardHeader({ onCreatePost }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 ">
      <div>
        <h1 className="text-4xl font-extrabold tracking-tight">
          Dashboard
        </h1>
        <p className="text-lg text-gray-600 mt-2">Welcome back! Here's an overview of your LinkedIn automation.</p>
      </div>
      <Button
        onClick={onCreatePost}
        className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
      >
        <PenSquare className="mr-2 h-5 w-5" />
        Create New Post
      </Button>
    </div>
  )
}