import { getSession } from "@/utils/actions"
import { Input } from "./Input"
import { UserInfo } from "./UserInfo"

import { Home, Info } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { bufferToBase64 } from "@/utils/strings"
import { useEffect } from "react"

export interface IUserInfo {
  login?:  string
  name:    string
  status:  string
  picture: string
}

const Logo = () =>
  <Link href="/" className="group">
    <Image src="/logo.svg" width={92} height={92} className="w-24 mx-auto transition group-hover:scale-95" alt="Logo" priority={true} />
  </Link>

export async function SideBar() {
  const buttons = [
    { name: 'Лента', icon: <Home className="size-16 lg:size-6" />, href: "/" },
    { name: 'О сайте', icon: <Info className="size-16 lg:size-6" />, href: "/about" }
  ]

  const session = await getSession()
  const user = session.isLoggedIn ? await fetch(`${process.env.API_URL}/user?login=${session.userLogin}`).then(res => res.json()) : undefined
  const userInfo : IUserInfo = session.isLoggedIn ?
  {
    login:   session.userLogin,
    name:    user[0].username,
    status:  user[0].status,
    picture: bufferToBase64(user[0].profile_image) || '/placeholders/profile.png'
  }
  : {
    name:    'Гость',
    status:  'Вы в режиме гостя',
    picture: '/placeholders/profile.png'
  }

  return (
    <>
    {/* Default */}
    <div className="hidden lg:flex justify-end my-auto">
      <div className="flex flex-col gap-2 ml-8 px-4 py-8 bg-white rounded-2xl border border-slate-300 divide-slate-300 shadow-lg">
        <Logo />
        <UserInfo user={userInfo} />
        <hr />
        {/* <Input /> */}
        <div>
        { 
          buttons.map(button => (
            <Link href={button.href} className="button justify-start w-full" key={button.name}>{button.icon} {button.name}</Link>
          ))
        }
        </div>
      </div>
    </div>

    {/* Mobile */}
    <div className="absolute lg:hidden bottom-0 flex justify-center w-screen z-10 p-4 select-none">
      <div className="flex flex-row justify-center gap-2 px-20 py-2 bg-white border border-gray-300 rounded-2xl shadow-xl items-center">
        <Logo />
        <UserInfo user={userInfo} />
        <div className="flex gap-2">
        { 
          buttons.map(button => (
            <Link href={button.href} className="button justify-start w-full" key={button.name}>{button.icon}</Link>
          ))
        }
        </div>
      </div>
    </div>
    </>
  )
}