"use client"

import { DoorClosed } from "lucide-react"
import { useLoginModal } from "@/hooks/useModal"
import { useRouter } from "next/navigation"
import { IUserInfo } from "./SideBar"
import Image from "next/image"

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
    <button onClick={fetchClick} className="button flex lg:hidden lg:mx-auto justify-center">
      <img src={user.picture} width={64} height={64} className="rounded-2xl size-20" />
    </button>
    
    <div className="hidden lg:flex items-center gap-2 select-none">
      <Image src={user.picture} alt="User" width={64} height={64} className="rounded-2xl size-16" />
      <div className="mr-auto truncate">
        <h2 className="text-xl font-semibold truncate w-32">{user.name}</h2>
        <p className="text-gray-3 text-sm line-clamp-2 leading-none">{user.status}</p>
      </div>
      <button onClick={fetchClick} className="button">
        <DoorClosed />
      </button>
    </div>
    </>
  )
}