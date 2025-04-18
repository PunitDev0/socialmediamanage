'use client'

import CreateFacebookPostPage from '@/components/DashboardLayout/CreateFacebookPost/CreateFacebookPostPage'
import CreateInstagramPostPage from '@/components/instagramCreatePost/CreateInstagramPostPage'
import CreatePostPage from '@/components/linkedinCreatePost/linkedinCreatePostPage'
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

      {!sync && <div>Please select a platform to create a post.</div>}
    </div>
  )
}

export default Page
