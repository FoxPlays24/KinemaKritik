"use client"

import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react"

interface HeaderProps {
  icon?:          React.ReactElement
  title:          React.ReactElement | string
  secondary?:     string
  hasBackButton?: boolean
}

export function Header({icon, title, secondary, hasBackButton}: HeaderProps) {
  const router = useRouter()

  const [header, setHeader] = useState(false)

  const scroll = useCallback(() => {
    console.log(window.scrollY)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', scroll)
    return () => window.removeEventListener('scroll', scroll)
  }, [])

  return (
    <div className={header ? "sticky header" : "header"}>
      { hasBackButton && <button onClick={() => router.back()} className="button"><ArrowLeft /></button> }
      <div className="flex flex-col">
        <h2 className="flex gap-2 text-xl items-center">{icon} {title}</h2>
        { secondary && <p className="text-slate-400 leading-none">{secondary}</p> }
      </div>
    </div>
  )
}