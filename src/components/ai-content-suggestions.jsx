"use client";
import { useState, useCallback } from "react";
import { Sparkles, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";

export function AIContentSuggestions({ onSelectSuggestion }) {
  const [topic, setTopic] = useState("");
  const [contentType, setContentType] = useState("thought-leadership");
  const [tone, setTone] = useState(50); // 0-100 scale: professional to casual
  const [keywords, setKeywords] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState(null);

  const generateSuggestions = useCallback(async () => {
    if (!topic.trim()) {
      toast.error("Please enter a topic.", {
        description: "A topic is required to generate suggestions.",
      });
      return;
    }

    setIsGenerating(true);
    setError(null);
    setSuggestions([]);

    try {
      console.log('Sending API request:', { topic, contentType, tone, keywords });
      const response = await fetch("http://localhost:5000/api/ai/suggestions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, contentType, tone, keywords }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('API response:', data);

      if (!data.success) {
        throw new Error(data.error || "Failed to generate suggestions");
      }

      if (!Array.isArray(data.suggestions) || data.suggestions.length === 0) {
        throw new Error("No suggestions received from server");
      }

      // Validate suggestions
      const validSuggestions = data.suggestions
        .map((s, index) => {
          if (!s || typeof s.text !== 'string' || s.text.trim().length === 0) {
            console.warn(`Invalid suggestion at index ${index}:`, s);
            return null;
          }
          return {
            ...s,
            id: s.id !== undefined ? s.id : index,
            text: s.text.trim(),
          };
        })
        .filter(s => s !== null);

      if (validSuggestions.length === 0) {
        throw new Error("All suggestions were invalid or empty");
      }

      // Check for repetitive or invalid suggestions
      const uniqueSuggestions = [...new Set(validSuggestions.map(s => s.text))];
      if (uniqueSuggestions.length < validSuggestions.length || validSuggestions.some(s => s.text.includes('Topic:'))) {
        toast.warning("Some suggestions may be repetitive or incomplete.", {
          description: "Please try again or adjust the topic/keywords.",
        });
      }

      setSuggestions(validSuggestions);
      toast.success("Suggestions generated successfully!", {
        description: `${validSuggestions.length} AI-generated posts ready to review.`,
      });
    } catch (err) {
      console.error('Error fetching suggestions:', err);
      setError(err.message);
      toast.error("Failed to fetch suggestions", {
        description: err.message || "An error occurred while contacting the server.",
      });
    } finally {
      setIsGenerating(false);
    }
  }, [topic, contentType, tone, keywords]);

  const handleCopySuggestion = (suggestion) => {
    navigator.clipboard.write(suggestion.text).then(() => {
      toast.success("Suggestion copied!", {
        description: "The suggestion has been copied to your clipboard.",
      });
    }).catch((err) => {
      console.error('Copy error:', err);
      toast.error("Failed to copy suggestion", {
        description: "Could not copy to clipboard. Please try again.",
      });
    });
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto ">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="topic">What would you like to post about?</Label>
          <Input
            id="topic"
            placeholder="e.g., Digital Marketing Trends, Leadership Skills"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            disabled={isGenerating}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="content-type">Content Type</Label>
          <Select value={contentType} onValueChange={setContentType} disabled={isGenerating}>
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
            onValueChange={(value) => setTone(value[0])}
            disabled={isGenerating}
          />
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
            onChange={(e) => setKeywords(e.target.value)}
            disabled={isGenerating}
          />
        </div>

        <Button
          className="w-full"
          onClick={generateSuggestions}
          disabled={isGenerating || !topic.trim()}
        >
          {isGenerating ? (
            <span>Generating...</span>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Generate Content Suggestions
            </>
          )}
        </Button>

        {error && (
          <div className="text-red-500 text-sm text-center">{error}</div>
        )}
      </div>

      {suggestions.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-medium text-lg">AI-Generated Suggestions</h3>
          <div className="grid gap-4">
            {suggestions.map((suggestion) => (
              <Card key={suggestion.id}>
                <CardContent className="p-4">
                  <p className="text-sm mb-2">{suggestion.text}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">
                      {suggestion.text.length}/280 characters
                    </span>
                    <div className="space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleCopySuggestion(suggestion)}
                      >
                        <Copy className="mr-2 h-4 w-4" />
                        Copy
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onSelectSuggestion(suggestion.text)}
                      >
                        Use This
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}