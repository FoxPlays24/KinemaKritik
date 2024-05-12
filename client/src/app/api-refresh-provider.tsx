"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

export function APIRefreshProvider() {
  const router = useRouter()
  useEffect(() => { setTimeout(() => router.refresh(), 5000) }) // refresh every 5 sec

  return <></>
}