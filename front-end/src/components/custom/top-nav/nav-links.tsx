import Link from 'next/link';
import React from 'react'   

type NavLinksType = {
    link: { no: number; name: string; path: string; }; key: number;
}


export default function NavLinks({ link }:  NavLinksType) {
  return (
    <Link className='text-[14px] uppercase' href={link.path}>{link.name}</Link>
  )
}
