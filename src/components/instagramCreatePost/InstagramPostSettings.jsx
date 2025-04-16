import { Controller } from "react-hook-form";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sparkles, ImageIcon } from "lucide-react";

export default function InstagramPostSettings({
  control,
  watch,
  setValue,
  enableAutoHashtags,
  setEnableAutoHashtags,
  postType,
}) {
  const coverImageRef = watch("coverImage");

  const handleCoverImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setValue("coverImage", file);
    }
  };

  return (
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
              <Label htmlFor="location" className="text-sm">
                Location Tag
              </Label>
              <Controller
                name="location"
                control={control}
                render={({ field }) => (
                  <Input
                    id="location"
                    placeholder="Location daalein"
                    className="w-[140px]"
                    {...field}
                  />
                )}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="disable-comments" className="text-sm">
                Comments Band Karein
              </Label>
              <Controller
                name="disableComments"
                control={control}
                render={({ field }) => (
                  <Switch
                    id="disable-comments"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="auto-hashtags" className="text-sm">
                Auto Hashtag Suggestions
              </Label>
              <Switch
                id="auto-hashtags"
                checked={enableAutoHashtags}
                onCheckedChange={setEnableAutoHashtags}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="alt-text" className="text-sm">
                Alt Text (Accessibility ke liye)
              </Label>
              <Controller
                name="altText"
                control={control}
                render={({ field }) => (
                  <Input
                    id="alt-text"
                    placeholder="Media ka varnan karein"
                    {...field}
                  />
                )}
              />
            </div>

            {postType === "reels" && (
              <div className="space-y-2">
                <Label htmlFor="cover-image" className="text-sm">
                  Reels Cover Image
                </Label>
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => document.getElementById("cover-image")?.click()}
                  >
                    <ImageIcon className="mr-2 h-4 w-4" />
                    {coverImageRef ? "Change Cover" : "Upload Cover"}
                  </Button>
                  {coverImageRef && (
                    <span className="text-xs text-muted-foreground">{coverImageRef.name}</span>
                  )}
                  <input
                    id="cover-image"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleCoverImageUpload}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="pt-2">
            <Button type="button" variant="outline" className="w-full">
              <Sparkles className="mr-2 h-4 w-4" />
              AI Content Suggestions
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}