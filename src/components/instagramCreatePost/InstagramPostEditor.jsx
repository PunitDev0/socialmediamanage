import { Controller } from "react-hook-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import InstagramMediaUploader from "./InstagramMediaUploader";
import InstagramHashtagManager from "./InstagramHashtagManager";
import InstagramSchedulePicker from "./InstagramSchedulePicker";
import InstagramActionButtons from "./InstagramActionButtons";
import { PostTemplates } from "@/components/post-templates";
import { AIContentSuggestions } from "@/components/ai-content-suggestions";
import { RichTextEditor } from "@/components/rich-text-editor";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function InstagramPostEditor({
  control,
  handleSubmit,
  setValue,
  watch,
  errors,
  selectedMedia,
  isDragging,
  fileInputRef,
  handleMediaUpload,
  handleDragOver,
  handleDragLeave,
  handleDrop,
  removeMedia,
  enableAutoHashtags,
  setEnableAutoHashtags,
  saveAsDraft,
  schedulePost,
  isSaving,
  isScheduling,
  saveSuccess,
  postType,
  setPostType,
}) {
  return (
    <div className="space-y-4">
      <Select value={postType} onValueChange={(value) => {
        setPostType(value);
        setSelectedMedia([]); // Clear media when switching post type
      }}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Post type chunein" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="feed">Feed Post</SelectItem>
          <SelectItem value="reels">Reels</SelectItem>
        </SelectContent>
      </Select>
      <Tabs defaultValue="editor" className="w-full">
        <TabsList className="w-full grid grid-cols-3">
          <TabsTrigger value="editor">Editor</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="ai">AI Sahayta</TabsTrigger>
        </TabsList>
        <TabsContent value="editor" className="space-y-4 mt-4">
          <Card>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit(schedulePost)} className="space-y-4">
                <div className="flex items-center gap-2">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/placeholder-user.jpg" alt="User" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">johndoe</p>
                    <p className="text-xs text-muted-foreground">Apki Instagram Profile</p>
                  </div>
                </div>

                <div>
                  <Controller
                    name="caption"
                    control={control}
                    rules={{ required: "Caption zaroori hai" }}
                    render={({ field }) => (
                      <RichTextEditor
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Apna caption likhein..."
                      />
                    )}
                  />
                  {errors.caption && (
                    <p className="text-red-500 text-xs mt-1">{errors.caption.message}</p>
                  )}
                </div>

                <InstagramMediaUploader
                  selectedMedia={selectedMedia}
                  isDragging={isDragging}
                  fileInputRef={fileInputRef}
                  handleMediaUpload={handleMediaUpload}
                  handleDragOver={handleDragOver}
                  handleDragLeave={handleDragLeave}
                  handleDrop={handleDrop}
                  removeMedia={removeMedia}
                  postType={postType}
                />

                <InstagramHashtagManager
                  control={control}
                  watch={watch}
                  setValue={setValue}
                  enableAutoHashtags={enableAutoHashtags}
                  setEnableAutoHashtags={setEnableAutoHashtags}
                />

                <InstagramSchedulePicker control={control} watch={watch} errors={errors} />

                <InstagramActionButtons
                  handleSubmit={handleSubmit}
                  saveAsDraft={saveAsDraft}
                  isSaving={isSaving}
                  isScheduling={isScheduling}
                  saveSuccess={saveSuccess}
                />
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="templates" className="space-y-4 mt-4">
          <Card>
            <CardContent className="p-6">
              <PostTemplates onSelectTemplate={(template) => setValue("caption", template)} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="ai" className="space-y-4 mt-4">
          <Card>
            <CardContent className="p-6">
              <AIContentSuggestions onSelectSuggestion={(suggestion) => setValue("caption", suggestion)} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}