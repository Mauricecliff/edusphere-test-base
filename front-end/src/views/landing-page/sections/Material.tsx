import { Button } from '@/components/ui/button'
import React from 'react'

export default function Material() {
  return (
    <div className='text-black h-[100%] md:h-[144px] my-3 flex justify-center'>
        <div className='my-2'>
            <h2 className='text-center font-bold text-[25px] md:text-[40px]'>
            Explore our vast library of Educational Materials
            </h2>
            <p className='text-center my-2'>
            Download textbooks, books and more in PDF format. Get instant access to knowledge at no cost, empower yourself with our free educational materials. 
            </p>
            <div className='flex justify-center my-2'> 
                <Button className='bg-[var(--secondary)] hover:bg-[var(--secondary)]  text-[var(--white-text)]' variant={'secondary'}>
                Explore Materials
                </Button>
            </div>
        </div>
     </div>
  )
}
