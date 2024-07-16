import Link from 'next/link';
import React from 'react'   

type FooterLinksType = {
    link: {
      header: string;
      link1: string;
      link2: string;
      link3: string;
      path: string;
  } | {
      header: string;
      link1: string;
      link2: string;
      path: string;
      link3?: undefined;
  }
}


export default function FooterLinks({ link }: FooterLinksType) {
  return (
    <div>
       <Link className='text-[14px]' href={link.path}>{link.link1}</Link>
    </div>
    
  )
}
