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

  return (
    <div className="mb-40 mt-20">
      <div className="header">
        { hasBackButton && <button onClick={() => router.back()} className="button"><ArrowLeft /></button> }
        <div className="flex flex-col">
          <h2 className="flex gap-2 text-xl items-center">{icon} {title}</h2>
          { secondary && <p className="text-slate-400 leading-none">{secondary}</p> }
        </div>
      </div>
    </div>
  )
}