"use client"

import { AuthData } from '@/types/authDataTypes'
import React, { useEffect, useState } from 'react'




type authDataType = {
    authData: AuthData | null; 
}

export default function Dashboard({ authData }: authDataType ) {
    const [authUser, setAuthUser] = useState<null | AuthData>()
  
  console.log('authData from dashboard comp>>', authData)

 useEffect(() => {
   if(authData){
     setAuthUser(authData)
   }
 }, [authData])

 console.log('authUser from dashboard comp>>', authUser)


  return (
    <div className=' text-black'>welcome to edusphare dashboard {authUser?.email}</div>
  )
}
