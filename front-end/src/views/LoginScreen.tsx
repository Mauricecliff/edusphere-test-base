import React from 'react'
import styles from "../components/custom/top-nav/topnav.module.css"
import LoginForm from '@/components/custom/login-form'


export default function LoginScreen() {
  return (
    <div className=' bg-[var(--primary)] flex h-screen'>
        <div className=' w-[50%] hidden lg:flex'>
          <img src='./login.png' alt="login-image" />
        </div>
        <div className='bg-primary lg:w-[50%] w-[100%]'>
            <div className='flex justify-center'>
                <div>
                    <h1 className={`h-[62px] pt-[6px] mt-5 ${styles.navTitle} `}>
                    Edusphere
                    </h1>
                    <p className={`h-[62px] pt-[6px] capitalize mt-3 text-center text-[var(--edusphare-text)] font-bold`}>
                        log in
                    </p>
                </div>
                
            </div>
            <div className='flex justify-center lg:px-[15px] px-[0.5rem] '>
                <LoginForm />
             </div>
           
        </div>
    </div>
  )
}
