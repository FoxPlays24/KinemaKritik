import type { Metadata } from "next"
import { Roboto } from "next/font/google"
import "./globals.css"

import { NavBar }  from "@/components/NavBar"
import { BlockBar } from "@/components/BlockBar"

import moment from "moment"
import "moment/locale/ru"
import { Modals } from "@/components/modal/Modals"
import { Toaster } from "react-hot-toast"
import { CategoriesBar } from "@/components/CategoriesBar"

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
        <Toaster />
        <Modals />
        <NavBar />
        <div className="flex justify-center gap-6 h-screen">
          <CategoriesBar />
          <BlockBar />
          <main className='bg-white shadow-lg w-[50rem] overflow-y-auto scrollbar-thumb-slate-400 scrollbar-track-transparent scrollbar-thin'>
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
