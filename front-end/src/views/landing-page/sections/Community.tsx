import React from 'react'

export default function Community() {
  return (
     <div className='text-black h-[100%] md:h-[530px] my-2'>
        <div className='flex justify-center my-2'>
                <h1 className='text-center font-bold text-[25px] md:text-[40px] '>Edusphere Community</h1>
            </div>
        <div className=' block md:flex gap-[24px] items-center   '>
            <div className='w-[100%] md:w-[50%] flex items-center md:items-start lg:items-center my-2'>
                <div className="">
                    <h2 className=' lg:text-[27px] lg:leading-[3rem] text-sm font-bold'>
                      Welcome to the EduSphere Community
                    </h2>
                    <p className='lg:text-[var(--edusphare-text)] text-sm leading-[24px]'>
                      EduSphere is a home to a vibrant community of student, administrators, and education enthusiasts dedicated to driving innovation and excellence in the field of education. By joining our community, you will have access to a wealth of resources, collaborative opportunities, and a supportive network of like-minded Educationally inclined individuals.
                    </p>
                    <p className='lg:text-[var(--edusphare-text)] text-sm leading-[24px] mt-3'>
                      Join the Edusphere community today and become part of a dynamic community committed to transforming the delivery of education. Together, we can shape the future of learning and make a lasting impact on the lives of students worldwide.
                    </p>
                </div>
            </div>
            <div className='w-[100%] md:w-[50%]  my-2'>
                <img src="./landing-1.png" alt="edusphare-landing" />
            </div>
        </div>
     </div>
  )
}
