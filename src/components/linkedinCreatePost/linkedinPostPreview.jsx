import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function PostPreview({ watch, selectedImages }) {
  const hashtags = watch("hashtags");
  const content = watch("content");

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          <p className="text-sm font-medium">LinkedIn Post Preview</p>
          <div className="rounded-md border p-4 bg-white dark:bg-gray-900">
            <div className="flex items-center gap-2 mb-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src="/placeholder-user.jpg" alt="User" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">John Doe</p>
                <p className="text-xs text-muted-foreground">Product Manager at Acme Inc.</p>
              </div>
            </div>
            <div className="space-y-3">
              <p className="text-sm whitespace-pre-wrap">
                {content || "Your post content will appear here..."}
              </p>
              {hashtags.length > 0 && (
                <p className="text-sm text-blue-500">{hashtags.map((tag) => `#${tag}`).join(" ")}</p>
              )}
              {selectedImages.length > 0 && (
                <div className="grid grid-cols-2 gap-2">
                  {selectedImages.map((img, index) => (
                    <img
                      key={index}
                      src={img.preview || "/placeholder.svg"}
                      alt={`Preview ${index + 1}`}
                      className="rounded-md w-full h-auto max-h-[150px] object-cover"
                    />
                  ))}
                </div>
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
                  <path d="M7 10v12" />
                  <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
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
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
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
                  <path d="m17 2 4 4-4 4" />
                  <path d="M3 11v-1a4 4 0 0 1 4-4h14" />
                  <path d="m7 22-4-4 4-4" />
                  <path d="M21 13v1a4 4 0 0 1-4 4H3" />
                </svg>
                Repost
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
                  <path d="m22 2-7 20-4-9-9-4Z" />
                  <path d="M22 2 11 13" />
                </svg>
                Send
              </button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}