import { Controller } from "react-hook-form";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Linkedin, Sparkles } from "lucide-react";

export default function PostSettings({
  control,
  watch,
  enableAutoHashtags,
  setEnableAutoHashtags,
}) {
  return (
    <Card className={'bg-white/95 backdrop-blur-lg supports-[backdrop-filter]:bg-white/60 shadow-xl border-none'}>
      <CardHeader>
        <CardTitle className="text-lg">Post Settings</CardTitle>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="tone">Content Tone</Label>
              <span className="text-xs text-muted-foreground">
                {watch("postTone") < 33 ? "Professional" : watch("postTone") < 66 ? "Balanced" : "Casual"}
              </span>
            </div>
            <Controller
              name="postTone"
              control={control}
              render={({ field }) => (
                <Slider
                  id="tone"
                  min={0}
                  max={100}
                  step={1}
                  value={[field.value]}
                  onValueChange={(value) => field.onChange(value[0])}
                  className="w-full"
                />
              )}
            />
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
                      <SelectItem value="connections">Connections</SelectItem>
                      <SelectItem value="private">Private</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="auto-hashtags" className="text-sm">
                Auto-suggest hashtags
              </Label>
              <Switch
                id="auto-hashtags"
                checked={enableAutoHashtags}
                onCheckedChange={setEnableAutoHashtags}
              />
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
            <Button type="button" variant="outline" className="w-full">
              <Sparkles className="mr-2 h-4 w-4" />
              Get AI Content Suggestions
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}