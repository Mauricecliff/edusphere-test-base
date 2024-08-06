
import { Roboto } from "next/font/google";
import "./globals.css";
import type { Metadata } from "next";
import CustomLayouts from "@/views/CustomRootLayout";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';






const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"]
});

export const metadata: Metadata = {
  title: "Edusphare | Home",
  description: "Welcome to Edusphare...",
};


export default function RootLayout({

  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
 
  return (
    <html lang="en">

      <body className={roboto.className}>
      <ToastContainer 
         position="top-right"
         autoClose={1000}
         hideProgressBar={false}
         newestOnTop={false}
         closeOnClick
         rtl={false}
         pauseOnFocusLoss
         draggable
         pauseOnHover
         theme="light"
        
        />
        <div className="flex flex-col min-h-screen text-[var(--white-text)] ">
        <CustomLayouts>
           {children}
        </CustomLayouts>
        </div>
      </body>
    </html>
  );
}
