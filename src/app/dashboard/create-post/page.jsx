"use client";
import { useState, useRef } from "react"
import { CalendarIcon, Clock, Image, Linkedin, Paperclip, X, Sparkles, Hash, Save, Send } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar } from "@/components/ui/calendar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { RichTextEditor } from "@/components/rich-text-editor"
import { MediaGallery } from "@/components/media-gallery"
import { PostTemplates } from "@/components/post-templates"
import { AIContentSuggestions } from "@/components/ai-content-suggestions"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

export default function CreatePostPage() {
  const [postContent, setPostContent] = useState("")
  const [selectedImage, setSelectedImage] = useState(null)
  const [date, setDate] = useState()
  const [time, setTime] = useState("12:00")
  const [isDragging, setIsDragging] = useState(false)
  const [hashtags, setHashtags] = useState([])
  const [newHashtag, setNewHashtag] = useState("")
  const [isAIDialogOpen, setIsAIDialogOpen] = useState(false)
  const [isTemplateDialogOpen, setIsTemplateDialogOpen] = useState(false)
  const [isMediaGalleryOpen, setIsMediaGalleryOpen] = useState(false)
  const [postTone, setPostTone] = useState(50) // 0-100 scale: professional to casual
  const [enableAutoHashtags, setEnableAutoHashtags] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [isScheduling, setIsScheduling] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const fileInputRef = useRef(null)

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setSelectedImage(e.target?.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)

    const file = e.dataTransfer.files?.[0]
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setSelectedImage(e.target?.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setSelectedImage(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const addHashtag = () => {
    if (newHashtag && !hashtags.includes(newHashtag)) {
      setHashtags([...hashtags, newHashtag])
      setNewHashtag("")
    }
  }

  const removeHashtag = (tag) => {
    setHashtags(hashtags.filter((t) => t !== tag))
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addHashtag()
    }
  }

  const saveAsDraft = () => {
    setIsSaving(true)
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false)
      setSaveSuccess(true)
      setTimeout(() => setSaveSuccess(false), 3000)
    }, 1500)
  }

  const schedulePost = () => {
    setIsScheduling(true)
    // Simulate API call
    setTimeout(() => {
      setIsScheduling(false)
      window.location.href = "/dashboard/scheduled-posts"
    }, 1500)
  }

  const selectFromGallery = (imageUrl) => {
    setSelectedImage(imageUrl)
    setIsMediaGalleryOpen(false)
  }

  const applyTemplate = (template) => {
    setPostContent(template)
    setIsTemplateDialogOpen(false)
  }

  const applyAISuggestion = (suggestion) => {
    setPostContent(suggestion)
    setIsAIDialogOpen(false)
  }

  // Suggested hashtags based on content
  const suggestedHashtags = [
    "Marketing",
    "SocialMedia",
    "LinkedIn",
    "ContentStrategy",
    "DigitalMarketing",
    "B2B",
    "Networking",
    "ProfessionalDevelopment",
  ]

  return (
    (<div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Create Post</h1>
        <p className="text-muted-foreground">Create and schedule your LinkedIn post</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-4">
          <Tabs defaultValue="editor" className="w-full">
            <TabsList className="w-full grid grid-cols-3">
              <TabsTrigger value="editor">Editor</TabsTrigger>
              <TabsTrigger value="templates">Templates</TabsTrigger>
              <TabsTrigger value="ai">AI Assistant</TabsTrigger>
            </TabsList>
            <TabsContent value="editor" className="space-y-4 mt-4">
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src="/placeholder-user.jpg" alt="User" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">John Doe</p>
                        <p className="text-xs text-muted-foreground">Product Manager at Acme Inc.</p>
                      </div>
                    </div>

                    <RichTextEditor
                      value={postContent}
                      onChange={setPostContent}
                      placeholder="What do you want to share?" />

                    <div
                      className={cn(
                        "border-2 border-dashed rounded-md p-6 transition-colors",
                        isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/20",
                        selectedImage ? "p-2" : "p-6"
                      )}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}>
                      {selectedImage ? (
                        <div className="relative">
                          <img
                            src={selectedImage || "/placeholder.svg"}
                            alt="Preview"
                            className="rounded-md w-full h-auto max-h-[300px] object-cover" />
                          <Button
                            variant="destructive"
                            size="icon"
                            className="absolute top-2 right-2 h-8 w-8 rounded-full"
                            onClick={removeImage}>
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center gap-2 text-center">
                          <Image className="h-8 w-8 text-muted-foreground" />
                          <div>
                            <p className="font-medium">Drag and drop an image</p>
                            <p className="text-xs text-muted-foreground">or click to browse</p>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
                              <Paperclip className="mr-2 h-4 w-4" />
                              Browse
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => setIsMediaGalleryOpen(true)}>
                              <Image className="mr-2 h-4 w-4" />
                              Gallery
                            </Button>
                          </div>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            ref={fileInputRef}
                            onChange={handleImageUpload} />
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">Hashtags</p>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0"
                                onClick={() => setEnableAutoHashtags(!enableAutoHashtags)}>
                                <Sparkles
                                  className={cn(
                                    "h-4 w-4",
                                    enableAutoHashtags ? "text-purple-500" : "text-muted-foreground"
                                  )} />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{enableAutoHashtags ? "Disable" : "Enable"} auto hashtag suggestions</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {hashtags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="px-3 py-1">
                            #{tag}
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-4 w-4 p-0 ml-2"
                              onClick={() => removeHashtag(tag)}>
                              <X className="h-3 w-3" />
                            </Button>
                          </Badge>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Input
                          placeholder="Add hashtag"
                          value={newHashtag}
                          onChange={(e) => setNewHashtag(e.target.value)}
                          onKeyDown={handleKeyDown} />
                        <Button onClick={addHashtag} size="sm">
                          <Hash className="h-4 w-4" />
                        </Button>
                      </div>
                      {enableAutoHashtags && (
                        <div className="mt-2">
                          <p className="text-xs text-muted-foreground mb-1">Suggested hashtags:</p>
                          <div className="flex flex-wrap gap-2">
                            {suggestedHashtags.map((tag, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="cursor-pointer hover:bg-secondary"
                                onClick={() => {
                                  if (!hashtags.includes(tag)) {
                                    setHashtags([...hashtags, tag])
                                  }
                                }}>
                                #{tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm font-medium">Schedule Post</p>
                      <div className="flex gap-2">
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" className="w-full justify-start text-left font-normal">
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {date ? format(date, "PPP") : "Pick a date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                          </PopoverContent>
                        </Popover>

                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <Select value={time} onValueChange={setTime}>
                            <SelectTrigger className="w-[110px]">
                              <SelectValue placeholder="Select time" />
                            </SelectTrigger>
                            <SelectContent>
                              {Array.from({ length: 24 }).map((_, hour) =>
                                [0, 30].map((minute) => {
                                  const formattedHour = hour.toString().padStart(2, "0")
                                  const formattedMinute = minute.toString().padStart(2, "0")
                                  const timeValue = `${formattedHour}:${formattedMinute}`
                                  return (
                                    (<SelectItem key={timeValue} value={timeValue}>
                                      {timeValue}
                                    </SelectItem>)
                                  );
                                }))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={saveAsDraft} disabled={isSaving}>
                        {isSaving ? (
                          <>Saving...</>
                        ) : (
                          <>
                            <Save className="mr-2 h-4 w-4" />
                            Save as Draft
                          </>
                        )}
                      </Button>
                      <AnimatePresence>
                        {saveSuccess && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="absolute right-20 bottom-4 bg-green-500 text-white px-3 py-1 rounded-md text-sm">
                            Saved successfully!
                          </motion.div>
                        )}
                      </AnimatePresence>
                      <Button onClick={schedulePost} disabled={isScheduling}>
                        {isScheduling ? (
                          <>Scheduling...</>
                        ) : (
                          <>
                            <Send className="mr-2 h-4 w-4" />
                            Schedule Post
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="templates" className="space-y-4 mt-4">
              <Card>
                <CardContent className="p-6">
                  <PostTemplates onSelectTemplate={applyTemplate} />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="ai" className="space-y-4 mt-4">
              <Card>
                <CardContent className="p-6">
                  <AIContentSuggestions onSelectSuggestion={applyAISuggestion} />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <p className="text-sm font-medium">LinkedIn Post Preview</p>
                <div className="rounded-md border p-4 bg-white dark:bg-gray-900">
                  <div className="flex items-center gap-2 mb-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="/placeholder-user.jpg" alt="User" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">John Doe</p>
                      <p className="text-xs text-muted-foreground">Product Manager at Acme Inc.</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <p className="text-sm whitespace-pre-wrap">
                      {postContent || "Your post content will appear here..."}
                    </p>
                    {hashtags.length > 0 && (
                      <p className="text-sm text-blue-500">{hashtags.map((tag) => `#${tag}`).join(" ")}</p>
                    )}
                    {selectedImage && (
                      <img
                        src={selectedImage || "/placeholder.svg"}
                        alt="Preview"
                        className="rounded-md w-full h-auto max-h-[300px] object-cover" />
                    )}
                  </div>
                  <div className="mt-4 flex items-center gap-4 text-muted-foreground">
                    <button className="flex items-center gap-1 text-xs">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-thumbs-up">
                        <path d="M7 10v12" />
                        <path
                          d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
                      </svg>
                      Like
                    </button>
                    <button className="flex items-center gap-1 text-xs">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-message-square">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                      </svg>
                      Comment
                    </button>
                    <button className="flex items-center gap-1 text-xs">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-repeat">
                        <path d="m17 2 4 4-4 4" />
                        <path d="M3 11v-1a4 4 0 0 1 4-4h14" />
                        <path d="m7 22-4-4 4-4" />
                        <path d="M21 13v1a4 4 0 0 1-4 4H3" />
                      </svg>
                      Repost
                    </button>
                    <button className="flex items-center gap-1 text-xs">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-send">
                        <path d="m22 2-7 20-4-9-9-4Z" />
                        <path d="M22 2 11 13" />
                      </svg>
                      Send
                    </button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Post Settings</CardTitle>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="tone">Content Tone</Label>
                    <span className="text-xs text-muted-foreground">
                      {postTone < 33 ? "Professional" : postTone < 66 ? "Balanced" : "Casual"}
                    </span>
                  </div>
                  <Slider
                    id="tone"
                    min={0}
                    max={100}
                    step={1}
                    value={[postTone]}
                    onValueChange={(value) => setPostTone(value[0])}
                    className="w-full" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Professional</span>
                    <span>Casual</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Linkedin className="h-4 w-4" />
                      <span className="text-sm">LinkedIn</span>
                    </div>
                    <div className="flex items-center">
                      <Select defaultValue="public">
                        <SelectTrigger className="w-[140px]">
                          <SelectValue placeholder="Visibility" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="public">Public</SelectItem>
                          <SelectItem value="connections">Connections</SelectItem>
                          <SelectItem value="private">Private</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="auto-hashtags" className="text-sm">
                      Auto-suggest hashtags
                    </Label>
                    <Switch
                      id="auto-hashtags"
                      checked={enableAutoHashtags}
                      onCheckedChange={setEnableAutoHashtags} />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="best-time" className="text-sm">
                      Post at optimal time
                    </Label>
                    <Switch id="best-time" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="notify" className="text-sm">
                      Notify when published
                    </Label>
                    <Switch id="notify" defaultChecked />
                  </div>
                </div>

                <div className="pt-2">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setIsAIDialogOpen(true)}>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Get AI Content Suggestions
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      {/* Media Gallery Dialog */}
      <Dialog open={isMediaGalleryOpen} onOpenChange={setIsMediaGalleryOpen}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>Media Gallery</DialogTitle>
            <DialogDescription>Select an image from your media gallery</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <MediaGallery onSelectImage={selectFromGallery} />
          </div>
        </DialogContent>
      </Dialog>
    </div>)
  );
}

