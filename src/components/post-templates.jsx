"use client";
import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function PostTemplates({
  onSelectTemplate
}) {
  const [searchQuery, setSearchQuery] = useState("")

  // Mock template data
  const templates = [
    {
      id: 1,
      title: "Product Launch",
      description: "Announce a new product or feature",
      content:
        "Excited to announce our new product launch! After months of hard work, we're finally ready to share it with the world. #ProductLaunch #Innovation",
      category: "marketing",
    },
    {
      id: 2,
      title: "Event Promotion",
      description: "Promote an upcoming event",
      content:
        "Join us for a webinar on [Topic] on [Date] at [Time]. We'll be discussing [Brief Description]. Register now at the link in bio! #Webinar #Event",
      category: "events",
    },
    {
      id: 3,
      title: "Job Opening",
      description: "Announce a job opening",
      content:
        "We're hiring! Looking for a talented [Position] to join our growing team. Check out our careers page for more information. #Hiring #JobOpportunity",
      category: "recruiting",
    },
    {
      id: 4,
      title: "Industry Insight",
      description: "Share industry knowledge",
      content:
        "Here's my take on [Industry Trend]: [Your Insight]. What are your thoughts on this? #IndustryInsights #ThoughtLeadership",
      category: "thought-leadership",
    },
    {
      id: 5,
      title: "Customer Success Story",
      description: "Share a customer success story",
      content:
        "Thrilled to share how [Customer Name] achieved [Result] using our [Product/Service]. Read the full case study at the link in bio. #CustomerSuccess #CaseStudy",
      category: "marketing",
    },
    {
      id: 6,
      title: "Team Spotlight",
      description: "Highlight team members",
      content:
        "Meet [Name], our amazing [Position]. [He/She/They] has been with us for [Time Period] and specializes in [Specialty]. #TeamSpotlight #MeetTheTeam",
      category: "company-culture",
    },
  ]

  // Filter templates based on search query
  const filteredTemplates = templates.filter((template) =>
    template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    template.category.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    (<div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search templates..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} />
      </div>
      {filteredTemplates.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No templates found</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredTemplates.map((template) => (
            <Card key={template.id}>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{template.title}</CardTitle>
                <CardDescription>{template.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4 line-clamp-2">{template.content}</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onSelectTemplate(template.content)}>
                  Use Template
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>)
  );
}

