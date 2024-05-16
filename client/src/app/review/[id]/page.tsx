import { Header } from "@/components/Header"
import { VotesFooter } from "@/components/VotesFooter"
import { Replies } from "@/components/review/Replies"
import { ReplyUser } from "@/components/review/ReplyUser"
import { getSession } from "@/utils/actions"
import { bufferToBase64 } from "@/utils/strings"
import { Heart, HeartCrack, SquareGanttChart } from "lucide-react"
import Image from "next/image"
import { notFound } from "next/navigation"

export default async function ReviewPage({ params }: any) {
  const reviewId = params.id
  const review = await fetch(`${process.env.API_URL}/reviews?id=${reviewId}`, { cache: 'no-store' }).then(res => res.json())
  
  if (!review[0]) notFound()

  const votes = await fetch(`${process.env.API_URL}/review/votes?id=${review[0].id}`).then(res => res.json())
  const session = await getSession()
  const voted = session.userLogin && reviewId
                && await fetch(`${process.env.API_URL}/review/voted?id=${reviewId}&user_login=${session.userLogin}`).then(res => res.json()) 
  
  return (
    <> 
      <Header hasBackButton title={<p>Рецензия #{review[0].id} на  <a className="link" href={`/film/${review[0].link}`}>{review[0].film_title}</a></p>} icon={<SquareGanttChart />}/>
      <div className="flex flex-col p-4 gap-4 divide-slate-300 mb-32">
        <div className="flex flex-col p-4 gap-2 border border-slate-300 rounded-2xl">
          <a href={`/user/${review[0].login}`} className="flex items-center gap-2 transition-colors hover:text-blue-400 border border-slate-300 hover:border-blue-400 px-2 py-1 rounded-2xl">
            <Image src={bufferToBase64(review[0].profile_image)||"/placeholders/profile.png"} alt="Профиль" width={64} height={0} className="relative w-12 h-auto rounded-full" />
            <p>{review[0].username}</p>
          </a>
          <div className="flex gap-2 items-center mb-2">
            {review[0].voted>0 ? <Heart /> : <HeartCrack className="text-rose-500" />}
            <h2 className="text-2xl font-semibold">{review[0].title}</h2>
          </div>
          <p className="text-xl whitespace-pre-line leading-relaxed">{review[0].content}</p>
        </div>
        <VotesFooter voted={voted} content={{reviewId: reviewId}} votes={votes} />
        <h2 className="text-xl font-semibold">Ответы</h2>
        <hr />
        <Replies review={review[0]} />
      </div>
    </>
  )
}