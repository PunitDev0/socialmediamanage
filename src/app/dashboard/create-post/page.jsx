'use client'

import CreatePinterestPostPage from '@/components/CreatePinterestPost/CreatePinterestPostPage'
import CreateFacebookPostPage from '@/components/DashboardLayout/CreateFacebookPost/CreateFacebookPostPage'
import CreateInstagramPostPage from '@/components/instagramCreatePost/CreateInstagramPostPage'
import CreatePostPage from '@/components/linkedinCreatePost/linkedinCreatePostPage'
import CreateYouTubePostPage from '@/components/youtubeCreatePost/CreateYouTubePostPage'
import { useSearchParams } from 'next/navigation'
import React from 'react'

function Page() {
  const searchParams = useSearchParams()
  const sync = searchParams.get('sync') // 'linkedin', 'facebook', or 'instagram'
 console.log(searchParams);
 
  return (
    <div>
      {sync === 'linkedin' && <CreatePostPage />}
      {sync === 'facebook' && <CreateFacebookPostPage />}
      {sync === 'instagram' && <CreateInstagramPostPage />}
      {sync === 'youtube' && <CreateYouTubePostPage />}
      {sync === 'pinterest' && <CreatePinterestPostPage />}

      {!sync && <div>Please select a platform to create a post.</div>}
    </div>
  )
}

export default Page
