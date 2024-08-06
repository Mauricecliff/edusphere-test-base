import { ChevronDown } from 'lucide-react'
import Link from 'next/link'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import React from 'react'

type menuType = {
  menu: {
    title: string;
    link: string;
    component: null;
    subMenus: null;
} | {
    title: string;
    subMenus: {
        title: string;
        link: string;
    }[];
    link?: undefined;
    component?: undefined;
} | {
    title: string;
    subMenus: {
        title: string;
        link: string;
    }[];
    link: string;
    component: React.JSX.Element;
}
}



export default function SideMenu({ menu }: menuType) {

  return (
    <>
      
        <div className='bg-[var(--primary)] p-[16px]  border-0 rounded-md h-[48px] w-[260px] flex justify-between items-center text-white font-bold'>
          <Link href={`${menu.link}`}>
            <p>{menu.title}</p>
          </Link>
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger className='cursor-pointer' asChild>
                  {menu.component}
              </DropdownMenuTrigger>
              <DropdownMenuContent  className=' bg-[var(--primary)] p-[16px]  border-0 rounded-md h-[100%] w-[260px] flex justify-center flex-col items-center text-white'>
                  <DropdownMenuGroup>
                      {menu.subMenus && menu.subMenus.map(sub => (
                        <DropdownMenuItem key={sub.title} >
                          <Link href={`${sub.link}`}>{sub.title}</Link>
                        </DropdownMenuItem>
                      ))}
                  </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
    </>
   
  )
}
