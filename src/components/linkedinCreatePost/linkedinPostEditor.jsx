import { Controller } from 'react-hook-form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import MediaUploader from './linkedinImageUpload';
import HashtagManager from './linkedinHashtagManager';
import SchedulePicker from './linkedinSchedulePicker';
import ActionButtons from './linkedinActionButton';
import { PostTemplates } from '@/components/post-templates';
import { AIContentSuggestions } from '@/components/ai-content-suggestions';
import { RichTextEditor } from '@/components/rich-text-editor';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { motion } from 'framer-motion';

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="max-w-7xl mx-auto"
    >
      <Tabs defaultValue="editor" className="w-full">
        <TabsList className="w-full grid grid-cols-3 bg-gray-100 rounded-xl p-1 mb-4">
          {[
            { value: 'editor', label: 'Editor' },
            // { value: 'templates', label: 'Templates' },
            { value: 'ai', label: 'AI Assistant' },
          ].map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="rounded-lg py-2 text-sm font-medium text-gray-600 data-[state=active]:bg-white data-[state=active]:text-indigo-600 data-[state=active]:shadow-sm transition-all duration-200 hover:text-indigo-600"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="editor" className="space-y-4 mt-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="rounded-2xl shadow-md border-none bg-white hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <form onSubmit={handleSubmit(schedulePost)} className="space-y-6">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="/placeholder-user.jpg" alt="User" />
                      <AvatarFallback className="bg-indigo-100 text-indigo-800">JD</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">John Doe</p>
                      <p className="text-xs text-gray-500">Product Manager at Acme Inc.</p>
                    </div>
                  </div>

                  <div>
                    <Controller
                      name="content"
                      control={control}
                      rules={{ required: 'Content is required' }}
                      render={({ field }) => (
                        <RichTextEditor
                          value={field.value}
                          onChange={field.onChange}
                          placeholder="What do you want to share?"
                          className="min-h-[150px] rounded-lg border-gray-200 focus:border-indigo-600"
                        />
                      )}
                    />
                    {errors.content && (
                      <motion.p
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-xs mt-1 font-medium"
                      >
                        {errors.content.message}
                      </motion.p>
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

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <SchedulePicker control={control} watch={watch} errors={errors} />

                    <ActionButtons
                      handleSubmit={handleSubmit}
                      saveAsDraft={saveAsDraft}
                      isSaving={isSaving}
                      isScheduling={isScheduling}
                      saveSuccess={saveSuccess}
                    />
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
        <TabsContent value="templates" className="space-y-4 mt-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="rounded-2xl shadow-md border-none bg-white hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <PostTemplates
                  onSelectTemplate={(template) => setValue('content', template)}
                  className="grid gap-4"
                />
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
        <TabsContent value="ai" className="space-y-4 mt-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="rounded-2xl shadow-md border-none bg-white hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <AIContentSuggestions
                  onSelectSuggestion={(suggestion) => setValue('content', suggestion)}
                  className="space-y-4"
                />
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}