import { Controller } from "react-hook-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import PinterestMediaUploader from "./PinterestMediaUploader.jsx";
import PinterestSchedulePicker from "./PinterestSchedulePicker.jsx";
import PinterestActionButtons from "./PinterestActionButtons";
import { PostTemplates } from "@/components/post-templates";
import { AIContentSuggestions } from "@/components/ai-content-suggestions";
import { RichTextEditor } from "@/components/rich-text-editor";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function PinterestPostEditor({
  control,
  handleSubmit,
  setValue,
  watch,
  errors,
  selectedMedia,
  isDragging,
  mediaInputRef,
  handleFileUpload,
  handleDragOver,
  handleDragLeave,
  handleDrop,
  removeMedia,
  updateContentText,
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
                      setValue("title", "");
                      setValue("description", "");
                      setValue("content", []);
                      setValue("link", "");
                      setValue("board", "");
                      setSelectedMedia([]);
                    }}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select Pin type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">Standard Pin</SelectItem>
                        <SelectItem value="idea">Idea Pin</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              {postType === "standard" ? (
                <>
                  <div>
                    <Controller
                      name="title"
                      control={control}
                      rules={{ required: "Title is required" }}
                      render={({ field }) => (
                        <Input
                          placeholder="Pin title"
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
                      render={({ field }) => (
                        <RichTextEditor
                          value={field.value}
                          onChange={field.onChange}
                          placeholder="Pin description"
                        />
                      )}
                    />
                  </div>

                  <div>
                    <Controller
                      name="link"
                      control={control}
                      render={({ field }) => (
                        <Input
                          placeholder="Destination link (optional)"
                          {...field}
                        />
                      )}
                    />
                  </div>
                </>
              ) : (
                <div className="space-y-2">
                  {selectedMedia.map((media, index) => (
                    <div key={index} className="space-y-2">
                      <p className="text-sm font-medium">Page {index + 1}</p>
                      <Controller
                        name={`content.${index}.text`}
                        control={control}
                        render={({ field }) => (
                          <RichTextEditor
                            value={field.value}
                            onChange={(value) => updateContentText(index, value)}
                            placeholder={`Text for page ${index + 1}`}
                          />
                        )}
                      />
                    </div>
                  ))}
                </div>
              )}

              <PinterestMediaUploader
                postType={postType}
                selectedMedia={selectedMedia}
                isDragging={isDragging}
                mediaInputRef={mediaInputRef}
                handleFileUpload={handleFileUpload}
                handleDragOver={handleDragOver}
                handleDragLeave={handleDragLeave}
                handleDrop={handleDrop}
                removeMedia={removeMedia}
              />

              <PinterestSchedulePicker control={control} watch={watch} errors={errors} />

              <PinterestActionButtons
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
            <PostTemplates onSelectTemplate={(template) => setValue(postType === "standard" ? "description" : "content.0.text", template)} />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="ai" className="space-y-4 mt-4">
        <Card>
          <CardContent className="p-6">
            <AIContentSuggestions onSelectSuggestion={(suggestion) => setValue(postType === "standard" ? "description" : "content.0.text", suggestion)} />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}