"use client";
import { useState, useRef } from "react"
import { CalendarIcon, Clock, Image, Linkedin, Paperclip, X, Hash, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { RichTextEditor } from "@/components/rich-text-editor"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

const postFormSchema = z.object({
  content: z.string().min(1, "Post content is required").max(3000, "Post content cannot exceed 3000 characters"),
  image: z.string().optional(),
  scheduledDate: z.date().optional(),
  scheduledTime: z.string().optional(),
  visibility: z.enum(["public", "connections", "private"]).default("public"),
  hashtags: z.array(z.string()).optional(),
  enableAutoHashtags: z.boolean().default(true),
  postAtOptimalTime: z.boolean().default(true),
  notifyWhenPublished: z.boolean().default(true),
})

export function AddPostForm({
  open,
  onOpenChange,
  onSubmit
}) {
  const [isDragging, setIsDragging] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const [newHashtag, setNewHashtag] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const fileInputRef = useRef(null)

  const form = useForm({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      content: "",
      image: undefined,
      scheduledDate: undefined,
      scheduledTime: "12:00",
      visibility: "public",
      hashtags: [],
      enableAutoHashtags: true,
      postAtOptimalTime: true,
      notifyWhenPublished: true,
    },
  })

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const imageUrl = e.target?.result
        setSelectedImage(imageUrl)
        form.setValue("image", imageUrl)
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
        const imageUrl = e.target?.result
        setSelectedImage(imageUrl)
        form.setValue("image", imageUrl)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setSelectedImage(null)
    form.setValue("image", undefined)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const addHashtag = () => {
    if (newHashtag && !form.getValues("hashtags")?.includes(newHashtag)) {
      const currentHashtags = form.getValues("hashtags") || []
      form.setValue("hashtags", [...currentHashtags, newHashtag])
      setNewHashtag("")
    }
  }

  const removeHashtag = (tag) => {
    const currentHashtags = form.getValues("hashtags") || []
    form.setValue("hashtags", currentHashtags.filter((t) => t !== tag))
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addHashtag()
    }
  }

  const handleFormSubmit = (values) => {
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      onSubmit?.(values)
      onOpenChange(false)
      form.reset()
      setSelectedImage(null)
    }, 1500)
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
    (<Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Post</DialogTitle>
          <DialogDescription>Create and schedule your LinkedIn post</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
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

                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Post Content</FormLabel>
                      <FormControl>
                        <RichTextEditor
                          value={field.value}
                          onChange={field.onChange}
                          placeholder="What do you want to share?" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

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
                        className="rounded-md w-full h-auto max-h-[200px] object-cover" />
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2 h-8 w-8 rounded-full"
                        onClick={removeImage}
                        type="button">
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
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => fileInputRef.current?.click()}
                        type="button">
                        <Paperclip className="mr-2 h-4 w-4" />
                        Browse
                      </Button>
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
                    <Label>Hashtags</Label>
                    <FormField
                      control={form.control}
                      name="enableAutoHashtags"
                      render={({ field }) => (
                        <FormItem className="flex items-center gap-2 space-y-0">
                          <FormLabel className="text-xs">Auto-suggest</FormLabel>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )} />
                  </div>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {form.getValues("hashtags")?.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="px-3 py-1">
                        #{tag}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-4 w-4 p-0 ml-2"
                          onClick={() => removeHashtag(tag)}
                          type="button">
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
                    <Button onClick={addHashtag} size="sm" type="button">
                      <Hash className="h-4 w-4" />
                    </Button>
                  </div>
                  {form.getValues("enableAutoHashtags") && (
                    <div className="mt-2">
                      <p className="text-xs text-muted-foreground mb-1">Suggested hashtags:</p>
                      <div className="flex flex-wrap gap-2">
                        {suggestedHashtags.map((tag, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="cursor-pointer hover:bg-secondary"
                            onClick={() => {
                              const currentHashtags = form.getValues("hashtags") || []
                              if (!currentHashtags.includes(tag)) {
                                form.setValue("hashtags", [...currentHashtags, tag])
                              }
                            }}>
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-4">
                  <FormLabel>Post Preview</FormLabel>
                  <Card>
                    <CardContent className="p-4">
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
                            {form.getValues("content") || "Your post content will appear here..."}
                          </p>
                          {form.getValues("hashtags")?.length > 0 && (
                            <p className="text-sm text-blue-500">
                              {form
                                .getValues("hashtags")
                                .map((tag) => `#${tag}`)
                                .join(" ")}
                            </p>
                          )}
                          {selectedImage && (
                            <img
                              src={selectedImage || "/placeholder.svg"}
                              alt="Preview"
                              className="rounded-md w-full h-auto max-h-[200px] object-cover" />
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
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-4">
                  <FormLabel>Schedule Post</FormLabel>
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="scheduledDate"
                      render={({ field }) => (
                        <FormItem>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button variant="outline" className="w-full justify-start text-left font-normal">
                                  <CalendarIcon className="mr-2 h-4 w-4" />
                                  {field.value ? format(field.value, "PPP") : "Pick a date"}
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                initialFocus />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )} />

                    <FormField
                      control={form.control}
                      name="scheduledTime"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <Select value={field.value} onValueChange={field.onChange}>
                              <FormControl>
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Select time" />
                                </SelectTrigger>
                              </FormControl>
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
                          <FormMessage />
                        </FormItem>
                      )} />
                  </div>
                </div>

                <div className="space-y-4">
                  <FormLabel>Post Settings</FormLabel>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Linkedin className="h-4 w-4" />
                        <span className="text-sm">Visibility</span>
                      </div>
                      <FormField
                        control={form.control}
                        name="visibility"
                        render={({ field }) => (
                          <FormItem className="space-y-0">
                            <Select value={field.value} onValueChange={field.onChange}>
                              <FormControl>
                                <SelectTrigger className="w-[140px]">
                                  <SelectValue placeholder="Select visibility" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="public">Public</SelectItem>
                                <SelectItem value="connections">Connections</SelectItem>
                                <SelectItem value="private">Private</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )} />
                    </div>

                    <FormField
                      control={form.control}
                      name="postAtOptimalTime"
                      render={({ field }) => (
                        <FormItem className="flex items-center justify-between">
                          <FormLabel className="text-sm">Post at optimal time</FormLabel>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )} />

                    <FormField
                      control={form.control}
                      name="notifyWhenPublished"
                      render={({ field }) => (
                        <FormItem className="flex items-center justify-between">
                          <FormLabel className="text-sm">Notify when published</FormLabel>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )} />
                  </div>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => onOpenChange(false)} type="button">
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  "Submitting..."
                ) : form.getValues("scheduledDate") ? (
                  <>
                    <Calendar className="mr-2 h-4 w-4" />
                    Schedule Post
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Post Now
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>)
  );
}

