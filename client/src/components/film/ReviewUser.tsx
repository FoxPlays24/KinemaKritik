"use client"

import { CircleHelp, Heart, HeartCrack, SquarePen, Trash2 } from "lucide-react"
import { useLoginModal } from "@/hooks/useModal"
import ReactTextareaAutosize from "react-textarea-autosize"
import { useState } from "react"
import { review, reviewRemove } from "@/utils/actions"
import toast from "react-hot-toast"

function NewReview({ filmLink, id, hidden, disabled, isVoted, userReview }: { filmLink: string, id: string, hidden: boolean, disabled: boolean, isVoted: number, userReview: any }) {
  if(!userReview) return

  userReview = userReview[0]

  const [title, setTitle]     = useState(userReview?.title || "")
  const [content, setContent] = useState(userReview?.content || "")

  const [deleteConfirm, setDeleteConfirm] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setIsLoading(true)

    try {
      await review({ filmLink, title, content })
      toast.success("Рецензия успешно " + (userReview[0] ? "отредактирована" : "опубликована") + "!")
    } catch(err) {
      console.error(err)
    } finally {
      if(userReview) {
        userReview.title = title
        userReview.content = content
      }
      setIsLoading(false)
    }
    
  }

  async function handleDelete() {
    setIsLoading(true)
    if (!deleteConfirm) {
      setDeleteConfirm(true)
      setTimeout(() => {
        setDeleteConfirm(false)
      }, 5000)
    }
    else {
      await reviewRemove(userReview.id)
      toast.success("Рецензия успешно удалена!")
      setTitle("")
      setContent("")
      setDeleteConfirm(false)
    }
    setIsLoading(false)
  }

  return (
    <form id={id} hidden={hidden} onSubmit={handleSubmit} 
          className="slide-down border border-slate-300 rounded-2xl p-4 transition-colors hover:border-slate-500">
      <div className="flex flex-col gap-4 mb-4">
        <div className="flex gap-2 items-center">
          { isVoted > 0 ? <Heart /> : <HeartCrack className="text-rose-500" /> }
          <input name="title" value={title} onChange={e => setTitle(e.target.value)} disabled={disabled} maxLength={60} 
            placeholder="Заголовок" className="text-xl w-full focus:outline-none" />
        </div>
        <ReactTextareaAutosize name="content" value={content} onChange={e => setContent(e.target.value)} disabled={disabled} maxLength={2500} 
          placeholder="Содержание" className="transition-transform whitespace-pre-line leading-relaxed focus:outline-none resize-none" />
      </div>
      <div className="flex gap-2 items-center">
        <div className="flex gap-1 text-lg mr-auto">
          {content.length} / 2500
        </div>
        {
          userReview &&
          <button type="button" onClick={handleDelete} disabled={isLoading}
          className={ deleteConfirm ? "bg-rose-700 hover:bg-rose-800 active:bg-rose-900 text-white button" : "bg-rose-500 hover:bg-rose-700 active:bg-rose-800 text-white button" }>
            { deleteConfirm ? <CircleHelp /> : <Trash2 /> }
          </button>
        }
        <button disabled={(userReview?.title==title && userReview?.content==content) || isLoading || !title.length || !content.length || disabled} type="submit" 
          className="bg-blue-500 disabled:text-slate-300 disabled:bg-slate-200 hover:bg-blue-700 active:bg-blue-800 text-white button">
          { userReview ? "Отредактировать" : "Опубликовать" }
        </button>
      </div>
    </form>
  )
}

export function ReviewUser({ filmLink, isLoggedIn, isVoted, review }: { filmLink: string, isLoggedIn: boolean, isVoted: number, review: any }) {
  const loginModal = useLoginModal()

  const [isHidden, setIsHidden] = useState(true)
  
  function fetchClick() {
    if (isLoggedIn)
      setIsHidden(!isHidden)
    else
      loginModal.onOpen()
  }

  return (
    <div className="flex flex-col gap-4 select-none">
      <button disabled={!isVoted} onClick={fetchClick} className="button bg-slate-200"><SquarePen />
        { review && review[0] ? "Редактировать" : "Написать" } рецензию
      </button>
      <NewReview filmLink={filmLink} userReview={review} id="review" disabled={!isVoted} hidden={isVoted==0 || isHidden} isVoted={isVoted} />
    </div>
  )
}