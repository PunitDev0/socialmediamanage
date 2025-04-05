"use client";
import { useState } from "react"
import { Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"

export function AIContentSuggestions({
  onSelectSuggestion
}) {
  const [topic, setTopic] = useState("")
  const [contentType, setContentType] = useState("thought-leadership")
  const [tone, setTone] = useState(50) // 0-100 scale: professional to casual
  const [keywords, setKeywords] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [suggestions, setSuggestions] = useState([])

  const generateSuggestions = () => {
    setIsGenerating(true)

    // Mock AI generation - in a real app, this would call an AI API
    setTimeout(() => {
      const mockSuggestions = [
        `Excited to share my thoughts on ${topic}! After researching this topic extensively, I've found that the key insights are: 1) [First Point], 2) [Second Point], and 3) [Third Point]. What has your experience been? #${keywords.split(",")[0]?.trim()} #ThoughtLeadership`,

        `Just published a new article on ${topic}. In this piece, I explore how this trend is reshaping our industry and what it means for professionals like us. Check out the full article at the link in my bio! #${keywords.split(",")[0]?.trim()} #ProfessionalDevelopment`,

        `Here's a quick tip about ${topic} that most people overlook: [Unique Insight]. This approach has helped me achieve [Specific Result] in my work. Would love to hear your thoughts! #${keywords.split(",")[0]?.trim()} #ProTip`,
      ]

      setSuggestions(mockSuggestions)
      setIsGenerating(false)
    }, 2000)
  }

  return (
    (<div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="topic">What would you like to post about?</Label>
          <Input
            id="topic"
            placeholder="e.g., Digital Marketing Trends, Leadership Skills"
            value={topic}
            onChange={(e) => setTopic(e.target.value)} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="content-type">Content Type</Label>
          <Select value={contentType} onValueChange={setContentType}>
            <SelectTrigger id="content-type">
              <SelectValue placeholder="Select content type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="thought-leadership">Thought Leadership</SelectItem>
              <SelectItem value="industry-news">Industry News</SelectItem>
              <SelectItem value="company-update">Company Update</SelectItem>
              <SelectItem value="personal-achievement">Personal Achievement</SelectItem>
              <SelectItem value="event-promotion">Event Promotion</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="tone">Content Tone</Label>
            <span className="text-xs text-muted-foreground">
              {tone < 33 ? "Professional" : tone < 66 ? "Balanced" : "Casual"}
            </span>
          </div>
          <Slider
            id="tone"
            min={0}
            max={100}
            step={1}
            value={[tone]}
            onValueChange={(value) => setTone(value[0])} />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Professional</span>
            <span>Casual</span>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="keywords">Keywords (comma separated)</Label>
          <Input
            id="keywords"
            placeholder="e.g., Marketing, Innovation, Leadership"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)} />
        </div>

        <Button
          className="w-full"
          onClick={generateSuggestions}
          disabled={isGenerating || !topic}>
          {isGenerating ? (
            <>Generating...</>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Generate Content Suggestions
            </>
          )}
        </Button>
      </div>
      {suggestions.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-medium">AI-Generated Suggestions</h3>
          <div className="grid gap-4">
            {suggestions.map((suggestion, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <p className="text-sm mb-4">{suggestion}</p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onSelectSuggestion(suggestion)}>
                    Use This Suggestion
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>)
  );
}

