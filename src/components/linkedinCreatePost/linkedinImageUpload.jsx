import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ImageIcon, Paperclip, X } from "lucide-react";
import { MediaGallery } from "@/components/media-gallery";

export default function MediaUploader({
  selectedImages,
  isDragging,
  fileInputRef,
  handleImageUpload,
  handleDragOver,
  handleDragLeave,
  handleDrop,
  removeImage,
}) {
  const [isMediaGalleryOpen, setIsMediaGalleryOpen] = useState(false);

  const selectFromGallery = (imageUrl) => {
    selectedImages((prev) => [...prev, { file: null, preview: imageUrl }]);
    setIsMediaGalleryOpen(false);
  };

  return (
    <>
      <div
        className={cn(
          "border-2 border-dashed rounded-md p-6 transition-colors ",
          isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/20",
          selectedImages.length > 0 ? "p-2" : "p-6"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {selectedImages.length > 0 ? (
          <div className="grid grid-cols-2 gap-2">
            {selectedImages.map((img, index) => (
              <div key={index} className="relative">
                <img
                  src={img.preview || "/placeholder.svg"}
                  alt={`Preview ${index + 1}`}
                  className="rounded-md w-full h-auto max-h-[150px] object-cover"
                />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 h-6 w-6 rounded-full bg-black"
                  onClick={() => removeImage(index)}
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
              <p className="font-medium">Drag and drop images</p>
              <p className="text-xs text-muted-foreground">or click to browse (up to 5)</p>
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
              accept="image/*"
              multiple
              className="hidden"
              ref={fileInputRef}
              onChange={handleImageUpload}
            />
          </div>
        )}
      </div>

      <Dialog open={isMediaGalleryOpen} onOpenChange={setIsMediaGalleryOpen}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>Media Gallery</DialogTitle>
            <DialogDescription>Select an image from your media gallery</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <MediaGallery onSelectImage={selectFromGallery} />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}