"use client";


import Footer from '@/components/custom/footer'
import TopNav from '@/components/custom/top-nav/top-nav'
import { usePathname } from 'next/navigation';
import React from 'react'
import DashBoardHeader from '../dashboard/DashBoardHeader';
import DashBoardFooter from '../dashboard/DashBoardFooter';

export default function CustomLayouts({ children }:Readonly<{
    children: React.ReactNode;
  }>) {

    const path = usePathname()
    
    // const dashBoardRoutes = path === '/dashboard' || path === '/dashboard/staff' || path === '/dashboard/management' || path === '/dashboard/email' || path === '/dashboard/schedules' || path === '/dashboard/management/account' || path === '/dashboard/management/account/create' || path === '/dashboard/management/account/manage' ||  path === '/dashboard/management/student' || path === '/dashboard/support/student' || path === '/dashboard/support/center' || path === '/dashboard/document' || path === '/dashboard/management/curriculum' || path === '/dashboard/management/course' || path === '/dashboard/management/department/manage' || path === '/dashboard/management/department/create' || path === '/dashboard/management/department'
     const dashBoardRoutes = path === '/dashboard/*'
     const publicPage = path === '/' && '/login'
    return (
      <>
     
         {publicPage && ( <TopNav  /> )} 
            <main className="flex-grow">
            {children}
            </main>
          {publicPage && (<Footer />)}
          </>
    )
}
