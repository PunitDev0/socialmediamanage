import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function YouTubePostPreview({ watch, selectedThumbnail, selectedImages }) {
  const postType = watch("postType");
  const title = watch("title");
  const description = watch("description");
  const content = watch("content");
  const tags = watch("tags");

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          <p className="text-sm font-medium">YouTube Post Preview</p>
          <div className="rounded-md border p-4 bg-white dark:bg-gray-900">
            <div className="flex items-center gap-2 mb-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src="/placeholder-user.jpg" alt="User" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">John Doe</p>
                <p className="text-xs text-muted-foreground">Content Creator</p>
              </div>
            </div>
            <div className="space-y-3">
              {postType === "video" ? (
                <>
                  {selectedThumbnail ? (
                    <img
                      src={selectedThumbnail.preview}
                      alt="Thumbnail"
                      className="rounded-md w-full h-auto max-h-[200px] object-cover"
                    />
                  ) : (
                    <div className="bg-gray-200 dark:bg-gray-700 rounded-md w-full h-[200px] flex items-center justify-center">
                      <p className="text-muted-foreground">No thumbnail</p>
                    </div>
                  )}
                  <p className="text-lg font-semibold">{title || "Your video title will appear here..."}</p>
                  <p className="text-sm whitespace-pre-wrap">
                    {description || "Your video description will appear here..."}
                  </p>
                  {tags.length > 0 && (
                    <p className="text-sm text-blue-500">{tags.join(", ")}</p>
                  )}
                </>
              ) : (
                <>
                  <p className="text-sm whitespace-pre-wrap">
                    {content || "Your post content will appear here..."}
                  </p>
                  {selectedImages.length > 0 && (
                    <div className="grid grid-cols-2 gap-2">
                      {selectedImages.map((img, index) => (
                        <img
                          key={index}
                          src={img.preview}
                          alt={`Image ${index + 1}`}
                          className="rounded-md w-full h-auto max-h-[150px] object-cover"
                        />
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}