import { Heart, HeartCrack, MessageCircle } from "lucide-react"
import { Post } from "./Post"
import Image from "next/image"
import { bufferToBase64 } from "@/utils/strings"
import { VotesFooter } from "../VotesFooter"
import moment from "moment"
import { IReview } from "@/utils/types"

export async function ReviewPost({ review, isFilmPage = false, userLogin }: { review: IReview, isFilmPage?: boolean, userLogin?: string }) {
  function Header() {
    return (
      <div className="flex gap-1 items-center mb-2 select-none">
        <a href={`/user/${review.login}`} className="flex gap-2 items-center transition-colors hover:text-blue-400 border border-slate-300 hover:border-blue-400 px-2 py-1 rounded-2xl">
          <Image src={bufferToBase64(review.profile_image)||"/placeholders/profile.png"} alt="Профиль" width={32} height={32} className="relative w-6 h-6 rounded-full" />
          <p>{review.username}</p>
        </a>
        {
          !isFilmPage &&
          <>
            <span className="text-slate-500">о кино</span>
            <a href={`/film/${review.link}`} className="link">{review.film_title}</a>
          </>
        }
        <p className="text-slate-400 ml-auto text-right">{moment(review.created_at).format('ll')}</p>
      </div>
    )
  }

  async function Footer() {
    const votes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/review/votes?id=${review.id}`).then(res => res.json())
    const voted = userLogin && review.id
                  && await fetch(`${process.env.NEXT_PUBLIC_API_URL}/review/voted?id=${review.id}&user_login=${userLogin}`).then(res => res.json()) 
    const replies = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/review/replies?id=${review.id}`).then(res => res.json())
    
    return (
      <div className="flex gap-4 items-center">
        <VotesFooter voted={voted} content={{reviewId: review.id}} votes={votes.rating} />
        <a href={`/review/${review.id}`} className="button bg-slate-200"><MessageCircle /> {replies}</a>
      </div>
    )
  }

  return (
    <Post header={<Header />} 
          footer={<Footer />} 
          title={review.title} href={`/review/${review.id}`} 
          icon={review.voted>0 ? <Heart /> : <HeartCrack className="text-rose-500" />}>
      <p className="text-slate-500 line-clamp-6 whitespace-pre-line leading-relaxed">{review.content}</p>
    </Post>
  )
}