import { Film, MessageCircle } from "lucide-react"
import { Post } from "./Post"
import Image from "next/image"
import { isImageFound } from "@/utils/strings"
import { VotesFooter } from "../VotesFooter"
import { getSession } from "@/utils/actions"

async function Footer({ filmId, votes, userLogin }: { filmId: string, votes: any, userLogin?: string }) {
  const voted = userLogin && filmId 
  ? await fetch(`${process.env.API_URL}/film/voted?id=${filmId}&user_login=${userLogin}`).then(res => res.json()) 
  : undefined

  return (
    <div className="flex gap-4 items-center">
      <VotesFooter voted={voted} content={{filmId: filmId}} votes={votes.rating} />
      <a href={`/film/${filmId}`} className="button bg-slate-200"><MessageCircle /> <p>0</p></a>
    </div>
  )
}

export async function FilmPost({ film }: any) {
  const votes    = await fetch(`${process.env.API_URL}/film/votes?id=${film.id}`).then(res => res.json())
  const hasCover = await isImageFound(`/films/banners/${film.link}.png`)
  const session  = await getSession()
  
  return (
    <Post footer={<Footer userLogin={session.userLogin} filmId={film.id} votes={votes} />} 
          title={`${film.title} (${new Date(film.release_date).getFullYear()})`} 
          href={`/film/${film.link}`} icon={<Film />} createdAt={film.created_at} >
      <p className="text-slate-500">{film.description}</p>
      { 
        (hasCover.status === 200) && 
        <Image src={`/films/banners/${film.link}.png`} alt="Film cover" width={1000} height={0} className="w-full h-auto rounded-2xl" /> 
      }
    </Post>
  )
}