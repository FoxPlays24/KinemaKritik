"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

export function APIRefreshProvider() {
  const router = useRouter()
  useEffect(() => { setTimeout(() => router.refresh(), 10000) }) // refresh every 10 sec

  return <></>
}