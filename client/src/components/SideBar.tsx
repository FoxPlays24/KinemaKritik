import { getSession } from "@/utils/actions"
import { Input } from "./Input"
import { UserInfo } from "./UserInfo"

import { Home, Info } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { bufferToBase64 } from "@/utils/strings"

export interface IUserInfo {
  login?:  string
  name:    string
  status:  string
  picture: string
}

const Logo = () =>
  <Link href="/" className="group">
    <Image src="/logo.svg" width={92} height={0} className="w-24 mx-auto transition group-hover:scale-95" alt="Logo" priority={true} />
  </Link>

export async function SideBar() {
  const buttons = [
    { name: 'Лента', icon: <Home /> },
    { name: 'О сайте', icon: <Info /> }
  ]

  const session = await getSession()
  const user = await fetch(`${process.env.API_URL}/user?login=${session.userLogin}`).then(res => res.json())
  const userInfo : IUserInfo = user[0] ? {
    login:   session.userLogin,
    name:    user[0].username,
    status:  user[0].status,
    picture: bufferToBase64(user[0].profile_image) || '/placeholders/profile.png'
  } : {
    name:    'Гость',
    status:  'Вы в режиме гостя',
    picture: '/placeholders/profile.png'
  }

  return (
    <div className="flex justify-end my-auto">
      <div className="flex flex-col gap-2 ml-8 px-4 py-8 bg-white rounded-2xl border border-slate-300 divide-slate-300 shadow-lg">
        <Logo />
        <UserInfo user={userInfo} />
        <hr />
        <Input />
        <div>
        { 
          buttons.map(button => (
            <button className="button justify-start w-full" key={button.name}>{button.icon} {button.name}</button>
          ))
        }
        </div>
      </div>
    </div>
  )
}