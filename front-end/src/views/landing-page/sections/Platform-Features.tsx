import Link from 'next/link'
import React from 'react'

export default function PlatformFeatures() {
    const platformFeatures = {
        students:{
             header: "students",
            list:[
                "course registeration",
                "course management",
                "profile management",
                "grades overview",
                "schedules",
                "communication"
            ]
        },

        teachers:{
            header: "teachers",
           list:[
               "course registeration",
               "course management",
               "student support",
               "schedules",
               "communication"
           ]
       },


        administrators: {
            header: "administrators",
           list:[
               "course management",
               "user management",
               "student support",
               "reporting",
               "settings",
               "communication"
           ]
        }
    }
        
    
  return (
    <div className="bg-[var(--primary)] text-[var(--white-text)] h-[100%] md:h-[530px] px-3 py-5 md:my-2">
        <div className='flex justify-center my-2'>
            <h1 className='text-center font-bold text-[25px] md:text-[40px] '>Platform Features</h1>
        </div>
        <div className='block md:flex mt-2 md:mt-0 gap-[24px]'>
            <div className='w-[100%] md:w-[440px] md:h-[421px] flex justify-center items-end'>
               <div>
                 <img src="./student.png"  alt="edusphare-student" />
                  <p className='font-bold text-[27px] capitalize text-center'>
                    {platformFeatures.students.header}
                   </p>
                   {platformFeatures.students.list.map(list => (
                     <Link className='flex flex-col gap-4 text-sm text-center' href="/" key={list}>{list}</Link>
                   ))}
               </div>
            </div>
            <div className='w-[100%] md:w-[440px] h-100% md:h-[421px] mt-2 md:mt-0 flex justify-center items-end '>
               <div>
                   <img src="./teachers.png"  alt="edusphare-teachers" />
                    <p className='font-bold text-[27px] capitalize text-center'>
                        {platformFeatures.teachers.header}
                    </p>
                    {platformFeatures.students.list.map(list => (
                        <Link className='flex flex-col gap-4 text-sm text-center' href="/" key={list}>{list}</Link>
                    ))}
               </div>
            </div>
            <div className='w-[100%] md:w-[440px] md:target:h-[421px] mt-2 md:mt-0 flex justify-center items-end'>
               <div>
                    <img src="./administrators.png"  alt="edusphare-administrators" />
                    <p className='font-bold text-[27px] capitalize text-center'>
                        {platformFeatures.administrators.header}
                    </p>
                    {platformFeatures.students.list.map(list => (
                        <Link className='flex flex-col gap-4 text-sm text-center' href="/" key={list}>{list}</Link>
                    ))}
               </div>
            </div>
        </div>
    </div>
  )
}
