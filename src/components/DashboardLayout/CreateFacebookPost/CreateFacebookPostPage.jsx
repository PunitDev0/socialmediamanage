"use client";
import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import FacebookPostEditor from "./FacebookPostEditor";
import FacebookPostPreview from "./FacebookPostPreview";
import FacebookPostSettings from "./FacebookPostSettings";
import axios from "axios";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

export default function CreateFacebookPostPage() {
  const [selectedMedia, setSelectedMedia] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isScheduling, setIsScheduling] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [enableAutoHashtags, setEnableAutoHashtags] = useState(true);
  const [postType, setPostType] = useState("feed"); // feed or reels
  const fileInputRef = useRef(null);
  const router = useRouter();

  const { control, handleSubmit, setValue, watch, formState: { errors } } = useForm({
    defaultValues: {
      content: "",
      hashtags: [],
      newHashtag: "",
      date: null,
      time: "12:00",
      postTone: 50,
      location: "",
      privacy: "public",
      altText: "",
      coverImage: null, // For Reels
    },
  });

  const handleMediaUpload = (e) => {
    const files = Array.from(e.target.files)
      .filter((file) => {
        if (postType === "feed") return file.type.startsWith("image/") || file.type.startsWith("video/");
        return file.type.startsWith("video/"); // Reels: only videos
      })
      .slice(0, postType === "feed" ? 10 - selectedMedia.length : 1); // Feed: max 10, Reels: 1
    const readers = files.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve({ file, preview: e.target?.result });
        reader.readAsDataURL(file);
      });
    });
    Promise.all(readers).then((results) => {
      setSelectedMedia((prev) => [...prev, ...results]);
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
      .filter((file) => {
        if (postType === "feed") return file.type.startsWith("image/") || file.type.startsWith("video/");
        return file.type.startsWith("video/");
      })
      .slice(0, postType === "feed" ? 10 - selectedMedia.length : 1);
    const readers = files.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve({ file, preview: e.target?.result });
        reader.readAsDataURL(file);
      });
    });
    Promise.all(readers).then((results) => {
      setSelectedMedia((prev) => [...prev, ...results]);
    });
  };

  const removeMedia = (index) => {
    setSelectedMedia((prev) => prev.filter((_, i) => i !== index));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
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

  const schedulePost = async (data) => {
    if (!data.date || !data.time) {
      alert("Date aur time chunein");
      return;
    }
    if (postType === "reels" && selectedMedia.length === 0) {
      alert("Kam se kam ek video upload karein");
      return;
    }

    setIsScheduling(true);
    const scheduledTime = new Date(`${format(data.date, "yyyy-MM-dd")}T${data.time}:00Z`).toISOString();
    const formData = new FormData();
    formData.append("content", data.content);
    formData.append("hashtags", JSON.stringify(data.hashtags));
    formData.append("scheduledTime", scheduledTime);
    formData.append("postType", postType);
    formData.append("location", data.location);
    formData.append("privacy", data.privacy);
    formData.append("altText", data.altText);
    if (data.coverImage) {
      formData.append("coverImage", data.coverImage);
    }
    selectedMedia.forEach((media) => {
      if (media.file) formData.append("media", media.file);
    });

    try {
      const response = await axios.post(
        "http://localhost:5000/post/facebook/schedule",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.data.success) {
        console.log("Scheduled:", response.data.schedule.id);
        setValue("content", "");
        setValue("hashtags", []);
        setValue("date", null);
        setValue("time", "12:00");
        setValue("location", "");
        setValue("privacy", "public");
        setValue("altText", "");
        setValue("coverImage", null);
        setSelectedMedia([]);
        router.push("/dashboard/scheduled-posts");
      } else {
        console.error("Error:", response.data.message);
      }
    } catch (error) {
      console.error("Schedule error:", error);
    } finally {
      setIsScheduling(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Facebook Post ya Reels Schedule Karein</h1>
        <p className="text-muted-foreground">Apna Facebook Feed post ya Reels banayein aur schedule karein</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          <FacebookPostEditor
            control={control}
            handleSubmit={handleSubmit}
            setValue={setValue}
            watch={watch}
            errors={errors}
            selectedMedia={selectedMedia}
            isDragging={isDragging}
            fileInputRef={fileInputRef}
            handleMediaUpload={handleMediaUpload}
            handleDragOver={handleDragOver}
            handleDragLeave={handleDragLeave}
            handleDrop={handleDrop}
            removeMedia={removeMedia}
            enableAutoHashtags={enableAutoHashtags}
            setEnableAutoHashtags={setEnableAutoHashtags}
            saveAsDraft={saveAsDraft}
            schedulePost={schedulePost}
            isSaving={isSaving}
            isScheduling={isScheduling}
            saveSuccess={saveSuccess}
            postType={postType}
            setPostType={setPostType}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="space-y-4"
        >
          <FacebookPostPreview watch={watch} selectedMedia={selectedMedia} postType={postType} />
          <FacebookPostSettings
            control={control}
            watch={watch}
            setValue={setValue}
            enableAutoHashtags={enableAutoHashtags}
            setEnableAutoHashtags={setEnableAutoHashtags}
            postType={postType}
          />
        </motion.div>
      </div>
    </div>
  );
}