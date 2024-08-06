"use client";


import React, { useEffect, useState } from 'react';
import DashBoardHeader from '../dashboard/DashBoardHeader';
import DashBoardSideBar from '../dashboard/DashBoardSideBar';
import DashBoardFooter from '../dashboard/DashBoardFooter';

import { AuthData } from "@/types/authDataTypes";





export default function CustomDashBoardLayout({ children }:Readonly<{
    children: React.ReactNode;
  }>) {
    const [userDetails, setUserDetails] = useState<AuthData | null>();
    
    
    
    useEffect(() => {
        const storageData = sessionStorage.getItem('userData');
        if (storageData) {
            setUserDetails(JSON.parse(storageData));
        }
    }, [])

    return (
        <main className='text-black min-h-screen flex flex-col '>
        <DashBoardHeader userDetails={userDetails} />
           <div  className='bg-[#FBFBFB] w-[100%] flex flex-grow'>
              <div className='w-[35%]'>
                <DashBoardSideBar />
              </div>
              <div className="w-[65%]">
                {children}
              </div>
           </div>
           <DashBoardFooter />
       </main>
    )
}
