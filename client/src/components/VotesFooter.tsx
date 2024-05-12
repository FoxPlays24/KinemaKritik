"use client"

import { useLoginModal } from "@/hooks/useModal"
import { vote } from "@/utils/actions"
import { ThumbsDown, ThumbsUp } from "lucide-react"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

export interface VotesFooterProps {
  content?: any
  votes:    number
  voted:    number
}

export function VotesFooter({votes, content, voted}: VotesFooterProps) {
  const [curVotes, setCurVotes] = useState<number>(votes)
  const [userVote, setUserVote] = useState(voted)

  const loginModal = useLoginModal()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setCurVotes(votes)
  }, [votes])
  
  useEffect(() => {
    setUserVote(voted)
  }, [voted])

  async function fetchClick(value: number) {
    const isCanceled = (value === userVote)
    const newValue = isCanceled ? 0 : value
    
    try {
      setIsLoading(true)

      await vote(content, newValue)

      setCurVotes(isCanceled ? +curVotes-userVote : +curVotes-userVote + value)
      setUserVote(newValue)
    } catch (err: any) {
      if (err.message == "401") {
        toast.error("Чтобы оставить оценку, вы должны войти в профиль")
        return loginModal.onOpen()
      }

      setCurVotes(votes)
      setUserVote(voted)

      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex gap-4 items-center">
      <div className="flex gap-2 items-center bg-slate-200 rounded-2xl px-1 py-1">
        <button disabled={isLoading} onClick={() => fetchClick(1)} className="button">
          <ThumbsUp className={userVote && userVote>0 ? "text-blue-500" : ""} />
        </button>

        <div className="font-semibold text">
          <p className={userVote ? userVote>0 ? "text-blue-700" : userVote<0 ? "text-rose-700" : "" : ""}>
            { curVotes ? (curVotes>0 ? "+" : "") + curVotes : 0 }
          </p>
        </div>

        <button disabled={isLoading} onClick={() => fetchClick(-1)} className="button">
          <ThumbsDown className={userVote && userVote<0 ? "text-rose-600" : ""} />
        </button>
      </div>
    </div>
  )
}