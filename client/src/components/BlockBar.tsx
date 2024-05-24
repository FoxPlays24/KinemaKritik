import { Loader, Newspaper } from "lucide-react"
import Image from "next/image"

const Block = ({film}: any) => {
  const filmYear = new Date(film.release_date).getFullYear()

  return (
    <a href={`/film/${film.link}`} className="flex justify-center items-center justtify-center group">
      <Image src={`/films/blocks/${film.link}.png`} alt={film.title} title={`${film.title} (${filmYear})`} width={300} height={300} priority className="w-[14.5rem] h-auto my-2 rounded-2xl transition group-hover:brightness-75" />
    </a>
  )
}

export async function BlockBar() {
  const films = await fetch(`${process.env.API_URL}/films`).then(res => res.json())

  return (
    <div className="order-1 hidden lg:flex h-screen">
      <div className="fixed flex flex-col items-center bg-white h-full border border-gray-2 divide-gray-2 shadow-lg px-4 pt-8 select-none">
        <div className="flex flex-col items-center mb-6 mt-20">
          <Newspaper />
          <h2 className="text-xl"> Актуальное</h2>
        </div>
        <div className="flex flex-col">
          { films?.map((film: any) => <Block key={film.id} film={film} />) }
        </div>
      </div>
    </div>
  )
}