import { Header } from "@/components/Header"
import { VotesFooter } from "@/components/VotesFooter"
import { Replies } from "@/components/review/Replies"
import { ReplyUser } from "@/components/review/ReplyUser"
import { getSession } from "@/utils/actions"
import { bufferToBase64 } from "@/utils/strings"
import { Heart, HeartCrack, NotebookPen } from "lucide-react"
import Image from "next/image"
import { notFound } from "next/navigation"

export default async function ReviewPage({ params }: any) {
  const reviewId = params.id
  let review = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews?id=${reviewId}`, { cache: 'no-store' }).then(res => res.json())
  
  if (!review[0]) notFound()
  review = review[0]

  const votes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/review/votes?id=${review.id}`).then(res => res.json())
  const session = await getSession()
  const voted = session.userLogin && reviewId
                && await fetch(`${process.env.NEXT_PUBLIC_API_URL}/review/voted?id=${reviewId}&user_login=${session.userLogin}`).then(res => res.json())

  return (
    <> 
      <Header hasBackButton title={<p>Рецензия #{review.id} на  <a className="link" href={`/film/${review.link}`}>{review.film_title}</a></p>} icon={<NotebookPen />}/>
      <div className="flex flex-col p-4 gap-4 divide-slate-300 mb-32">
        <div className="flex flex-col p-4 gap-2 border border-slate-300 rounded-2xl">
          <a href={`/user/${review.login}`} className="flex items-center gap-2 transition-colors hover:text-blue-400 border border-slate-300 hover:border-blue-400 px-2 py-1 rounded-2xl">
            <Image src={bufferToBase64(review.profile_image)||"/placeholders/profile.png"} alt="Профиль" width={64} height={0} className="relative w-12 h-auto rounded-full" />
            <p>{review.username}</p>
          </a>
          <div className="flex gap-2 items-center mb-2">
            {review.voted>0 ? <Heart /> : <HeartCrack className="text-rose-500" />}
            <h2 className="text-2xl font-semibold">{review.title}</h2>
          </div>
          <p className="text-xl whitespace-pre-line leading-relaxed">{review.content}</p>
        </div>
        <div className="flex gap-4 items-center select-none">
          <VotesFooter voted={voted} content={{reviewId: reviewId}} votes={votes.rating} />
          <p className="text-lg">Кол-во оценок: {votes?.count || 0}</p>
        </div>
        <h2 className="text-xl font-semibold">Ответы</h2>
        <hr />
        { session.isLoggedIn && <ReplyUser reviewId={review.id} /> }
        <Replies review={review} />
      </div>
    </>
  )
}