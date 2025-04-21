import { Controller } from "react-hook-form";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Youtube } from "lucide-react";

export default function YouTubePostSettings({ control, watch }) {
  const postType = watch("postType");
  const youtubeCategories = [
    "Entertainment",
    "Education",
    "Music",
    "Gaming",
    "News",
    "Sports",
    "Technology",
    "Travel",
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Post Settings</CardTitle>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Youtube className="h-4 w-4" />
                <span className="text-sm">YouTube</span>
              </div>
              <Controller
                name="visibility"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Visibility" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public</SelectItem>
                      <SelectItem value="unlisted">Unlisted</SelectItem>
                      <SelectItem value="private">Private</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            {postType === "video" && (
              <div className="flex items-center justify-between">
                <Label htmlFor="category" className="text-sm">
                  Category
                </Label>
                <Controller
                  name="category"
                  control={control}
                  rules={{ required: "Category is required" }}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {youtubeCategories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            )}

            <div className="flex items-center justify-between">
              <Label htmlFor="notify" className="text-sm">
                Notify subscribers
              </Label>
              <Switch id="notify" defaultChecked />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}