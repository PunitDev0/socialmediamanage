import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export default function InstagramPostPreview({ watch, selectedMedia, postType }) {
  const hashtags = watch("hashtags");
  const caption = watch("caption");

  const getAspectRatioClass = () => {
    return postType === "reels" ? "aspect-[9/16] max-h-[400px]" : "aspect-square max-h-[200px]";
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          <p className="text-sm font-medium">Instagram Preview</p>
          <div className="rounded-md border p-4 bg-white dark:bg-gray-900">
            <div className="flex items-center gap-2 mb-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src="/placeholder-user.jpg" alt="User" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">johndoe</p>
                <p className="text-xs text-muted-foreground">Apki Instagram Profile</p>
              </div>
            </div>
            {selectedMedia.length > 0 && (
              <div className={cn("relative", postType === "feed" ? "grid grid-cols-1 gap-2" : "")}>
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
                    {postType === "feed" && selectedMedia.length > 1 && (
                      <div className="absolute top-2 right-2 bg-white rounded-full p-1 text-xs font-semibold">
                        {index + 1}/{selectedMedia.length}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
            <div className="space-y-3 mt-3">
              <p className="text-sm whitespace-pre-wrap">
                {caption || "Yahan caption dikhega..."}
              </p>
              {hashtags.length > 0 && (
                <p className="text-sm text-blue-500">{hashtags.map((tag) => `#${tag}`).join(" ")}</p>
              )}
            </div>
            <div className="mt-4 flex items-center gap-4 text-muted-foreground">
              <button className="flex items-center gap-1 text-xs">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
                Like
              </button>
              <button className="flex items-center gap-1 text-xs">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
                Comment
              </button>
              <button className="flex items-center gap-1 text-xs">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 2l-7 20-4-9-9-4z" />
                  <path d="M22 2l-11 11" />
                </svg>
                Share
              </button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}