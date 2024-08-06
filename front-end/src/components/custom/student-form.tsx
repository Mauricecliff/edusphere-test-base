
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
import { AuthData } from '@/types/authDataTypes'
import { nanoid } from 'nanoid'
import { createStudentAccount } from '@/api/admin'

export default function StudentForm() {
    const [userDetails, setUserDetails] = useState<AuthData | null>();
    const [email, setEmail] = useState<string>('')
    const [title, setTitle] = useState<string>('')
    const [firstName, setFirstName] = useState<string>('')
    const [lastName, setLastName] = useState<string>('')
    const [gender, setGender] = useState<string>('')
    const [departId, setDepartId] = useState<string>('')
    const [degree, setDegree] = useState<string>('')
    const [schoolYear, setSchoolYear] = useState<string>('')
    const [adminYear, setAdminYear] = useState<string>('')
    const [gradYear, setGradYear] = useState<string>('')

    
    
    console.log('user data form student form>>', userDetails?.access_token)
    useEffect(() => {
        const storageData = sessionStorage.getItem('userData');
        if (storageData) {
            setUserDetails(JSON.parse(storageData));
        }
    }, [])

    const handleStudentRegisteration = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const res = await createStudentAccount(userDetails?.access_token as AuthData['access_token'], {
            student_id: `_${nanoid()}`,
            email: email,
            name_title: title,
            first_name: firstName,
            last_name: lastName,
            gender: gender,
            dept_id: departId,
            degree: degree,
            school_year: schoolYear,
            admission_year: adminYear,
            expected_graduation_year: gradYear
          })

          if(res){
            console.log('result>>>', 
                res,
                {
                student_id: `_${nanoid()}`,
                email: email,
                name_title: title,
                first_name: firstName,
                last_name: lastName,
                gender: gender,
                dept_id: departId,
                degree: degree,
                school_year: schoolYear,
                admission_year: adminYear,
                expected_graduation_year: gradYear
              })
          }
       
    }
    




  return (
    <form onSubmit={handleStudentRegisteration}>
        <Card className="w-[500px] bg-[var(--secondary)] text-[var(--white-text)]">
        <CardHeader>
            <CardTitle className='text-center '>Student Registeration</CardTitle>
            <CardDescription className='text-center text-[var(--white-text)]'>Create a login credentials for all Student</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input className="text-black" value={email} onChange={(e) => setEmail(e.target.value) }  id="email" placeholder="Staff Email Address"  />
                </div>
                <div className="flex flex-col space-y-1.5 text-black" >
                <Label htmlFor="email" className="text-[var(--white-text)]">Title</Label>
                <Select value={title} onValueChange={(value) => setTitle(value)}>
                    <SelectTrigger id="gender" >
                    <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper" >
                    <SelectItem  value="MALE">MR</SelectItem>
                    <SelectItem value="FEMALE">MISS</SelectItem>
                    </SelectContent>
                </Select>
                </div>
                <div className="flex flex-col space-y-1.5">
                <Label htmlFor="first_name" >First Name</Label>
                <Input value={firstName} onChange={(e) => setFirstName(e.target.value) } className="text-black" id="first_name" placeholder="Staff First Name" />
                </div>
                <div className="flex flex-col space-y-1.5">
                <Label htmlFor="last_name">Last Name</Label>
                <Input  className="text-black"  value={lastName} onChange={(e) => setLastName(e.target.value) } id="last_name" placeholder="Staff Last Name" />
                </div>
                <div className="flex flex-col space-y-1.5 text-black">
                <Label className='text-[var(--white-text)]' htmlFor="gender">Gender</Label>
                <Select value={gender} onValueChange={(value) => setGender(value)}>
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
                </div>
                <div className="flex flex-col space-y-1.5">
                <Label htmlFor="last_name">Deparmental ID</Label>
                <Input  value={departId} onChange={(e) => setDepartId(e.target.value)}  className="text-black" id="last_name" placeholder="Staff Last Name" />
                </div>
                <div className="flex flex-col space-y-1.5 text-black">
                    <Label htmlFor="deg" className='text-[var(--white-text)]'>Degree</Label>
                    <Select  value={degree}  onValueChange={(value) => setDegree(value)}>
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
                <div className="flex flex-col space-y-1.5">
                <Label htmlFor="last_name">School Year</Label>
                <Input value={schoolYear} onChange={(e) =>  setSchoolYear(e.target.value)} className="text-black" id="last_name" placeholder="Staff Last Name" />
                </div>
                <div className="flex flex-col space-y-1.5">
                <Label htmlFor="last_name">Admission Year</Label>
                <Input  value={adminYear} onChange={(e) =>  setAdminYear(e.target.value)}  className="text-black" id="last_name" placeholder="Staff Last Name" />
                </div>
                <div className="flex flex-col space-y-1.5">
                <Label htmlFor="last_name">Graduation Year</Label>
                <Input  value={gradYear} onChange={(e) =>  setGradYear(e.target.value)}  className="text-black" id="last_name" placeholder="Staff Last Name" />
                </div>
            </div>
        </CardContent>
        <CardFooter className="flex justify-between">
            <Button className='w-full bg-[var(--secondary)] border  border-white hover:bg-[var(--secondary)]  text-[var(--white-text)]  p-[1rem]' variant={"secondary"}>
            {/* {isRegistering ? <Loader2 className="mr-2 h-4 w-4 animate-spin"  /> : 'Register'}   */}
            Register
            </Button>
        </CardFooter>
        </Card>
    </form>
  )
}


// {
//     "student_id": "string",
//     "email": "string",
//     "name_title": "string",
//     "first_name": "string",
//     "last_name": "string",
//     "gender": "MALE",
//     "dept_id": "string",
//     "degree": "string",
//     "school_year": "string",
//     "admission_year": "string",
//     "expected_graduation_year": "string"
//   }