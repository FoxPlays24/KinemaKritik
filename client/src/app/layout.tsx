import type { Metadata } from "next"
import { Roboto } from "next/font/google"
import "./globals.css"

import { SideBar }  from "@/components/SideBar"
import { BlockBar } from "@/components/BlockBar"

import moment from "moment"
import "moment/locale/ru"
import { Modals } from "@/components/modal/Modals"
import { Toaster } from "react-hot-toast"
import { APIRefreshProvider } from "./api-refresh-provider"

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
        <APIRefreshProvider />
        <Toaster />
        <Modals />
        <div className="flex justify-center min-h-screen gap-6">
          <SideBar />
          <BlockBar />
          <main className='bg-white shadow-lg w-[48rem] h-screen overflow-y-auto scrollbar-thumb-slate-400 scrollbar-track-transparent scrollbar-thin'>
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
