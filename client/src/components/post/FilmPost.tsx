import { Film, MessageCircle } from "lucide-react"
import { Post } from "./Post"
import Image from "next/image"
import { isImageFound } from "@/utils/strings"
import { VotesFooter } from "../VotesFooter"
import { getSession } from "@/utils/actions"

export async function FilmPost({ film }: any) {
  const votes    = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/film/votes?id=${film.id}`).then(res => res.json())
  const reviews  = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/film/reviews?id=${film.id}`).then(res => res.json())
  const hasCover = await isImageFound(`/films/banners/${film.link}.png`)
  const session  = await getSession()
  
  async function Footer() {
    const voted = session.userLogin && film.id 
    ? await fetch(`${process.env.NEXT_PUBLIC_API_URL}/film/voted?id=${film.id}&user_login=${session.userLogin}`).then(res => res.json()) 
    : undefined
    
  
    return (
      <div className="flex gap-4 items-center">
        <VotesFooter voted={voted} content={{filmId: film.id}} votes={votes.rating} />
        <a href={`/film/${film.link}`} className="button bg-slate-200"><MessageCircle /> <p>{reviews.count}</p></a>
      </div>
    )
  }
  
  return (
    <Post footer={<Footer />} 
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