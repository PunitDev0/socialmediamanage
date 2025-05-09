'use client';
import { Controller } from 'react-hook-form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import PinterestMediaUploader from './PinterestMediaUploader.jsx';
import PinterestSchedulePicker from './PinterestSchedulePicker.jsx';
import PinterestActionButtons from './PinterestActionButtons';
import { PostTemplates } from '@/components/post-templates';
import { AIContentSuggestions } from '@/components/ai-content-suggestions';
import { RichTextEditor } from '@/components/rich-text-editor';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { motion } from 'framer-motion';

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
  const postType = watch('postType');

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: 'easeOut' },
    },
  };

  const mediaItemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        delay: i * 0.1,
        ease: 'easeOut',
      },
    }),
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full"
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
                <form onSubmit={handleSubmit(submitPost)} className="space-y-6">
                  <motion.div variants={itemVariants} className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="/placeholder-user.jpg" alt="User" />
                      <AvatarFallback className="bg-indigo-100 text-indigo-800">JD</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">John Doe</p>
                      <p className="text-xs text-gray-500">Content Creator</p>
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <Controller
                      name="postType"
                      control={control}
                      render={({ field }) => (
                        <Select
                          value={field.value}
                          onValueChange={(value) => {
                            field.onChange(value);
                            setValue('title', '');
                            setValue('description', '');
                            setValue('content', []);
                            setValue('link', '');
                            setValue('board', '');
                            setSelectedMedia([]);
                          }}
                        >
                          <SelectTrigger className="w-[180px] rounded-lg border-gray-200 focus:border-indigo-600">
                            <SelectValue placeholder="Select Pin type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="standard">Standard Pin</SelectItem>
                            <SelectItem value="idea">Idea Pin</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </motion.div>

                  {postType === 'standard' ? (
                    <>
                      <motion.div variants={itemVariants}>
                        <Controller
                          name="title"
                          control={control}
                          rules={{ required: 'Title is required' }}
                          render={({ field }) => (
                            <Input
                              placeholder="Pin title"
                              className="rounded-lg border-gray-200 focus:border-indigo-600"
                              {...field}
                            />
                          )}
                        />
                        {errors.title && (
                          <motion.p
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-red-500 text-xs mt-1 font-medium"
                          >
                            {errors.title.message}
                          </motion.p>
                        )}
                      </motion.div>

                      <motion.div variants={itemVariants}>
                        <Controller
                          name="description"
                          control={control}
                          render={({ field }) => (
                            <RichTextEditor
                              value={field.value}
                              onChange={field.onChange}
                              placeholder="Pin description"
                              className="min-h-[100px] rounded-lg border-gray-200 focus:border-indigo-600"
                            />
                          )}
                        />
                      </motion.div>

                      <motion.div variants={itemVariants}>
                        <Controller
                          name="link"
                          control={control}
                          render={({ field }) => (
                            <Input
                              placeholder="Destination link (optional)"
                              className="rounded-lg border-gray-200 focus:border-indigo-600"
                              {...field}
                            />
                          )}
                        />
                      </motion.div>
                    </>
                  ) : (
                    <div className="space-y-4">
                      {selectedMedia.map((media, index) => (
                        <motion.div
                          key={index}
                          variants={mediaItemVariants}
                          custom={index}
                          initial="hidden"
                          animate="visible"
                          className="space-y-2"
                        >
                          <p className="text-sm font-medium text-gray-900">Page {index + 1}</p>
                          <Controller
                            name={`content.${index}.text`}
                            control={control}
                            render={({ field }) => (
                              <RichTextEditor
                                value={field.value}
                                onChange={(value) => updateContentText(index, value)}
                                placeholder={`Text for page ${index + 1}`}
                                className="min-h-[100px] rounded-lg border-gray-200 focus:border-indigo-600"
                              />
                            )}
                          />
                        </motion.div>
                      ))}
                    </div>
                  )}

                  <motion.div variants={itemVariants}>
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
                      mediaItemVariants={mediaItemVariants}
                    />
                  </motion.div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <motion.div variants={itemVariants}>
                      <PinterestSchedulePicker
                        control={control}
                        watch={watch}
                        errors={errors}
                        itemVariants={itemVariants}
                      />
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <PinterestActionButtons
                        handleSubmit={handleSubmit}
                        saveAsDraft={saveAsDraft}
                        isSaving={isSaving}
                        isPosting={isPosting}
                        saveSuccess={saveSuccess}
                        isScheduled={watch('isScheduled')}
                        itemVariants={itemVariants}
                      />
                    </motion.div>
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
                  onSelectTemplate={(template) =>
                    setValue(postType === 'standard' ? 'description' : 'content.0.text', template)
                  }
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
                  onSelectSuggestion={(suggestion) =>
                    setValue(postType === 'standard' ? 'description' : 'content.0.text', suggestion)
                  }
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