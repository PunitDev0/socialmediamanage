import ScheduledPostsPage from '@/components/schedule-post/schedule-post'
import React from 'react'

async function page({params}) {
  const { account } = await params;
  return (
    <div>
       <ScheduledPostsPage account={account}/>
    </div>
  )
}

export default page
