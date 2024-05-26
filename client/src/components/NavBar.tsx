import { getSession } from "@/utils/actions"
import { SearchInput } from "./Search"
import { UserInfo } from "./UserInfo"

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
  <Link href="/" className="flex items-center gap-4">
    <h1 className="text-sm font-semibold hidden lg:block">KИНЕМА</h1>
    <Image src="/logo.svg" width={12} height={12} className="size-14" alt="Logo" priority={true} />
    <h1 className="text-sm font-semibold hidden lg:block">КРИТИК</h1>
  </Link>

export async function NavBar() {
  const session = await getSession()
  const user = session.isLoggedIn ? await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user?login=${session.userLogin}`).then(res => res.json()) : undefined
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
    <nav className="fixed w-full z-20 bg-white border border-slate-400 rounded-b-2xl px-12 py-2 top-0 start-0">
      <div className="flex mx-auto justify-between items-center gap-8">
        <Logo />
        <SearchInput />
        <UserInfo user={userInfo} />
      </div>
    </nav>
  )
}