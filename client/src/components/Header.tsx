"use client"

import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

interface HeaderProps {
  icon?:          React.ReactElement
  title:          React.ReactElement | string
  secondary?:     string
  hasBackButton?: boolean
}

export function Header({icon, title, secondary, hasBackButton}: HeaderProps) {
  const router = useRouter()
  return (
    <div className="sticky z-10 top-0 flex items-center gap-2 px-4 select-none h-20 bg-white/60 backdrop-blur-sm">
      { hasBackButton && <button onClick={() => router.back()} className="button"><ArrowLeft /></button> }
      <div className="flex flex-col">
        <h2 className="flex gap-2 text-xl items-center">{icon} {title}</h2>
        { secondary && <p className="text-slate-400 leading-none">{secondary}</p> }
      </div>
    </div>
  )
}