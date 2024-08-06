import React, { useEffect, useState } from 'react'
import type { Metadata } from "next";
import Link from 'next/link';
import DashBoardHeader from '../../views/dashboard/DashBoardHeader';
import DashBoardSideBar  from '../../views/dashboard/DashBoardSideBar';
import DashBoardFooter from '../../views/dashboard/DashBoardFooter'
import CustomDashBoardLayout from '@/views/CustomDashBoardLayout';
// import authData from '@/lib/getStorageData';

export const metadata: Metadata = {
    title: "Edusphere | Dashboard-Home",
    description: "Welcome Edusphare Dashboard...",
  };
  

export default function DashboardLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {

  return (
     <CustomDashBoardLayout >
       {children}
     </CustomDashBoardLayout >
  )
}
