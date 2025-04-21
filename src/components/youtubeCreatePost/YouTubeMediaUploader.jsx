import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Video, ImageIcon, X } from "lucide-react";

export default function YouTubeMediaUploader({
  postType,
  selectedVideo,
  selectedThumbnail,
  selectedImages,
  isDragging,
  videoInputRef,
  thumbnailInputRef,
  imageInputRef,
  handleFileUpload,
  handleDragOver,
  handleDragLeave,
  handleDrop,
  removeFile,
}) {
  return (
    <div className="space-y-4">
      {postType === "video" ? (
        <>
          <div
            className={cn(
              "border-2 border-dashed rounded-md p-6 transition-colors",
              isDragging.video ? "border-primary bg-primary/5" : "border-muted-foreground/20"
            )}
            onDragOver={(e) => handleDragOver(e, "video")}
            onDragLeave={() => handleDragLeave("video")}
            onDrop={(e) => handleDrop(e, "video")}
          >
            {selectedVideo ? (
              <div className="relative">
                <video
                  src={selectedVideo.preview}
                  className="rounded-md w-full h-auto max-h-[150px] object-cover"
                  controls
                />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 h-6 w-6 rounded-full"
                  onClick={() => removeFile("video")}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-2 text-center">
                <Video className="h-8 w-8 text-muted-foreground" />
                <div>
                  <p className="font-medium">Drag and drop video</p>
                  <p className="text-xs text-muted-foreground">or click to browse</p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => videoInputRef.current?.click()}
                >
                  Browse
                </Button>
                <input
                  type="file"
                  accept="video/*"
                  className="hidden"
                  ref={videoInputRef}
                  onChange={(e) => handleFileUpload(e, "video")}
                />
              </div>
            )}
          </div>

          <div
            className={cn(
              "border-2 border-dashed rounded-md p-6 transition-colors",
              isDragging.thumbnail ? "border-primary bg-primary/5" : "border-muted-foreground/20"
            )}
            onDragOver={(e) => handleDragOver(e, "thumbnail")}
            onDragLeave={() => handleDragLeave("thumbnail")}
            onDrop={(e) => handleDrop(e, "thumbnail")}
          >
            {selectedThumbnail ? (
              <div className="relative">
                <img
                  src={selectedThumbnail.preview}
                  alt="Thumbnail"
                  className="rounded-md w-full h-auto max-h-[150px] object-cover"
                />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 h-6 w-6 rounded-full"
                  onClick={() => removeFile("thumbnail")}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-2 text-center">
                <ImageIcon className="h-8 w-8 text-muted-foreground" />
                <div>
                  <p className="font-medium">Drag and drop thumbnail</p>
                  <p className="text-xs text-muted-foreground">or click to browse</p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => thumbnailInputRef.current?.click()}
                >
                  Browse
                </Button>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={thumbnailInputRef}
                  onChange={(e) => handleFileUpload(e, "thumbnail")}
                />
              </div>
            )}
          </div>
        </>
      ) : (
        <div
          className={cn(
            "border-2 border-dashed rounded-md p-6 transition-colors",
            isDragging.images ? "border-primary bg-primary/5" : "border-muted-foreground/20",
            selectedImages.length > 0 ? "p-2" : "p-6"
          )}
          onDragOver={(e) => handleDragOver(e, "images")}
          onDragLeave={() => handleDragLeave("images")}
          onDrop={(e) => handleDrop(e, "images")}
        >
          {selectedImages.length > 0 ? (
            <div className="grid grid-cols-2 gap-2">
              {selectedImages.map((img, index) => (
                <div key={index} className="relative">
                  <img
                    src={img.preview}
                    alt={`Image ${index + 1}`}
                    className="rounded-md w-full h-auto max-h-[150px] object-cover"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 h-6 w-6 rounded-full"
                    onClick={() => removeFile("images", index)}
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
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => imageInputRef.current?.click()}
              >
                Browse
              </Button>
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                ref={imageInputRef}
                onChange={(e) => handleFileUpload(e, "images")}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}