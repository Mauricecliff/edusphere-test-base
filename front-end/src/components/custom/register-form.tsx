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
import { createStaffAccount } from '@/api/admin'
import { Loader2 } from 'lucide-react'
import { nanoid } from 'nanoid'
import authData from "@/lib/getStorageData";
import { AuthData } from '@/types/authDataTypes'
import { toast } from 'react-toastify'


type RegisterFormPropsType = {
  handleRegister: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  handleEmail: React.Dispatch<React.SetStateAction<string>>;
  handleFirstName: React.Dispatch<React.SetStateAction<string>>;
  handleLastName: React.Dispatch<React.SetStateAction<string>>;
  handleRole: React.Dispatch<React.SetStateAction<string>>;
  handleGender: React.Dispatch<React.SetStateAction<string>>;
  emailValue: string;
  firstNameValue: string;
  lastNameValue: string;
  isRegistering: boolean;
  role: string;
  gender: string;
  
}




export default function RegisterationForm({handleRegister, handleEmail, handleFirstName,handleLastName, emailValue, firstNameValue, lastNameValue, role, isRegistering, gender, handleRole,  handleGender  }:  RegisterFormPropsType){
   


       return (
         <form onSubmit={handleRegister}>
          <Card className="w-[500px] bg-[var(--secondary)] text-[var(--white-text)]">
            <CardHeader>
              <CardTitle className='text-center '>Create An Account</CardTitle>
              <CardDescription className='text-center text-[var(--white-text)]'>Create a login credentials for all Staff</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input className="text-black"  value={emailValue} id="email" placeholder="Staff Email Address" onChange={(e) => handleEmail(e.target.value)} />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="first_name">First Name</Label>
                    <Input value={firstNameValue} onChange={(e)=> handleFirstName(e.target.value)} className="text-black" id="first_name" placeholder="Staff First Name" />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="last_name">Last Name</Label>
                    <Input value={lastNameValue} onChange={(e)=> handleLastName(e.target.value)} className="text-black" id="last_name" placeholder="Staff Last Name" />
                  </div>
                  <div className="flex flex-col space-y-1.5 text-black">
                    <Label className='text-[var(--white-text)]' htmlFor="gender">Gender</Label>
                    <Select value={gender} onValueChange={(value) =>  handleGender(value)}>
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
                  <div className="flex flex-col space-y-1.5 text-black">
                    <Label htmlFor="role" className='text-[var(--white-text)]'>Staff Role</Label>
                    <Select value={role} onValueChange={(value )=> handleRole(value)}>
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
                  </div>
                </div>
            
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button className='w-full bg-[var(--secondary)] border  border-white hover:bg-[var(--secondary)]  text-[var(--white-text)]  p-[1rem]' variant={"secondary"}>
                {isRegistering ? <Loader2 className="mr-2 h-4 w-4 animate-spin"  /> : 'Register'}  
              </Button>
            </CardFooter>
          </Card>
        </form>
      )
}

