import { Header } from "@/components/Header"
import { FilmPost } from "@/components/post/FilmPost"
import { ReviewPost } from "@/components/post/ReviewPost"
import { Home } from "lucide-react"

export default async function MainPage() {
  const films = await fetch(`${process.env.API_URL}/films`, { cache: 'no-store' }).then(res => res.json())
  const reviews = await fetch(`${process.env.API_URL}/reviews`, { cache: 'no-store' }).then(res => res.json())

  return (
    <>
      <Header title="Лента" icon={<Home />}/>
      <div className="flex flex-col p-4 gap-4">
        {
          films.map((film: any) => 
            <FilmPost key={film.id} film={film} />)
        }
        {
          reviews.map((review: any) => 
            <ReviewPost key={review.id} review={review} />)
        }
      </div>
    </>
  )
}