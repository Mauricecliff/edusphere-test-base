"use client"
import Dashboard from '@/views/dashboard'
import React from 'react'
import authData  from '@/lib/getStorageData'


export default function Page() {
 
  return (
    <div>
      <Dashboard authData={authData} />
    </div>
  )
}
