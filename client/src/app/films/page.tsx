import { Header } from "@/components/Header"
import { FilmPost } from "@/components/post/FilmPost"
import { Film } from "lucide-react"

export default async function FilmsPage() {
  const films = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/films`, { next: { revalidate: 60000 } }).then(res => res.json())

  return (
    <>
      <Header title="Кино" secondary={`На сайте ${films.length} кино`} icon={<Film />} />
      <div className="flex flex-col p-4 gap-4">
        {
          films.map((film: any) => 
            <FilmPost key={film.id} film={film} />)
        }
      </div>
    </>
  )
}