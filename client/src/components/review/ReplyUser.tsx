"use client"

import { reply } from "@/utils/actions"
import { X } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import ReactTextareaAutosize from "react-textarea-autosize"

export function ReplyUser({ reviewId }: { reviewId: string }) {
  const [content, setContent]     = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [parentReply, setParentReply] : any = useState([])

  const router = useRouter()
  const searchParams = useSearchParams()
  const replyId = searchParams.get("reply")

  useEffect(() => {
    if (!replyId) return
    
    const fetchData = async () => {
      try {
        const reply = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/replies?id=${replyId}`).then(res => res.json())
        setParentReply(reply[0]?.review_id===reviewId && reply[0])
      } catch (err) {}
    }
    fetchData()
    
  }, [replyId])

  function ReplyAnswer() {
    return (
      <div className="pb-2 select-none flex gap-2 items-center">
        <button type="reset" onClick={() => router.replace("?", { scroll: false })} disabled={isLoading}
        className={ "bg-slate-500 hover:bg-slate-700 active:bg-slate-800 text-white button" }>
          <X size={16} />
        </button>
        Отвечая - {parentReply.username}
      </div>
    )
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setIsLoading(true)

    try {
      await reply({ reviewId, parentId: parentReply?.id, content })
      toast.success("Вы успешно ответили на рецензию!")
      setContent("")
      setParentReply([])
      router.replace("?", { scroll: false })
    } catch(err) {
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }
 
  return (
    <form onSubmit={handleSubmit}
          className="slide-down border border-slate-300 rounded-2xl p-4 transition-colors hover:border-slate-500">
      { parentReply && <ReplyAnswer /> }
      <div className="flex flex-col gap-4 mb-4">
        <ReactTextareaAutosize name="content" value={content} onChange={e => setContent(e.target.value)} maxLength={800} 
          placeholder="Содержание" className="transition-transform whitespace-pre-line leading-relaxed focus:outline-none resize-none" />
      </div>
      <div className="flex gap-2 items-center">
        <div className="flex gap-1 text-lg mr-auto">
          {content.length} / 800
        </div>
        <button disabled={isLoading || !content.length} type="submit" 
          className="bg-blue-500 disabled:text-slate-300 disabled:bg-slate-200 hover:bg-blue-700 active:bg-blue-800 text-white button">
          Ответить
        </button>
      </div>
    </form>
  )
}