import React from 'react'

export default function Hero() {
  return (
    <div className='text-black block md:flex gap-[24px] items-center  h-[100%] md:h-[530px] my-2'>
            <div className='w-[100%] md:w-[50%] flex items-center md:items-start lg:items-center my-2'>
                <div className="">
                    <h1 className=' lg:text-[40px] lg:leading-[3rem] text-sm font-bold'>
                    Unlock the Power of<br /> <span className="text-[var(--loading-button)]">Personalized Learning at</span><br/> your fingertips with a<br /> <span className="text-[var(--loading-button)]">Learning Platform like no</span><br />other.
                    </h1>
                    <p className='lg:text-[var(--edusphare-text)] text-sm leading-[24px]'>
                    Discover the learning platform that revolutionizes the way your school delivers education, tailored to every student’s need.  
                    </p>
                </div>

            </div>
            <div className='w-[100%] lg:w-[50%]  my-2'>
                <img src="./hero.png" alt="edusphare-landing" />
            </div>
    </div>
  )
}
