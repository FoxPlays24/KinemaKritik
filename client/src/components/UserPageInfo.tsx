"use client"

import { editProfile, logout } from "@/utils/actions"
import { bufferToBase64 } from "@/utils/strings"
import { DoorOpen, Edit, Save, Upload, X } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { ImageUpload, ImageUploadType } from "./ImageUpload"

async function handleLogout() {
  await logout()
  window.location.reload()
}

export function UserPageInfo({ user, userLogin, isUser }: { user: any, userLogin: string, isUser: boolean }) {
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [profileImage, setProfileImage] = useState("")
  const [coverImage, setCoverImage] = useState("")
  const [username, setUsername] = useState("")
  const [status, setStatus] = useState("")

  useEffect(() => {
    setProfileImage(user.profile_image)
    setCoverImage(user.cover_image)
    setUsername(user.username)
    setStatus(user.status)
  }, [user.login])

  async function handleSave() {
    setIsLoading(true)

    const isUsernameEmpty : boolean = !username.trim()
    if(isUsernameEmpty)
      setUsername(userLogin)

    await editProfile({ userLogin, profileImage, coverImage, username: (isUsernameEmpty ? userLogin : username), status })

    toast.success("Изменения успешно внесены!")
    setIsLoading(false)
    setIsEditing(false)
  }

  return (
    <div>
      {
        isEditing ? <ImageUpload type={ImageUploadType.COVER} value={coverImage} disabled={isLoading} onChange={(image: string) => setCoverImage(image)} />
        :
        user?.cover_image 
        ? <Image src={bufferToBase64(user.cover_image)||""} alt="Cover image" width={0} height={0} className="w-full h-52 rounded-2xl object-cover" />
        : <div className="w-full h-52 rounded-2xl bg-slate-300" />
      }
    
      <div className="flex px-8 gap-4">
        {
          isEditing ? <ImageUpload type={ImageUploadType.PROFILE} value={profileImage} disabled={isLoading} onChange={(image: string) => setProfileImage(image)} />
          :
          <Image src={bufferToBase64(user.profile_image)||"/placeholders/profile.png"} alt="Profile image" width={400} height={400}
          className="size-32 rounded-2xl border-2 border-white -mt-12" />
        }
        <div className="flex flex-col pt-4">
          {
            isEditing ?
            <>
              <p className="leading-none select-none text-slate-400 text-sm">Псевдоним и статус</p>
              <input disabled={isLoading} className='text-2xl font-semibold focus:outline-none' placeholder="Псевдоним" value={username || ""} onChange={(e) => setUsername(e.target.value)} />
              <input disabled={isLoading} className='leading-none focus:outline-none' placeholder="Статус" value={status || ""} onChange={(e) => setStatus(e.target.value)} />
            </>
            :
            <>
              <h2 className='text-2xl font-semibold'>{user.username}</h2>
              <p className='text-slate-400 leading-none'>{user.status}</p>
            </>
          }
        </div>
        { 
          isUser && 
          <div className="ml-auto flex gap-2 items-center">
            {
              isEditing ? 
              <>
                <button disabled={isLoading} onClick={handleSave} className="ml-auto flex items-center button bg-slate-200 text-sm px-6"><Save /> Сохранить</button>
                <button disabled={isLoading} onClick={() => window.location.reload()}><X className="button bg-slate-200 size-10" /></button>
              </>
              :
              <>
                <button onClick={() => setIsEditing(true)} className="button bg-slate-200 text-sm"><Edit /> Редактировать</button> 
                <button onClick={handleLogout}><DoorOpen className="button bg-slate-200 size-10" /></button>
              </>
            }
          </div>
        }
      </div>
    </div>
  )
}