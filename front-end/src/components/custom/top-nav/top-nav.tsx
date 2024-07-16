"use client";


import React, { useEffect, useState } from 'react'
import styles from "./topnav.module.css"
import NavLinks from './nav-links'
import Link from 'next/link'
import SearchBar from '../search-bar'
import { Button } from '@/components/ui/button'
import { Menu, MenuIcon, X } from 'lucide-react'
import 'animate.css';
import { usePathname } from 'next/navigation';



export default function TopNav() {

  const [handleNav, setHandleNav] =  useState<boolean>(false)
  const [animation, setAnimation] = useState<string>('')
 
  const pathName = usePathname()
 
  

  const handleOpenNavBar = () => {
       setHandleNav(!handleNav)
       setAnimation('animate__animated animate__fadeInRight')
       console.log(animation, handleNav)
  }

  const handleCloseNavBar = () => {
    setAnimation('animate__animated animate__fadeOutRight');
    setTimeout(() => {
      setHandleNav(false);
    }, 1000); // Adjust the timeout to match the duration of the animation
    console.log(animation, handleNav);
  };
  


  

  const navLinks = [
     {
      no:1,
       name: 'course catalogue',
       path: '/'
     },
     {
      no:2,
      name: 'resource',
      path: '/'
    },
    {
      no:3,
      name: 'demo',
      path: '/'
    },
    {
      no:4,
      name: 'about us',
      path: '/'
    },
  ]

  return (
    <>
       <nav className={`bg-[var(--secondary)] px-8 py-[10px] flex items-center justify-between text-[var(--white-text)] `}>
      <div className='flex items-center xl:gap-[7rem] lg:gap-[3rem]'>
        <div>
          <h1 className={`h-[62px] pt-[6px] ${styles.navTitle} `}>
            <Link href={'/'}>
            Edusphere
            </Link>
          </h1>
         </div>
        <div className='hidden lg:flex gap-3 items-center '>
          {navLinks.map(link => (
            <NavLinks link={link} key={link.no}  />
          ))}
        </div>
      </div>
      <div className='items-center xl:gap-[7rem] lg:gap-[3rem] lg:flex hidden'>
        <div>
         <SearchBar />
        </div>
        {pathName === '/login' ? null : (
          <div className=''>
            <Link href={'/login'}>
              <Button className='bg-[var(--loading-button)] hover:bg-[var(--loading-button)]  text-[var(--white-text)]' variant={'secondary'}>
              Login
              </Button>
            </Link>
          </div>
        )} 
      </div>
      <div className='items-center lg:hidden flex' >
        {handleNav ? <X color="#ffffff" onClick={handleCloseNavBar } />   : <Menu color="#ffffff" onClick={handleOpenNavBar} />}
      </div> 
    </nav>
      {handleNav && (
       <nav className={`${animation} flex  justify-center min-h-screen bg-[var(--primary)] text-[var     (--white-text)]  lg:hidden absolute w-[100%] top-[62px] `}>
            <div className='flex flex-col gap-[1.5rem] w-[81%] pt-4  '>
              {navLinks.map(link => (
                  <NavLinks link={link} key={link.no}  />
                ))} 
                <div>
              <SearchBar />
            </div>
            <div className=''>
            {pathName === '/login' ? null : (
                <Button className='bg-[var(--loading-button)] hover:bg-[var(--loading-button)]  text-[var(--white-text)]' variant={'secondary'}>
                Login
                </Button>
            )} 
              
            </div>
          </div>
        </nav> 
      )} 
   
    </>
  
  )
}
