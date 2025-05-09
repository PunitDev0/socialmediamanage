"use client";

import CreatePinterestPostPage from "@/components/CreatePinterestPost/CreatePinterestPostPage";
import CreateFacebookPostPage from "@/components/DashboardLayout/CreateFacebookPost/CreateFacebookPostPage";
import CreateInstagramPostPage from "@/components/instagramCreatePost/CreateInstagramPostPage";
import CreatePostPage from "@/components/linkedinCreatePost/linkedinCreatePostPage";
import CreateYouTubePostPage from "@/components/youtubeCreatePost/CreateYouTubePostPage";
import { useSearchParams } from "next/navigation";
import React from "react";

export default function Page({ params }) {
  const { account } =  React.use(params);


  // Function to render the appropriate component based on sync
  const renderPostPage = () => {
    switch (account) {
      case "linkedin":
        return <CreatePostPage />;
      case "facebook":
        return <CreateFacebookPostPage />;
      case "instagram":
        return <CreateInstagramPostPage />;
      case "youtube":
        return <CreateYouTubePostPage />;
      case "pinterest":
        return <CreatePinterestPostPage />;
      default:
        return <div>Please select a platform to create a post.</div>;
    }
  };

  return <div>{renderPostPage()}</div>;
}