"use client"

import { logout } from "@/utils/actions"
import { DoorOpen, Edit } from "lucide-react"

export function UserButtons() {
  async function handleClick() {
    await logout()
    window.location.reload()
  }

  return (
    <div className="ml-auto flex gap-2 items-center">
      <button className="button bg-slate-200 text-sm"><Edit /> Редактировать</button>
      <button onClick={handleClick}><DoorOpen className="button bg-slate-200 size-10" /></button>
    </div>
  )
}