import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ImageIcon, Paperclip, X } from "lucide-react";
import { MediaGallery } from "@/components/media-gallery";

export default function FacebookMediaUploader({
  selectedMedia,
  isDragging,
  fileInputRef,
  handleMediaUpload,
  handleDragOver,
  handleDragLeave,
  handleDrop,
  removeMedia,
  postType,
}) {
  const [isMediaGalleryOpen, setIsMediaGalleryOpen] = useState(false);

  const selectFromGallery = (mediaUrl) => {
    setSelectedMedia((prev) => [...prev, { file: null, preview: mediaUrl }]);
    setIsMediaGalleryOpen(false);
  };

  const getAspectRatioClass = () => {
    return postType === "reels" ? "aspect-[9/16] max-h-[300px]" : "aspect-square max-h-[150px]";
  };

  return (
    <>
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
          <div className={cn("grid gap-2", postType === "feed" ? "grid-cols-2" : "grid-cols-1")}>
            {selectedMedia.map((media, index) => (
              <div key={index} className="relative">
                {media.file?.type.startsWith("video/") ? (
                  <video
                    src={media.preview || "/placeholder.svg"}
                    className={cn("rounded-md w-full h-auto object-cover", getAspectRatioClass())}
                    controls
                  />
                ) : (
                  <img
                    src={media.preview || "/placeholder.svg"}
                    alt={`Preview ${index + 1}`}
                    className={cn("rounded-md w-full h-auto object-cover", getAspectRatioClass())}
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
              <p className="font-medium">Media drag aur drop karein</p>
              <p className="text-xs text-muted-foreground">
                {postType === "feed"
                  ? "Photos ya videos (10 tak)"
                  : "Ek video (9:16 recommended)"}
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
              >
                <Paperclip className="mr-2 h-4 w-4" />
                Browse
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setIsMediaGalleryOpen(true)}
              >
                <ImageIcon className="mr-2 h-4 w-4" />
                Gallery
              </Button>
            </div>
            <input
              type="file"
              accept={postType === "feed" ? "image/*,video/*" : "video/*"}
              multiple={postType === "feed"}
              className="hidden"
              ref={fileInputRef}
              onChange={handleMediaUpload}
            />
          </div>
        )}
      </div>

      <Dialog open={isMediaGalleryOpen} onOpenChange={setIsMediaGalleryOpen}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>Media Gallery</DialogTitle>
            <DialogDescription>Apni gallery se media chunein</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <MediaGallery onSelectImage={selectFromGallery} />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}