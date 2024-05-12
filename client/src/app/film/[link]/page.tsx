import { Header } from "@/components/Header"
import { isImageFound } from "@/utils/strings"
import { Film, PlayCircle } from "lucide-react"
import Image from "next/image"
import { notFound } from "next/navigation"
import path from "path"
import fs from "fs"
import { GalleryImage } from "@/components/GalleryImage"
import { Reviews } from "@/components/film/Reviews"
import { Vote } from "@/components/film/Vote"
import { getSession } from "@/utils/actions"

function Gallery({film, link} : {film: any, link : string}) {
  const dir = path.join(process.cwd(), "/public/films/shots/", link)

  if (!fs.existsSync(dir)) return

  const images = fs.readdirSync(dir)

  return (
    <div className="flex gap-2 justify-center items-center select-none">
      {
        film.trailer_ytId &&
        <a className="relative flex items-center justify-center group" href={"https://youtu.be/"+film.trailer_ytId}>
          <PlayCircle className="absolute z-10 text-gray-300 size-16 transition group-hover:scale-110 group-hover:text-white" />
          <Image priority className="rounded-2xl gallery-image aspect-square size-64" src={`http://i3.ytimg.com/vi/${film.trailer_ytId}/maxresdefault.jpg`} width={480} height={480} alt="Трейлер" />
        </a>
      }
      
      <div className="grid grid-cols-3 grid-rows-2">
        {
          images.map((image: string) =>
            <GalleryImage key={image} image={`/films/shots/${link}/${image}`}/>)
        }
      </div>
    </div>
  )
}

interface InfoItemProps {
  condition?: boolean
  title:      string
  info:       string
}

function InfoItem({condition, title, info}: InfoItemProps) {
  return (
    <>
    {
      condition !== null &&
      (
        condition ?
        <div className="text-slate-400">
          <span>{">"} {title}</span>
          <span className="absolute right-0">{info}</span>
        </div>
        :
        <div>
          <span>{title}</span>
          <span className="absolute right-0">{info}</span>
        </div>
      )
    }
    </>
  )
}

function FilmInfo({film, genres}: any) {
  return (
    <div className='flex flex-col items-center gap-4'>
      <div className='flex flex-col w-[100%] relative'>
        <InfoItem title="Дата выхода" info={new Date(film.release_date).toLocaleString("ru", { year: 'numeric', month: 'long', day:'numeric' })} />
        <InfoItem condition={film.release_date_streams} title="стриминг-сервисы" info={new Date(film.release_date_streams).toLocaleString("ru", { year: 'numeric', month: 'long', day:'numeric' })} />
        <InfoItem condition={film.release_date_russia} title="в России" info={new Date(film.release_date_russia).toLocaleString("ru", { year: 'numeric', month: 'long', day:'numeric' })} />
        
        <InfoItem title="Жанр" info={
          genres.map((genre: any, index: number) =>
            <span key={genre.id}>
              <a href={`/genre/${genre.id}`} className='link'>{genre.name}</a>
              {index !== genres.length-1 && ' / '}
            </span>
        )} />

        <InfoItem title="Страна" info={film.country} />
        <InfoItem title="Рейтинг" info={film.age_limit} />
        <InfoItem title="Режиссер" info={film.director} />
      </div>
    </div>
  )
}

async function FilmHeader({ film, link }: any) {
  const hasCover = await isImageFound(`/films/banners/${link}.png`)

  return (
    <>
      { 
        (hasCover.status === 200) ?
        <Image src={`/films/banners/${link}.png`} alt="Film cover" width={1000} height={0} className="w-full h-auto rounded-2xl" /> 
        : <div className="w-full h-52 rounded-2xl bg-slate-300" />
      }
      <div className="flex items-center">
        <h2 className="text-xl font-semibold">{film.title}</h2>
        <p className="ml-auto text-sm">{film.age_limit} {film.original_title} {new Date(film.release_date).getFullYear()}</p>
      </div>
      <hr />
    </>
  )
}

export async function generateStaticParams() {
  const films = await fetch(`${process.env.API_URL}/films`).then(res => res.json())

  return films.map((film: any) => ({ 
    link: film.link 
  }))
}

export default async function FilmPage({ params }: any) {
  const link : string = params.link
  const film = await fetch(`${process.env.API_URL}/films?link=${link}`).then(res => res.json())
  
  if (!film[0]) notFound()

  const session = await getSession()
  const voted = session.userLogin
              ? await fetch(`${process.env.API_URL}/film/voted?id=${film[0].id}&user_login=${session.userLogin}`).then(res => res.json()) 
              : undefined

  const genres = await fetch(`${process.env.API_URL}/film/genres?id=${film[0].id}`).then(res => res.json())
  
  return (
    <>
      <Header hasBackButton title="Кино" icon={<Film />}/>
      <div className="flex flex-col p-4 gap-4 divide-slate-300">
        <FilmHeader film={film[0]} link={link} />
        <FilmInfo film={film[0]} genres={genres} link={link} />
        <Gallery film={film[0]} link={link} />
        <Vote voted={voted} filmId={film[0].id} />
        <Reviews isVoted={voted} filmLink={link} />
      </div>
    </>
  )
}