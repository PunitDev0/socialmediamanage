'use client';
import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import PinterestPostEditor from './PinterestPostEditor';
import PinterestPostPreview from './PinterestPostPreview';
import PinterestPostSettings from './PinterestPostSettings';
import axios from 'axios';
import { format, addDays } from 'date-fns';
import { useRouter } from 'next/navigation';

export default function CreatePinterestPostPage() {
  const [selectedMedia, setSelectedMedia] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isPosting, setIsPosting] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const mediaInputRef = useRef(null);
  const router = useRouter();

  const { control, handleSubmit, setValue, watch, formState: { errors } } = useForm({
    defaultValues: {
      postType: 'standard',
      title: '',
      description: '',
      content: [],
      link: '',
      board: '',
      date: null,
      time: '12:00',
      isScheduled: true,
    },
  });

  const postType = watch('postType');

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files).slice(0, postType === 'standard' ? 1 : 20);
    const readers = files.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve({ file, preview: e.target?.result });
        reader.readAsDataURL(file);
      });
    });
    Promise.all(readers).then((results) => {
      setSelectedMedia((prev) => (postType === 'standard' ? results : [...prev, ...results]));
      if (postType === 'idea') {
        setValue('content', [
          ...watch('content'),
          ...results.map(() => ({ text: '' })),
        ]);
      }
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
      .filter((file) => file.type.startsWith('image/') || file.type.startsWith('video/'))
      .slice(0, postType === 'standard' ? 1 : 20 - selectedMedia.length);
    const readers = files.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve({ file, preview: e.target?.result });
        reader.readAsDataURL(file);
      });
    });
    Promise.all(readers).then((results) => {
      setSelectedMedia((prev) => (postType === 'standard' ? results : [...prev, ...results]));
      if (postType === 'idea') {
        setValue('content', [
          ...watch('content'),
          ...results.map(() => ({ text: '' })),
        ]);
      }
    });
  };

  const removeMedia = (index) => {
    setSelectedMedia((prev) => prev.filter((_, i) => i !== index));
    if (postType === 'idea') {
      setValue('content', watch('content').filter((_, i) => i !== index));
    }
  };

  const updateContentText = (index, text) => {
    const newContent = [...watch('content')];
    newContent[index].text = text;
    setValue('content', newContent);
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

  const submitPost = async (data) => {
    if (!selectedMedia.length) {
      alert('Please upload at least one image or video');
      return;
    }
    if (data.postType === 'standard' && (!data.title || !data.board)) {
      alert('Please provide a title and select a board for Standard Pins');
      return;
    }
    if (data.isScheduled && (!data.date || !data.time)) {
      alert('Please select a date and time for scheduling');
      return;
    }
    if (data.isScheduled && new Date(`${format(data.date, 'yyyy-MM-dd')}T${data.time}:00Z`) > addDays(new Date(), 30)) {
      alert('Scheduling is limited to 30 days in advance');
      return;
    }

    setIsPosting(true);
    const formData = new FormData();
    if (data.postType === 'standard') {
      formData.append('title', data.title);
      formData.append('description', data.description);
      formData.append('link', data.link);
      formData.append('board', data.board);
      if (selectedMedia[0]?.file) formData.append('media', selectedMedia[0].file);
    } else {
      formData.append('content', JSON.stringify(data.content));
      selectedMedia.forEach((media, index) => {
        if (media.file) formData.append(`media_${index}`, media.file);
      });
      formData.append('link', data.link);
    }

    if (data.isScheduled) {
      const scheduledTime = new Date(`${format(data.date, 'yyyy-MM-dd')}T${data.time}:00Z`).toISOString();
      formData.append('scheduledTime', scheduledTime);
    }

    try {
      const endpoint = data.postType === 'standard'
        ? (data.isScheduled ? '/post/pinterest/standard/schedule' : '/post/pinterest/standard/publish')
        : (data.isScheduled ? '/post/pinterest/idea/schedule' : '/post/pinterest/idea/publish');

      const response = await axios.post(
        `http://localhost:5000${endpoint}`,
        formData,
        {
          withCredentials: true,
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );

      if (response.data.success) {
        console.log('Post successful:', response.data.post?.id || response.data.schedule?.id);
        setValue('postType', 'standard');
        setValue('title', '');
        setValue('description', '');
        setValue('content', []);
        setValue('link', '');
        setValue('board', '');
        setValue('date', null);
        setValue('time', '12:00');
        setValue('isScheduled', true);
        setSelectedMedia([]);
        router.push('/dashboard/posts');
      } else {
        console.error('Error:', response.data.message);
      }
    } catch (error) {
      console.error('Post error:', error);
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col gap-6 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col gap-2 py-6">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Create Pinterest Post</h1>
          <p className="text-gray-600">Create or schedule a Pinterest Standard or Idea Pin</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4 w-full"
          >
            <PinterestPostEditor
              control={control}
              handleSubmit={handleSubmit}
              setValue={setValue}
              watch={watch}
              errors={errors}
              selectedMedia={selectedMedia}
              isDragging={isDragging}
              mediaInputRef={mediaInputRef}
              handleFileUpload={handleFileUpload}
              handleDragOver={handleDragOver}
              handleDragLeave={handleDragLeave}
              handleDrop={handleDrop}
              removeMedia={removeMedia}
              updateContentText={updateContentText}
              saveAsDraft={saveAsDraft}
              submitPost={submitPost}
              isSaving={isSaving}
              isPosting={isPosting}
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
              <PinterestPostPreview watch={watch} selectedMedia={selectedMedia} />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <PinterestPostSettings control={control} watch={watch} />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}