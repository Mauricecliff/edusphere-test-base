
import React from 'react'
import CreateAccount from '@/views/dashboard/CreateAccount'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Edusphare | Dashboard-Create Account",
  description: "Create an Edusphere Admin  Account..",
};


export default function Page() {
  return (
    <div className='flex justify-center'>
      <div className='mt-[3.5rem]'>
        <CreateAccount />
      </div>
    </div>
    
  )
}
