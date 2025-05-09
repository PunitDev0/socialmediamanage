// import FacebookDashboardPage from '@/components/DashboardLayout/CreateFacebookPost/Dashboard/facebookDashboardPage';
// import DefaultDashboard from '@/components/Default-Dashboard';
// import LinkedinDashboardPage from '@/components/linkedinCreatePost/Dashbaord/linkedinDashbaordPage';
// import React from 'react';


// export default async function Page({ params }) {
//   const { account } = await params;

//   // Function to render component based on account
//   const renderAccountComponent = () => {
//     switch (account) {
//       case 'linkedin':
//         return <LinkedinDashboardPage />;
//       case 'facebook':
//         return <FacebookDashboardPage />;
//        default:
//         return <DefaultDashboard/>;
      
//     }
//   };

//   return (
//     <div>
//       {renderAccountComponent()}
//     </div>
//   );
// }
import DashboardPage from '@/components/Dashboard/DashboardPage'
import React from 'react'

function page() {
  return (
    <div>
      <DashboardPage/>
    </div>
  )
}

export default page
