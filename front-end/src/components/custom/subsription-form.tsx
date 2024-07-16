import React from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

export default function SubscriptionForm() {
  return (
    <div className='flex gap-[10px]'>
        <Input type="text" placeholder='Email' className='text-black'/>
        <Button className='bg-[var(--primary)] hover:bg-[var(--secondary)] variant="secondary'>
          Subscribe
        </Button>
  </div>
  )
}
