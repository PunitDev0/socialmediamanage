import { Controller } from "react-hook-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import YouTubeMediaUploader from "./YouTubeMediaUploader";
import YouTubeTagManager from "./YouTubeTagManager";
import YouTubeSchedulePicker from "./YouTubeSchedulePicker";
import YouTubeActionButtons from "./YouTubeActionButtons";
import { PostTemplates } from "@/components/post-templates";
import { AIContentSuggestions } from "@/components/ai-content-suggestions";
import { RichTextEditor } from "@/components/rich-text-editor";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function YouTubePostEditor({
  control,
  handleSubmit,
  setValue,
  watch,
  errors,
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
  saveAsDraft,
  submitPost,
  isSaving,
  isPosting,
  saveSuccess,
}) {
  const postType = watch("postType");

  return (
    <Tabs defaultValue="editor" className="w-full">
      <TabsList className="w-full grid grid-cols-3">
        <TabsTrigger value="editor">Editor</TabsTrigger>
        <TabsTrigger value="templates">Templates</TabsTrigger>
        <TabsTrigger value="ai">AI Assistant</TabsTrigger>
      </TabsList>
      <TabsContent value="editor" className="space-y-4 mt-4">
        <Card>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit(submitPost)} className="space-y-4">
              <div className="flex items-center gap-2">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/placeholder-user.jpg" alt="User" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">John Doe</p>
                  <p className="text-xs text-muted-foreground">Content Creator</p>
                </div>
              </div>

              <div>
                <Controller
                  name="postType"
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={(value) => {
                      field.onChange(value);
                      // Reset fields when switching post type
                      setValue("title", "");
                      setValue("description", "");
                      setValue("content", "");
                      setValue("tags", []);
                      setValue("category", "");
                      setSelectedVideo(null);
                      setSelectedThumbnail(null);
                      setSelectedImages([]);
                    }}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select post type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="video">Video Post</SelectItem>
                        <SelectItem value="community">Community Post</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              {postType === "video" ? (
                <>
                  <div>
                    <Controller
                      name="title"
                      control={control}
                      rules={{ required: "Title is required" }}
                      render={({ field }) => (
                        <Input
                          placeholder="Video title"
                          {...field}
                        />
                      )}
                    />
                    {errors.title && (
                      <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>
                    )}
                  </div>

                  <div>
                    <Controller
                      name="description"
                      control={control}
                      rules={{ required: "Description is required" }}
                      render={({ field }) => (
                        <RichTextEditor
                          value={field.value}
                          onChange={field.onChange}
                          placeholder="Video description"
                        />
                      )}
                    />
                    {errors.description && (
                      <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>
                    )}
                  </div>
                </>
              ) : (
                <div>
                  <Controller
                    name="content"
                    control={control}
                    rules={{ required: "Content is required" }}
                    render={({ field }) => (
                      <RichTextEditor
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="What do you want to share?"
                      />
                    )}
                  />
                  {errors.content && (
                    <p className="text-red-500 text-xs mt-1">{errors.content.message}</p>
                  )}
                </div>
              )}

              <YouTubeMediaUploader
                postType={postType}
                selectedVideo={selectedVideo}
                selectedThumbnail={selectedThumbnail}
                selectedImages={selectedImages}
                isDragging={isDragging}
                videoInputRef={videoInputRef}
                thumbnailInputRef={thumbnailInputRef}
                imageInputRef={imageInputRef}
                handleFileUpload={handleFileUpload}
                handleDragOver={handleDragOver}
                handleDragLeave={handleDragLeave}
                handleDrop={handleDrop}
                removeFile={removeFile}
              />

              {postType === "video" && (
                <YouTubeTagManager
                  control={control}
                  watch={watch}
                  setValue={setValue}
                />
              )}

              <YouTubeSchedulePicker control={control} watch={watch} errors={errors} />

              <YouTubeActionButtons
                handleSubmit={handleSubmit}
                saveAsDraft={saveAsDraft}
                isSaving={isSaving}
                isPosting={isPosting}
                saveSuccess={saveSuccess}
                isScheduled={watch("isScheduled")}
              />
            </form>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="templates" className="space-y-4 mt-4">
        <Card>
          <CardContent className="p-6">
            <PostTemplates onSelectTemplate={(template) => setValue(postType === "video" ? "description" : "content", template)} />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="ai" className="space-y-4 mt-4">
        <Card>
          <CardContent className="p-6">
            <AIContentSuggestions onSelectSuggestion={(suggestion) => setValue(postType === "video" ? "description" : "content", suggestion)} />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}