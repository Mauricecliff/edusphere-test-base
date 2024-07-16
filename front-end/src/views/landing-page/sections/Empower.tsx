import React from 'react'

export default function Empower() {
    return (
        <div className='bg-[var(--primary)] text-[var(--white-text)] block md:flex gap-[24px] items-center  h-[100%] md:h-[530px] px-3 my-2'>
              <div className='w-[100%] md:w-[50%]  my-2'>
                <img src="./explore.png" alt="edusphare-landing" />
            </div>
            <div className='w-[100%] md:w-[50%] flex items-center md:items-start lg:items-center my-2'>
                <div className="">
                    <h1 className=' lg:text-[40px] lg:leading-[3rem] text-sm font-bold'>
                    <span className='text-[var(--loading-button)]'>Empower</span > Teachers, <span className='text-[var(--loading-button)]'>Inspire</span><br /> Students, Streamline School<br /> Management, <span className='text-[var(--loading-button)]'>Achieve Success</span> all in One Platform
                    </h1>
                    <p className='lg:text-[var(--edusphare-text)] text-sm leading-[24px] mt-3'>
                      Join the Edusphere community today and become part of a dynamic community committed to transforming the delivery of education. Together, we can shape the future of learning and make a lasting impact on the lives of students worldwide.
                    </p>
                </div>
            </div>
        </div>
      )
}
