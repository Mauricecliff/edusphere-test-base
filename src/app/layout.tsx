import type { Metadata } from "next";
import { Montserrat  } from "next/font/google"

// import { cn } from "@/lib/utils"

import "./globals.css";

const montserrat = Montserrat({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Edusphere",
  description: "A school management platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta />
      </head>
      <body className={montserrat.className}>{children}</body>
    </html>
  );
}
