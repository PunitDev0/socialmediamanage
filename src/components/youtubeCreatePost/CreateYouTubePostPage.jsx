"use client";
import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import YouTubePostEditor from "./YouTubePostEditor";
import YouTubePostPreview from "./YouTubePostPreview";
import YouTubePostSettings from "./YouTubePostSettings";
import axios from "axios";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

export default function CreateYouTubePostPage() {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedThumbnail, setSelectedThumbnail] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [isDragging, setIsDragging] = useState({ video: false, thumbnail: false, images: false });
  const [isSaving, setIsSaving] = useState(false);
  const [isPosting, setIsPosting] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const videoInputRef = useRef(null);
  const thumbnailInputRef = useRef(null);
  const imageInputRef = useRef(null);
  const router = useRouter();

  const { control, handleSubmit, setValue, watch, formState: { errors } } = useForm({
    defaultValues: {
      postType: "video", // "video" or "community"
      title: "", // For video posts
      description: "", // For video posts
      content: "", // For community posts
      tags: [],
      newTag: "",
      date: null,
      time: "12:00",
      category: "",
      visibility: "public",
      isScheduled: true, // true for scheduling, false for immediate posting
    },
  });

  const postType = watch("postType");

  const handleFileUpload = (e, type) => {
    if (type === "images") {
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
    } else {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        if (type === "video") {
          setSelectedVideo({ file, preview: e.target?.result });
        } else if (type === "thumbnail") {
          setSelectedThumbnail({ file, preview: e.target?.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e, type) => {
    e.preventDefault();
    setIsDragging((prev) => ({ ...prev, [type]: true }));
  };

  const handleDragLeave = (type) => {
    setIsDragging((prev) => ({ ...prev, [type]: false }));
  };

  const handleDrop = (e, type) => {
    e.preventDefault();
    setIsDragging((prev) => ({ ...prev, [type]: false }));
    if (type === "images") {
      const files = Array.from(e.dataTransfer.files)
        .filter((file) => file.type.startsWith("image/"))
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
    } else {
      const file = e.dataTransfer.files[0];
      if (!file) return;
      if (type === "video" && file.type.startsWith("video/")) {
        const reader = new FileReader();
        reader.onload = (e) => setSelectedVideo({ file, preview: e.target?.result });
        reader.readAsDataURL(file);
      } else if (type === "thumbnail" && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => setSelectedThumbnail({ file, preview: e.target?.result });
        reader.readAsDataURL(file);
      }
    }
  };

  const removeFile = (type, index = null) => {
    if (type === "video") {
      setSelectedVideo(null);
      if (videoInputRef.current) videoInputRef.current.value = "";
    } else if (type === "thumbnail") {
      setSelectedThumbnail(null);
      if (thumbnailInputRef.current) thumbnailInputRef.current.value = "";
    } else if (type === "images") {
      setSelectedImages((prev) => prev.filter((_, i) => i !== index));
      if (imageInputRef.current) imageInputRef.current.value = "";
    }
  };

  const saveAsDraft = async (data) => {
    setIsSaving(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error("Save draft error:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const submitPost = async (data) => {
    if (data.postType === "video" && !selectedVideo) {
      alert("Please upload a video");
      return;
    }
    if (data.postType === "community" && !data.content) {
      alert("Please provide content for the community post");
      return;
    }
    if (data.isScheduled && (!data.date || !data.time)) {
      alert("Please select a date and time for scheduling");
      return;
    }

    setIsPosting(true);
    const formData = new FormData();
    if (data.postType === "video") {
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("tags", JSON.stringify(data.tags));
      formData.append("category", data.category);
      formData.append("visibility", data.visibility);
      if (selectedVideo?.file) formData.append("video", selectedVideo.file);
      if (selectedThumbnail?.file) formData.append("thumbnail", selectedThumbnail.file);
    } else {
      formData.append("content", data.content);
      formData.append("visibility", data.visibility);
      selectedImages.forEach((img) => {
        if (img.file) formData.append("images", img.file);
      });
    }

    if (data.isScheduled) {
      const scheduledTime = new Date(`${format(data.date, "yyyy-MM-dd")}T${data.time}:00Z`).toISOString();
      formData.append("scheduledTime", scheduledTime);
    }

    try {
      const endpoint = data.postType === "video"
        ? (data.isScheduled ? "/post/youtube/video/schedule" : "/post/youtube/video/publish")
        : (data.isScheduled ? "/post/youtube/community/schedule" : "/post/youtube/community/publish");

      const response = await axios.post(
        `http://localhost:5000${endpoint}`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.data.success) {
        console.log("Post successful:", response.data.post?.id || response.data.schedule?.id);
        setValue("postType", "video");
        setValue("title", "");
        setValue("description", "");
        setValue("content", "");
        setValue("tags", []);
        setValue("newTag", "");
        setValue("date", null);
        setValue("time", "12:00");
        setValue("category", "");
        setValue("visibility", "public");
        setValue("isScheduled", true);
        setSelectedVideo(null);
        setSelectedThumbnail(null);
        setSelectedImages([]);
        router.push("/dashboard/posts");
      } else {
        console.error("Error:", response.data.message);
      }
    } catch (error) {
      console.error("Post error:", error);
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Create YouTube Post</h1>
        <p className="text-muted-foreground">Create or schedule a YouTube video or community post</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          <YouTubePostEditor
            control={control}
            handleSubmit={handleSubmit}
            setValue={setValue}
            watch={watch}
            errors={errors}
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
          <YouTubePostPreview watch={watch} selectedThumbnail={selectedThumbnail} selectedImages={selectedImages} />
          <YouTubePostSettings control={control} watch={watch} />
        </motion.div>
      </div>
    </div>
  );
}