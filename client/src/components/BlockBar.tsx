import Image from "next/image"

const Block = ({film}: any) => {
  const filmYear = new Date(film.release_date).getFullYear()

  return (
    <a href={`/film/${film.link}`} className="flex justify-center items-center justtify-center group">
      <Image src={`/films/blocks/${film.link}.png`} alt={film.title} title={`${film.title} (${filmYear})`} width={300} height={300} priority className="w-72 h-auto my-2 rounded-2xl transition group-hover:brightness-75" />
    </a>
  )
}

export async function BlockBar() {
  const films = await fetch(`${process.env.API_URL}/films`).then(res => res.json())

  return (
    <div className="hidden lg:flex justify-start mr-8 h-screen">
      <div className="flex flex-col gap-4 items-center bg-white h-full border border-gray-2 divide-gray-2 shadow-lg px-4 pt-8 select-none">
        <h2 className="text-xl font-semibold">Последнее кино</h2>
        <div className="pr-2 overflow-y-scroll scrollbar-thumb-slate-400 scrollbar-track-transparent scrollbar-thin flex flex-col w-72">
          { films?.map((film: any) => <Block key={film.id} film={film} />) }
        </div>
      </div>
    </div>
  )
}