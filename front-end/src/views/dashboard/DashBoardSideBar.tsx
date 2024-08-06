"use client";

import React, { useEffect, useState } from "react";
import SideMenu from "@/components/custom/side-bars/side-menu";
import { AuthData } from '../../types/authDataTypes';
import authData from "@/lib/getStorageData";
import { ChevronDown } from "lucide-react";
import { title } from "process";





export default function DashBoardSideBar() {
  
  
  const [userDetails, setUserDetails] = useState<AuthData | null |  any>(authData)
  console.log("authData account role>>>", userDetails?.account_role);

  const isAdminRole = userDetails?.account_role === 'ADMIN'
  
  console.log('isAdmin>>', isAdminRole)

  const menus = [
     {
       title: 'My Profile',
       link: '/dashboard',
       component: null,
       subMenus: null
     },
     {
      title: 'Departments',
      subMenus: [
        {
         title: 'Create new Department' ,
         link: '/dashboard/management/department/create'
        },
        {
          title: 'Manage Department' ,
           link: '/dashboard/management/department/manage'
        },
      ],
       link: '/dashboard/management/department',
       component: <ChevronDown />
    },
     {
       title: 'Account',
       subMenus: [
         {
          title: 'Create Staff Account' ,
          link: '/dashboard/management/account/create'
         },
         {
          title: 'Manage Staff Account' ,
          link: '/dashboard/management/account/manage'
         },
       ],
       link: '/dashboard/management/account',
       component: <ChevronDown />
     },
     {
       title: 'Student Management',
       link: '/dashboard/management/student',
       subMenus: [
        {
         title: 'Create Student Account' ,
         link: '/dashboard/management/student/create'
        },
        {
         title: 'Manage Student Account' ,
         link: '/dashboard/management/account/manage'        
        },
      ],
       component: <ChevronDown />
     },
     {
      title: 'Course Management',
      subMenus: [
        {
         title: 'Create An Account' ,
         link: '/dashboard/management/account/create'
        },
        {
          title: 'Manage Account' ,
           link: '/dashboard/management/account/manage'
        },
      ],
       link: '/dashboard/management/course',
       component: <ChevronDown />
    },
    {
      title: 'Curriculum Management',
      subMenus: null,
      link: '/dashboard/management/curriculum',
      component: null
    },
    {
      title: 'Student Support',
      subMenus: null,
       link: '/dashboard/support/student',
       component: null
    },
    {
      title: 'Documents',
      link: '/dashboard/document',
      subMenus: null,
      component: null
    },
    {
      title: 'Support Center',
      subMenus: null,
      link: '/dashboard/support/center',
      component: null
    },

 
  ]

  const adminDashBoardMenus = [];

  const studentDashBoardMenus = [];

  const lecturerDashBoardMenus = [];

  useEffect(() => {
    if(authData){
      setUserDetails(authData)
    }
  }, [authData])

  return (
    <div className="flex justify-center my-4">
      <div className="">
        <div className="mt-4">
          {menus.map(menu => (
            <div key={menu.title} className="mt-8">
              <SideMenu  menu={menu} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

