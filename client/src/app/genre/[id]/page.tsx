import { Header } from "@/components/Header"
import { FilmPost } from "@/components/post/FilmPost"
import { ReviewPost } from "@/components/post/ReviewPost"
import { getSession } from "@/utils/actions"
import { Home } from "lucide-react"
import { notFound } from "next/navigation"

export default async function GenrePage({ params }: any) {
  let genreName = await fetch(`${process.env.API_URL}/genres?id=${params.id}`, { cache: 'no-store' }).then(res => res.json())
  if (!genreName) notFound
  genreName = genreName[0].name
  
  const films = await fetch(`${process.env.API_URL}/films?genre_id=${params.id}`, { cache: 'no-store' }).then(res => res.json())

  return (
    <>
      <Header title={`Жанр "${genreName}"`} secondary={`На сайте ${films.length} кино с жанром "${genreName}"`} icon={<Home />} hasBackButton />
      <div className="flex flex-col p-4 gap-4">
        {
          films.map((film: any) => 
            <FilmPost key={film.id} film={film} />)
        }
      </div>
    </>
  )
}