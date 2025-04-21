import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ImageIcon, X } from "lucide-react";

export default function PinterestMediaUploader({
  postType,
  selectedMedia,
  isDragging,
  mediaInputRef,
  handleFileUpload,
  handleDragOver,
  handleDragLeave,
  handleDrop,
  removeMedia,
}) {
  return (
    <div className="space-y-4">
      <div
        className={cn(
          "border-2 border-dashed rounded-md p-6 transition-colors",
          isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/20",
          selectedMedia.length > 0 ? "p-2" : "p-6"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {selectedMedia.length > 0 ? (
          <div className={postType === "standard" ? "space-y-2" : "grid grid-cols-2 gap-2"}>
            {selectedMedia.map((media, index) => (
              <div key={index} className="relative">
                {media.file.type.startsWith("video/") ? (
                  <video
                    src={media.preview}
                    className="rounded-md w-full h-auto max-h-[150px] object-cover"
                    controls
                  />
                ) : (
                  <img
                    src={media.preview}
                    alt={`Media ${index + 1}`}
                    className="rounded-md w-full h-auto max-h-[150px] object-cover"
                  />
                )}
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 h-6 w-6 rounded-full"
                  onClick={() => removeMedia(index)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-2 text-center">
            <ImageIcon className="h-8 w-8 text-muted-foreground" />
            <div>
              <p className="font-medium">Drag and drop {postType === "standard" ? "image or video" : "images or videos"}</p>
              <p className="text-xs text-muted-foreground">
                or click to browse {postType === "standard" ? "(1 file)" : "(up to 20)"}
              </p>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => mediaInputRef.current?.click()}
            >
              Browse
            </Button>
            <input
              type="file"
              accept="image/*,video/*"
              multiple={postType === "idea"}
              className="hidden"
              ref={mediaInputRef}
              onChange={handleFileUpload}
            />
          </div>
        )}
      </div>
    </div>
  );
}