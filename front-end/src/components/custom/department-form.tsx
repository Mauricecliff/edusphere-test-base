"use client"

import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Loader2 } from 'lucide-react'
import { nanoid } from 'nanoid'
import CreateDepartment from '@/views/dashboard/Department/CreateDepartment'
import { createDepartment } from '@/api/admin'
import { AuthData } from '@/types/authDataTypes'

const authStore: string | null = localStorage.getItem("userData")
let authData: AuthData | null = null;
if(authStore){
    authData = JSON.parse(authStore) as AuthData
}

export default function CreateDeparmentForm() {
    const [departId, setDepartId]  = useState<string>('');
    const [departName, setDepartName] = useState<string>('');
    const [minimumYears, setMinimumYears] = useState<string>('');
    const [isCreating, setIsCreating] = useState<boolean>(false)
    const [degreeValue, setDegreeValue]  = useState<string>('')
    const [userDetails, setUserDetails] = useState<AuthData | null>();
    
    
    
    useEffect(() => {
        const storageData = sessionStorage.getItem('userData');
        if (storageData) {
            setUserDetails(JSON.parse(storageData));
        }
    }, [])

    console.log('user access_token>>', userDetails?.access_token)

   
  

    const handleCreateDepartment = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
           const res = await createDepartment(userDetails?.access_token as AuthData['access_token'] , {
            dept_id: departId,
            name: departName,
            hod_id: `hod_id_${nanoid()}`,
            degrees_offered: [
              {
                degree: degreeValue,
                minimum_years: Number(minimumYears)
              }
            ]
          })
          if(res){
            console.log('api dep res>>>', res)
            console.log('logged console>>>', {
                dept_id: departId,
                name: departName,
                hod_id: `hod_id_${nanoid()}`,
                degrees_offered: [
                  {
                    degree: degreeValue,
                    minimum_years: Number(minimumYears)
                  }
                ]
              })
          }
          
        }catch(e){
          console.log('cant create department>>>', e)
        }
    
    }

  return (
    <form onSubmit={handleCreateDepartment}>
        <Card className="w-[500px] bg-[var(--secondary)] text-[var(--white-text)]">
        <CardHeader>
            <CardTitle className='text-center '>Create Department</CardTitle>
            <CardDescription className='text-center text-[var(--white-text)]'>Create a Department</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                <Label htmlFor="dep-id">Departmental ID</Label>
                <Input className="text-black" value={departId} onChange={(e) => setDepartId(e.target.value)}  id="dep-id" placeholder="Staff Email Address" />
                </div>
                <div className="flex flex-col space-y-1.5">
                <Label htmlFor="dep-name">Deparmental Name</Label>
                <Input className="text-black" value={departName} onChange={(e) => setDepartName(e.target.value)} id="dep-name" placeholder="Staff First Name" />
                </div>
                <div className="flex flex-col space-y-1.5 text-black">
                <Label htmlFor="deg" className='text-[var(--white-text)]'>Offered Degree</Label>
                <Select value={degreeValue} onValueChange={(value) => setDegreeValue(value)}>
                    <SelectTrigger id="deg" >
                    <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper" >
                    <SelectItem  value="BSC">BSC</SelectItem>
                    <SelectItem value="Masters">Masters</SelectItem>
                    <SelectItem value="PHD">PHD</SelectItem>
                    <SelectItem value="Diploma">Diploma</SelectItem>
                    <SelectItem value="OTHER">OTHER</SelectItem>
                    </SelectContent>
                </Select>
                </div>
                <div className="flex flex-col spSace-y-1.5">
                    <Label htmlFor="mini-years">Minimum Years</Label>
                    <Input value={minimumYears} 
                    onChange={(e) => setMinimumYears(e.target.value)} className="text-black" id="last_name" placeholder="Staff Last Name" />
                </div>
                {/* <div className="flex flex-col space-y-1.5 text-black">
                <Label className='text-[var(--white-text)]' htmlFor="gender">Gender</Label>
                <Select >
                    <SelectTrigger id="gender" >
                    <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper" >
                    <SelectItem  value="MALE">MALE</SelectItem>
                    <SelectItem value="FEMALE">FEMALE</SelectItem>
                    <SelectItem value="NON_BINARY">NON_BINARY</SelectItem>
                    <SelectItem value="UNSPECIFIED">UNSPECIFIED</SelectItem>
                    <SelectItem value="OTHER">OTHER</SelectItem>
                    </SelectContent>
                </Select>
                </div> */}
                {/* <div className="flex flex-col space-y-1.5 text-black">
                <Label htmlFor="role" className='text-[var(--white-text)]'>Staff Role</Label>
                <Select >
                    <SelectTrigger id="role">
                    <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper" >
                    <SelectItem  value="LECTURER">LECTURER</SelectItem>
                    <SelectItem value="ADMINISTRATOR">ADMINISTRATOR</SelectItem>
                    <SelectItem value="DEAN">DEAN</SelectItem>
                    <SelectItem value="SUB_DEAN"> SUB_DEAN</SelectItem>
                    <SelectItem value="SUB_HEAD">SUB_HEAD</SelectItem>
                    <SelectItem value="OTHER">OTHER</SelectItem>
                    </SelectContent>
                </Select>
                </div> */}
            </div>
        
        </CardContent>
        <CardFooter className="flex justify-between">
            <Button className='w-full bg-[var(--secondary)] border  border-white hover:bg-[var(--secondary)]  text-[var(--white-text)]  p-[1rem]' variant={"secondary"}>
            {isCreating ? <Loader2 className="mr-2 h-4 w-4 animate-spin"  /> : 'Create Department'}  
            </Button>
        </CardFooter>
        </Card>
    </form>
  )
}



