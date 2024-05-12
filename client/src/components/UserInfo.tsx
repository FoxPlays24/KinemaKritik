"use client"

import { DoorClosed } from "lucide-react"
import { useLoginModal } from "@/hooks/useModal"
import { useRouter } from "next/navigation"
import { IUserInfo } from "./SideBar"

export function UserInfo({ user } : { user: IUserInfo }) {
  const loginModal = useLoginModal()
  const router = useRouter()

  function fetchClick() {
    if (user.login)
      router.push('/user/'+user.login)
    else
      loginModal.onOpen()
  }

  return (
    <>
    <a href="/" className="relative mx-auto lg:hidden">
      <img src={user.picture} width={64} className="rounded-2xl" />
    </a>
    
    <div className="hidden lg:flex items-center gap-2 select-none">
      <img src={user.picture} width={64} className="rounded-2xl" />
      <div className="mr-auto truncate">
        <h2 className="text-xl font-semibold">{user.name}</h2>
        <p className="text-gray-3 text-sm line-clamp-2 leading-none">{user.status}</p>
      </div>
      <button onClick={fetchClick} className="button">
        <DoorClosed />
      </button>
    </div>
    </>
  )
}