"use client";

import { Bell, Loader2 } from "lucide-react";
import React, { useState, useEffect } from "react";
// import SearchBaruseEffect,  from "@/components/custom/search-bar";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import styles from "../../components/custom/top-nav/topnav.module.css";
import Link from "next/link";
import NavLinks from "@/components/custom/top-nav/nav-links";
import footerStyles from "../../views/dashboard/dashboard.module.css";
import { toast } from "react-toastify";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AuthData } from "@/types/authDataTypes";

type dashBoardHeaderProps = {
  userDetails: AuthData | null | undefined
}


export default function DashBoardHeader({ userDetails }:dashBoardHeaderProps){
  // const [userDetails, setUserDetails] = useState<AuthData | null>(userDetails);
  const [user, setUser] = useState(userDetails)


  console.log('userDetails prop from header>>', userDetails)
  console.log('user state from header>>', user)

  const pathName = usePathname();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false)

  const notify = (message: string) => {
    toast(message);
 };

  const navLinks = [
    {
      no: 1,
      name: "dashboard",
      path: "/dashboard",
    },
    {
      no: 2,
      name: "e-mail",
      path: "/dashboard/email",
    },
    {
      no: 3,
      name: "schedules",
      path: "/dashboard/schedules",
    },
  ];

  const handleLogOut = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;";
    setIsLoggingOut(true)
    router.push('/')
    sessionStorage.removeItem('userData')
    notify('You have been logged out from your account!')
  }


  useEffect(() => {
    if(userDetails){
      setUser(userDetails)
    }
    
  }, [userDetails])

 

  return (
    <nav
      className={`bg-[var(--secondary)] px-8 py-[10px] flex items-center justify-between text-[var(--white-text)] `}
    >
      <div className="flex items-center xl:gap-[7rem] lg:gap-[3rem]">
        <div>
          <h1 className={`h-[62px] pt-[6px] ${styles.navTitle} `}>
            <Link href={"/"}>Edusphere</Link>
          </h1>
        </div>
        <div className="hidden lg:flex gap-3 items-center ">
          {navLinks.map((link) => (
            <NavLinks link={link} key={link.no} />
          ))}
        </div>
      </div>
      <div className={footerStyles.notifications}>
        <div>
          <Bell />
        </div>
        <div className="flex flex-col">
          <p>Welcome, {user?.first_name}</p>
          <p>Account: {user?.account_role}</p>
          {user?.job_role  && <p>Role: {user?.job_role}</p>}
        </div>
        <div>
          <Avatar>
            <AvatarImage src="" />
            <AvatarFallback>{user?.email}</AvatarFallback>
          </Avatar>
        </div>
        <div className="">
          <Button
            className="bg-[var(--secondary)] flex justify-center border  border-white hover:bg-[var(--secondary)]  text-[var(--white-text)]  w-[6rem] p-[1rem]"
            variant={"secondary"}
            onClick={handleLogOut}
          >
           {isLoggingOut ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Sign Out'}
          </Button>
        </div>
      </div>
    </nav>
  );
}
