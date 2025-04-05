"use client";
import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function MediaGallery({
  onSelectImage
}) {
  const [searchQuery, setSearchQuery] = useState("")

  // Mock image data
  const recentImages = [
    { id: 1, url: "/placeholder.svg?height=400&width=600", title: "Product Launch" },
    { id: 2, url: "/placeholder.svg?height=400&width=600", title: "Team Meeting" },
    { id: 3, url: "/placeholder.svg?height=400&width=600", title: "Office Space" },
    { id: 4, url: "/placeholder.svg?height=400&width=600", title: "Conference" },
    { id: 5, url: "/placeholder.svg?height=400&width=600", title: "Product Demo" },
    { id: 6, url: "/placeholder.svg?height=400&width=600", title: "Company Event" },
    { id: 7, url: "/placeholder.svg?height=400&width=600", title: "Team Building" },
    { id: 8, url: "/placeholder.svg?height=400&width=600", title: "Marketing Campaign" },
  ]

  const stockImages = [
    { id: 9, url: "/placeholder.svg?height=400&width=600", title: "Business Meeting" },
    { id: 10, url: "/placeholder.svg?height=400&width=600", title: "Office Desk" },
    { id: 11, url: "/placeholder.svg?height=400&width=600", title: "Laptop and Coffee" },
    { id: 12, url: "/placeholder.svg?height=400&width=600", title: "Handshake" },
    { id: 13, url: "/placeholder.svg?height=400&width=600", title: "Presentation" },
    { id: 14, url: "/placeholder.svg?height=400&width=600", title: "Teamwork" },
    { id: 15, url: "/placeholder.svg?height=400&width=600", title: "Brainstorming" },
    { id: 16, url: "/placeholder.svg?height=400&width=600", title: "Networking" },
  ]

  // Filter images based on search query
  const filteredRecent = recentImages.filter((image) => image.title.toLowerCase().includes(searchQuery.toLowerCase()))

  const filteredStock = stockImages.filter((image) => image.title.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    (<div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search images..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} />
      </div>
      <Tabs defaultValue="recent">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="recent">Recent</TabsTrigger>
          <TabsTrigger value="stock">Stock</TabsTrigger>
        </TabsList>

        <TabsContent value="recent" className="mt-4">
          {filteredRecent.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No images found</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {filteredRecent.map((image) => (
                <div
                  key={image.id}
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => onSelectImage(image.url)}>
                  <img
                    src={image.url || "/placeholder.svg"}
                    alt={image.title}
                    className="w-full h-32 object-cover rounded-md" />
                  <p className="text-xs mt-1 truncate">{image.title}</p>
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="stock" className="mt-4">
          {filteredStock.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No images found</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {filteredStock.map((image) => (
                <div
                  key={image.id}
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => onSelectImage(image.url)}>
                  <img
                    src={image.url || "/placeholder.svg"}
                    alt={image.title}
                    className="w-full h-32 object-cover rounded-md" />
                  <p className="text-xs mt-1 truncate">{image.title}</p>
                </div>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>)
  );
}

