import type { Metadata } from "next"
import { Roboto } from "next/font/google"
import "./globals.css"

import { SideBar }  from "@/components/SideBar"
import { BlockBar } from "@/components/BlockBar"

import moment from "moment"
import "moment/locale/ru"
import { Modals } from "@/components/modal/Modals"

const roboto = Roboto({ subsets: ["latin"], weight: '400' })

export const metadata: Metadata = {
  title: "КинемаКритик",
  description: "Критика кино на КинемаКритике"
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  moment.locale('ru')

  return (
    <html lang="ru">
      <body className={roboto.className}>
        <Modals />
        <div className="flex justify-center min-h-screen">
          <SideBar /> 
          <main className='bg-white mx-[2%] shadow-lg w-[48rem] h-screen overflow-y-scroll scrollbar-none'>
            {children}
          </main>
          <BlockBar />
        </div>
      </body>
    </html>
  )
}
