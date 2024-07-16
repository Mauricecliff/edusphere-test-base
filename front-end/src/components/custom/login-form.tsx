import React from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import Link from 'next/link'

export default function LoginForm() {
  return (
    <form className='w-full md:px-[4rem] px-[1rem]'>
        <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input id="passowrd" placeholder="Your Email Address" className='rounded-md text-black' type="text" />
            </div>
            <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Passwoord</Label>
                <Input id="password" placeholder="Your Password" className='rounded-md text-black'  type="password" />
            </div>
            <div className="flex flex-col space-y-1.5 w-full">
                <Button className='bg-white hover:bg-white' variant={'secondary'}>
                    Login
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
