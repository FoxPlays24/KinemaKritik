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
import { IFilm, IGenre } from "@/utils/types"

function Gallery({film, link} : {film: IFilm, link : string}) {
  const dir = path.join(process.cwd(), "/public/films/shots/", link)

  if (!fs.existsSync(dir)) return

  const images = fs.readdirSync(dir)

  return (
    <div className="flex gap-2 justify-center items-center select-none">
      {
        film.trailer_ytId &&
        <a className="relative flex items-center justify-center group" href={"https://youtu.be/"+film.trailer_ytId}>
          <PlayCircle className="absolute z-10 text-gray-300 w-16 h-auto transition group-hover:scale-110 group-hover:text-white" />
          <Image priority className="rounded-2xl gallery-image aspect-square w-64 h-auto" src={`http://i3.ytimg.com/vi/${film.trailer_ytId}/maxresdefault.jpg`} width={480} height={480} alt="Трейлер" />
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
  date?: Date
  title: string
  info:  string
}

function InfoItem({date, title, info}: InfoItemProps) {
  return (
    <>
    {
      date !== null &&
      (
        date ?
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

function FilmInfo({ film, genres }: { film: IFilm, genres: any }) {
  const releaseDate = new Date(film.release_date).toLocaleString("ru", { year: 'numeric', month: 'long', day:'numeric' })
  const streamsDate = new Date(film.release_date_streams).toLocaleString("ru", { year: 'numeric', month: 'long', day:'numeric' })
  const russiaDate  = new Date(film.release_date_russia).toLocaleString("ru", { year: 'numeric', month: 'long', day:'numeric' })

  return (
    <div className='flex flex-col items-center gap-4'>
      <div className='flex flex-col w-[100%] relative'>
        <InfoItem title="Дата выхода" info={releaseDate} />
        <InfoItem date={film.release_date_streams} title="стриминг-сервисы" info={streamsDate} />
        <InfoItem date={film.release_date_russia} title="в России" info={russiaDate} />
        
        <InfoItem title="Жанр" info={
          genres.map((genre: IGenre, index: number) =>
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

async function FilmHeader({ film, link }: { film: IFilm, link: string }) {
  const hasCover = await isImageFound(`/films/banners/${link}.png`)
  const filmYear = new Date(film.release_date).getFullYear()

  return (
    <>
      { 
        (hasCover.status === 200) ?
        <Image src={`/films/banners/${link}.png`} alt="Film cover" width={1000} height={0} className="w-full h-auto rounded-2xl" /> 
        : <div className="w-full h-52 rounded-2xl bg-slate-300" />
      }
      <div className="flex items-center">
        <h2 className="text-xl font-semibold">{film.title}</h2>
        <p className="ml-auto text-sm">{film.age_limit} {film.original_title} {filmYear}</p>
      </div>
      <hr />
    </>
  )
}

export async function generateStaticParams() {
  const films : [IFilm] = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/films`).then(res => res.json())

  return films.map((film: IFilm) => ({ 
    link: film.link 
  }))
}

export default async function FilmPage({ params }: any) {
  const link : string = params.link
  let film = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/films?link=${link}`).then(res => res.json())
  
  if (!film[0]) notFound()
  film = film[0]

  const session = await getSession()
  const voted = session.userLogin
              ? await fetch(`${process.env.NEXT_PUBLIC_API_URL}/film/voted?id=${film.id}&user_login=${session.userLogin}`).then(res => res.json()) 
              : undefined

  const genres = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/film/genres?id=${film.id}`).then(res => res.json())
  
  return (
    <>  
      <Header hasBackButton title={`${film.film_type} "${film.title}"`} icon={<Film />}/>
      <div className="flex flex-col p-4 gap-4 divide-slate-300">
        <FilmHeader film={film} link={link} />
        <FilmInfo film={film} genres={genres} link={link} />
        <Gallery film={film} link={link} />
        <Vote voted={voted} filmId={film.id} />
        <Reviews isVoted={voted} filmLink={link} />
      </div>
    </>
  )
}