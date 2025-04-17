import CreateFacebookPostPage from '@/components/DashboardLayout/CreateFacebookPost/CreateFacebookPostPage'
import CreateInstagramPostPage from '@/components/instagramCreatePost/CreateInstagramPostPage'
import CreatePostPage from '@/components/linkedinCreatePost/linkedinCreatePostPage'
import React from 'react'

function page() {
  return (
    <div>
      <CreatePostPage/>
      {/* <CreateInstagramPostPage/> */}
      {/* <CreateFacebookPostPage/> */}
    </div>
  )
}

export default page
