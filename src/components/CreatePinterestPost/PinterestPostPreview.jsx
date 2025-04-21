import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function PinterestPostPreview({ watch, selectedMedia }) {
  const postType = watch("postType");
  const title = watch("title");
  const description = watch("description");
  const content = watch("content");
  const board = watch("board");
  const link = watch("link");

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          <p className="text-sm font-medium">Pinterest Pin Preview</p>
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
              {postType === "standard" ? (
                <>
                  {selectedMedia[0] ? (
                    selectedMedia[0].file.type.startsWith("video/") ? (
                      <video
                        src={selectedMedia[0].preview}
                        className="rounded-md w-full h-auto max-h-[200px] object-cover"
                        controls
                      />
                    ) : (
                      <img
                        src={selectedMedia[0].preview}
                        alt="Pin"
                        className="rounded-md w-full h-auto max-h-[200px] object-cover"
                      />
                    )
                  ) : (
                    <div className="bg-gray-200 dark:bg-gray-700 rounded-md w-full h-[200px] flex items-center justify-center">
                      <p className="text-muted-foreground">No media</p>
                    </div>
                  )}
                  <p className="text-lg font-semibold">{title || "Your Pin title will appear here..."}</p>
                  <p className="text-sm whitespace-pre-wrap">
                    {description || "Your Pin description will appear here..."}
                  </p>
                  {board && (
                    <p className="text-sm text-muted-foreground">Board: {board}</p>
                  )}
                  {link && (
                    <p className="text-sm text-blue-500 truncate">{link}</p>
                  )}
                </>
              ) : (
                <>
                  {selectedMedia.length > 0 ? (
                    <div className="space-y-2">
                      {selectedMedia.map((media, index) => (
                        <div key={index} className="space-y-2">
                          {media.file.type.startsWith("video/") ? (
                            <video
                              src={media.preview}
                              className="rounded-md w-full h-auto max-h-[150px] object-cover"
                              controls
                            />
                          ) : (
                            <img
                              src={media.preview}
                              alt={`Page ${index + 1}`}
                              className="rounded-md w-full h-auto max-h-[150px] object-cover"
                            />
                          )}
                          <p className="text-sm whitespace-pre-wrap">
                            {content[index]?.text || `Text for page ${index + 1} will appear here...`}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-gray-200 dark:bg-gray-700 rounded-md w-full h-[200px] flex items-center justify-center">
                      <p className="text-muted-foreground">No media</p>
                    </div>
                  )}
                  {link && (
                    <p className="text-sm text-blue-500 truncate">{link}</p>
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