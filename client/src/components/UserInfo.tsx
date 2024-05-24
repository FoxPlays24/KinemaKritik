"use client"

import { useLoginModal } from "@/hooks/useModal"
import { useRouter } from "next/navigation"
import { IUserInfo } from "./NavBar"
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
    <button onClick={fetchClick} className="flex items-center gap-2 select-none button">
      
      <div className="hidden lg:block truncate text-right max-w-52">
        <h2 className="text-xl font-semibold truncate">{user.name}</h2>
        <p className="text-gray-3 text-sm line-clamp-2 leading-none">{user.status}</p>
      </div>
      <Image src={user.picture} alt="User" width={32} height={32} className="rounded-2xl size-12" />
    </button>
  )
}