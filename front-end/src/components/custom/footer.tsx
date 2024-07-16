import React from 'react'
import FooterLinks from './footer-link'
import Link from 'next/link'
import styles from "../custom/top-nav/topnav.module.css"
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import SubscriptionForm from './subsription-form'

export default function Footer() {

  return (
    <>
    <footer className='bg-[var(--secondary)] relative md:h-[304px] h-[100%]  border-t-white border-t-2 px-8 py-[32px]'>
       <div className='md:flex block justify-between'>
       <div className='md:w-[30%] w-[100%] flex  justify-center'>
          <div className="flex flex-col ">
            <h1 className={`h-[62px] pt-[6px] ${styles.navTitle} `}>
              <Link href={'/'}>
                Edusphere
              </Link>
            </h1>
            <p className='mt-2'>
            Stay in touch
            </p>
            <div>
              <div>
                <Label className="text-[var(--loading-button)] text-[12px]">Email</Label>
              </div>
              <div className='flex flex-col gap-[8px] mt-2'>
              <SubscriptionForm />
              <p className='text-[12px] text-[var(--loading-button)]'>Enter your email address</p>
              </div>
            </div>
          </div>
        </div>
        <div className='md:w-[23.3%] w-[100%] flex  justify-center my-[5px] md:my-0'>
          <div className="flex flex-col ">
            <Link href="/" className='font-bold text-center'>Connect with us</Link>
            <Link href="/" className='text-center'>Social media links</Link>
            <Link href="/" className='text-center'>Community</Link>
            <Link href="/" className='text-center'>Edusphere Demo</Link>
          </div>
        </div>
        <div className='md:w-[23.3%] w-[100%] flex  justify-center  my-[5px] md:my-0'>
          <div className="flex flex-col">
            <Link href="/" className='font-bold text-center'>Quick Links</Link>
            <Link href="/" className='text-center'>Courses</Link>
            <Link href="/" className='text-center'>Resources</Link>
          </div>
        </div>
        <div className='md:w-[23.3%] w-[100%] flex justify-center  my-[5px] md:my-0'>
          <div className="flex flex-col">
            <Link href="/" className='font-bold text-center'>Privacy Policy</Link>
            <Link href="/" className='text-center'>Terms of Service</Link>
            <Link href="/" className='text-center'>Cookie Preference</Link>
          </div>
        </div>
        
       </div>
      <div className="absolute bottom-0 md:left-[36px] left-[100px]">
        <small className='font-bold'>
          &#169; <span className='ml-2 md:text-left text-center'>2024 Edusphere</span>
        </small>
     </div>
    </footer>
   </>
  )
}
