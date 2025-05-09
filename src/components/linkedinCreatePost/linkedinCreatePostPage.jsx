'use client';
import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import PostEditor from './linkedinPostEditor';
import PostPreview from './linkedinPostPreview';
import PostSettings from './linkedinPostSetting';
import axios from 'axios';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';

export default function CreatePostPage() {
  const [selectedImages, setSelectedImages] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isScheduling, setIsScheduling] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [enableAutoHashtags, setEnableAutoHashtags] = useState(true);
  const fileInputRef = useRef(null);
  const router = useRouter();

  const { control, handleSubmit, setValue, watch, formState: { errors } } = useForm({
    defaultValues: {
      content: '',
      hashtags: [],
      newHashtag: '',
      date: null,
      time: '12:00',
      postTone: 50,
      visibility: 'public',
    },
  });

  const content = watch('content');

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files).slice(0, 5 - selectedImages.length);
    const readers = files.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve({ file, preview: e.target?.result });
        reader.readAsDataURL(file);
      });
    });
    Promise.all(readers).then((results) => {
      setSelectedImages((prev) => [...prev, ...results]);
    });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files)
      .filter((file) => file.type.startsWith('image/'))
      .slice(0, 5 - selectedImages.length);
    const readers = files.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve({ file, preview: e.target?.result });
        reader.readAsDataURL(file);
      });
    });
    Promise.all(readers).then((results) => {
      setSelectedImages((prev) => [...prev, ...results]);
    });
  };

  const removeImage = (index) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const saveAsDraft = async (data) => {
    setIsSaving(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error('Save draft error:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const schedulePost = async (data) => {
    if (!data.date || !data.time) {
      alert('Please select a date and time');
      return;
    }

    setIsScheduling(true);
    const token = localStorage.getItem('accessToken');
    const scheduledTime = new Date(`${format(data.date, 'yyyy-MM-dd')}T${data.time}:00Z`).toISOString();
    const formData = new FormData();
    formData.append('content', data.content);
    formData.append('hashtags', JSON.stringify(data.hashtags));
    formData.append('scheduledTime', scheduledTime);
    selectedImages.forEach((img) => {
      if (img.file) formData.append('media', img.file);
    });

    try {
      const response = await axios.post(
        'http://localhost:5000/post/linkedin/schedule',
        formData,
        {
          withCredentials: true,
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );

      if (response.data.success) {
        console.log('Scheduled:', response.data.schedule.id);
        setValue('content', '');
        setValue('hashtags', []);
        setValue('date', null);
        setValue('time', '12:00');
        setSelectedImages([]);
        router.push('/dashboard/scheduled-posts');
      } else {
        console.error('Error:', response.data.message);
      }
    } catch (error) {
      console.error('Schedule error:', error);
    } finally {
      setIsScheduling(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col gap-6 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-6 w-full">
        <div className="flex flex-col gap-2 p">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Create Post</h1>
          <p className="text-gray-600">Create and schedule your LinkedIn post</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4 w-full"
          >
            <PostEditor
              control={control}
              handleSubmit={handleSubmit}
              setValue={setValue}
              watch={watch}
              errors={errors}
              selectedImages={selectedImages}
              isDragging={isDragging}
              fileInputRef={fileInputRef}
              handleImageUpload={handleImageUpload}
              handleDragOver={handleDragOver}
              handleDragLeave={handleDragLeave}
              handleDrop={handleDrop}
              removeImage={removeImage}
              enableAutoHashtags={enableAutoHashtags}
              setEnableAutoHashtags={setEnableAutoHashtags}
              saveAsDraft={saveAsDraft}
              schedulePost={schedulePost}
              isSaving={isSaving}
              isScheduling={isScheduling}
              saveSuccess={saveSuccess}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="space-y-4"
          >
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              <PostPreview watch={watch} selectedImages={selectedImages} />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <PostSettings
                control={control}
                watch={watch}
                enableAutoHashtags={enableAutoHashtags}
                setEnableAutoHashtags={setEnableAutoHashtags}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}