import { Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

export default function YouTubeTagManager({ control, watch, setValue }) {
  const tags = watch("tags");
  const newTag = watch("newTag");

  const addTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setValue("tags", [...tags, newTag]);
      setValue("newTag", "");
    }
  };

  const removeTag = (tag) => {
    setValue("tags", tags.filter((t) => t !== tag));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium">Tags</p>
      <div className="flex flex-wrap gap-2 mb-2">
        {tags.map((tag, index) => (
          <Badge key={index} variant="secondary" className="px-3 py-1">
            {tag}
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-4 w-4 p-0 ml-2"
              onClick={() => removeTag(tag)}
            >
              <X className="h-3 w-3" />
            </Button>
          </Badge>
        ))}
      </div>
      <div className="flex gap-2">
        <Controller
          name="newTag"
          control={control}
          render={({ field }) => (
            <Input
              placeholder="Add tag"
              {...field}
              onKeyDown={handleKeyDown}
            />
          )}
        />
        <Button type="button" onClick={addTag} size="sm">
          Add
        </Button>
      </div>
    </div>
  );
}