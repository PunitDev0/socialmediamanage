import { Controller } from "react-hook-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import MediaUploader from "./linkedinImageUpload";
import HashtagManager from "./linkedinHashtagManager";
import SchedulePicker from "./linkedinSchedulePicker";
import ActionButtons from "./linkedinActionButton";
import { PostTemplates } from "@/components/post-templates";
import { AIContentSuggestions } from "@/components/ai-content-suggestions";
import { RichTextEditor } from "@/components/rich-text-editor";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function PostEditor({
  control,
  handleSubmit,
  setValue,
  watch,
  errors,
  selectedImages,
  isDragging,
  fileInputRef,
  handleImageUpload,
  handleDragOver,
  handleDragLeave,
  handleDrop,
  removeImage,
  enableAutoHashtags,
  setEnableAutoHashtags,
  saveAsDraft,
  schedulePost,
  isSaving,
  isScheduling,
  saveSuccess,
}) {
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
            <form onSubmit={handleSubmit(schedulePost)} className="space-y-4">
              <div className="flex items-center gap-2">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/placeholder-user.jpg" alt="User" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">John Doe</p>
                  <p className="text-xs text-muted-foreground">Product Manager at Acme Inc.</p>
                </div>
              </div>

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

              <MediaUploader
                selectedImages={selectedImages}
                isDragging={isDragging}
                fileInputRef={fileInputRef}
                handleImageUpload={handleImageUpload}
                handleDragOver={handleDragOver}
                handleDragLeave={handleDragLeave}
                handleDrop={handleDrop}
                removeImage={removeImage}
              />

              <HashtagManager
                control={control}
                watch={watch}
                setValue={setValue}
                enableAutoHashtags={enableAutoHashtags}
                setEnableAutoHashtags={setEnableAutoHashtags}
              />

              <SchedulePicker control={control} watch={watch} errors={errors} />

              <ActionButtons
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
  );
}