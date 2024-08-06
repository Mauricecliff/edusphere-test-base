"use client";


import React, { ReactEventHandler, useState } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import Link from 'next/link'
import { loginUser } from '@/api/user'
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { toast } from 'react-toastify';

export default function LoginForm() {

    const [email, setEmail ] = useState<string>('')
    const [password, setPassWord] = useState<string>('')
    const [isLogin, setIsLogin] = useState<boolean>(false)
    const router = useRouter()
    const now: Date = new Date(Date.now());
    const twentyFourHours = new Date(now.getTime() + 24 * 60 * 60 * 1000);

    const notify = (message: string) => {
        toast(message);
    };
    
   

    const loginHandler = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLogin(true)
       try {
         const res = await loginUser({email: email, password: password})
         console.log('res>>>', res)
         const token = res.data.data.access_token
         //set 24 hours expiry at the time of login
         document.cookie = `token=${token}; expires=${twentyFourHours.toUTCString()} path=/;`
         const storageData = JSON.stringify(res.data.data)
         sessionStorage.setItem("userData", storageData)
         router.push('/dashboard')
         notify(res.data.message)
         console.log('token>>.', token)
         setEmail('')
         setPassWord('')
         setIsLogin(false)
       }catch(e){
          console.log('error>>>', e)
          setIsLogin(false)
          notify('Oops failed to login!')
       }
    }

    console.log('email>>>', email)
    console.log('password>>>', password)
  return (
    <form className='w-full md:px-[4rem] px-[1rem]' onSubmit={loginHandler}>
        <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input id="passowrd" placeholder="Your Email Address" value={email} className='rounded-md text-black' type="text" onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input value={password}  id="password" placeholder="Your Password" className='rounded-md text-black'  type="password" onChange={(e) => setPassWord(e.target.value)} />
            </div>
            <div className="flex flex-col space-y-1.5 w-full">
                <Button className='bg-white hover:bg-white flex justify-center' variant={'secondary'}>
                    {isLogin ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Login'}
                </Button>
            </div>
            <div className="flex flex-col space-y-1.5 w-full">
                <Link href="/">
                    <p className='capitalize text-center text-white '>forgot password?</p>
                </Link>
            </div>
        </div>
    </form>
  )
}
