import { Controller } from "react-hook-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import FacebookMediaUploader from "./FacebookMediaUploader";
import FacebookHashtagManager from "./FacebookHashtagManager";
import FacebookSchedulePicker from "./FacebookSchedulePicker";
import FacebookActionButtons from "./FacebookActionButtons";
import { PostTemplates } from "@/components/post-templates";
import { AIContentSuggestions } from "@/components/ai-content-suggestions";
import { RichTextEditor } from "@/components/rich-text-editor";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function FacebookPostEditor({
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
                    <p className="text-sm font-medium">John Doe</p>
                    <p className="text-xs text-muted-foreground">Apki Facebook Profile</p>
                  </div>
                </div>

                <div>
                  <Controller
                    name="content"
                    control={control}
                    render={({ field }) => (
                      <RichTextEditor
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Aap kya soch rahe hain?"
                      />
                    )}
                  />
                </div>

                <FacebookMediaUploader
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

                <FacebookHashtagManager
                  control={control}
                  watch={watch}
                  setValue={setValue}
                  enableAutoHashtags={enableAutoHashtags}
                  setEnableAutoHashtags={setEnableAutoHashtags}
                />

                <FacebookSchedulePicker control={control} watch={watch} errors={errors} />

                <FacebookActionButtons
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
              <PostTemplates onSelectTemplate={(template) => setValue("content", template)} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="ai" className="space-y-4 mt-4">
          <Card>
            <CardContent className="p-6">
              <AIContentSuggestions onSelectSuggestion={(suggestion) => setValue("content", suggestion)} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}