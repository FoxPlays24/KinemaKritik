"use client"

import { reply } from "@/utils/actions"
import { useState } from "react"
import toast from "react-hot-toast"
import ReactTextareaAutosize from "react-textarea-autosize"

export function ReplyUser({ reviewId, parentId }: { reviewId: string, parentId?: string }) {
  const [content, setContent] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setIsLoading(true)

    try {
      await reply({ reviewId, parentId, content })
      toast.success("Вы успешно ответили на рецензию!")
      setContent("")
    } catch(err) {
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }
 
  return (
    <form onSubmit={handleSubmit}
          className="slide-down border border-slate-300 rounded-2xl p-4 transition-colors hover:border-slate-500">
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