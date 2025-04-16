import { Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Hash, Sparkles, X } from "lucide-react";
import { cn } from "@/lib/utils";

export default function FacebookHashtagManager({
  control,
  watch,
  setValue,
  enableAutoHashtags,
  setEnableAutoHashtags,
}) {
  const hashtags = watch("hashtags");
  const newHashtag = watch("newHashtag");

  const suggestedHashtags = [
    "FacebookLive",
    "Community",
    "Inspiration",
    "LifeMoments",
    "Connect",
    "Motivation",
    "TravelDiaries",
    "Foodie",
  ];

  const addHashtag = () => {
    if (newHashtag && !hashtags.includes(newHashtag)) {
      setValue("hashtags", [...hashtags, newHashtag]);
      setValue("newHashtag", "");
    }
  };

  const removeHashtag = (tag) => {
    setValue("hashtags", hashtags.filter((t) => t !== tag));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addHashtag();
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium">Hashtags</p>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => setEnableAutoHashtags(!enableAutoHashtags)}
              >
                <Sparkles
                  className={cn(
                    "h-4 w-4",
                    enableAutoHashtags ? "text-purple-500" : "text-muted-foreground"
                  )}
                />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{enableAutoHashtags ? "Band karein" : "Chalu karein"} auto hashtag suggestions</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="flex flex-wrap gap-2 mb-2">
        {hashtags.map((tag, index) => (
          <Badge key={index} variant="secondary" className="px-3 py-1">
            #{tag}
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-4 w-4 p-0 ml-2"
              onClick={() => removeHashtag(tag)}
            >
              <X className="h-3 w-3" />
            </Button>
          </Badge>
        ))}
      </div>
      <div className="flex gap-2">
        <Controller
          name="newHashtag"
          control={control}
          render={({ field }) => (
            <Input
              placeholder="Hashtag daalein"
              {...field}
              onKeyDown={handleKeyDown}
            />
          )}
        />
        <Button type="button" onClick={addHashtag} size="sm">
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
                    setValue("hashtags", [...hashtags, tag]);
                  }
                }}
              >
                #{tag}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}