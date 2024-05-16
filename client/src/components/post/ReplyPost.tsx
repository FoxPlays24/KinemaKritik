"use client"

import { CircleHelp, MessageCircle, Trash2 } from "lucide-react"
import Image from "next/image"
import { bufferToBase64 } from "@/utils/strings"
import moment from "moment"
import { useState } from "react"
import toast from "react-hot-toast"
import { replyRemove } from "@/utils/actions"

export function ReplyPost({ reply, isUserReview }: { reply: any, isUserReview: boolean }) {
  const [deleteConfirm, setDeleteConfirm] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  async function handleDelete() {
    setIsLoading(true)
    if (!deleteConfirm) {
      setDeleteConfirm(true)
      setTimeout(() => {
        setDeleteConfirm(false)
      }, 5000)
    }
    else {
      await replyRemove(reply.id)
      toast.success("Ответ успешно удален!")
      setDeleteConfirm(false)
    }
    setIsLoading(false)
  }

  function Header() {
    return (
      <div className="flex gap-1 items-center mb-2 select-none">
        <MessageCircle />
        <Image src={bufferToBase64(reply.profile_image)||"/placeholders/profile.png"} alt="Профиль" width={16} height={16} className="relative size-10 rounded-full" />
        <a href={`/user/${reply.login}`} className="flex gap-2 items-center transition-colors hover:text-blue-400 border border-slate-300 hover:border-blue-400 px-2 py-1 rounded-2xl">
          <p>{reply.username}</p>
        </a>
        {/* {
          !isReviewPage &&
          <>
            <span className="text-slate-500">в ответ на рецензию</span>
            <a href={`/review/${reply.review_id}`} className="link">#{reply.review_id}</a>
          </>
        } */}
        <p className="text-slate-400 ml-auto text-right">{moment(reply.created_at).format('ll')}</p>
      </div>
    )
  }

  return (
    <div className="border border-slate-300 rounded-2xl p-4 transition-colors hover:border-slate-500">
      <div className="flex flex-col gap-1">
        <Header />
        <p className="whitespace-pre-line leading-relaxed text-xl text-clip break-words">
          {reply.content}
        </p>
        <div className="ml-auto">
          {
            isUserReview &&
            <button type="button" onClick={handleDelete} disabled={isLoading}
            className={ deleteConfirm ? "bg-rose-700 hover:bg-rose-800 active:bg-rose-900 text-white button" : "bg-rose-500 hover:bg-rose-700 active:bg-rose-800 text-white button" }>
              { deleteConfirm ? <CircleHelp /> : <Trash2 /> }
            </button>
          }
        </div>
      </div>
    </div>
  )
}