import { useLocation } from 'react-router-dom'
import { getFilm, getGenres } from '../api/films.ts'

import { FaPlay } from 'react-icons/fa'

const getImage = (locate) => {
  try {
    const img = require('../img/'+locate)
    return img
  } catch (err) {
    return null
  }
}

const Film = () => {
  const filmId = parseInt(useLocation().pathname.split("/")[2])

  const { data: film, isFilmLoading } = getFilm(filmId)
  const { data: genres, isGenresLoading } = getGenres(filmId)

  if ((isFilmLoading || !film) || (isGenresLoading || !genres)) {
    return (
      <>
      Загрузка
      </>
    )
  }
  
  const banner = getImage(`movies/banners/${filmId}.png`)
  const trailer = getImage(`movies/trailer/${filmId}.png`)

  return (
    <>
      {
        banner ? <img src={banner} alt='Banner' className='rounded-md' loading='eager' /> 
        : <div className='bg-repeat h-52 rounded-md' style={{backgroundImage: `url(${require('../img/misc/placeholder.png')})`}} />
      }
      <div className='grid grid-rows-2 mt-8'>
        <div className='flex flex-row items-center'>
          <div className='flex gap-2 font-roboto items-center'>
            <span className='text-2xl font-medium'>{film[0].title}</span>
            <span className={`text-sm`}>+240</span>
          </div>
          <span className='text-sm font-roboto text-end ml-auto'>{film[0].age_limit} {film[0].original_title} {new Date(film[0].release_date).getFullYear()} Кристофер Нолан</span>
        </div>

        <div className='flex flex-row items-center'>
          <div className='flex flex-row gap-4 select-none'>
            <a href='.' className={`text-sm text-white bg-black rounded-2xl px-11 py-2 cursor-default`}>
              Инфо
            </a>
            <a href='.' className='text-sm bg-white rounded-2xl px-11 py-2 border-black border transition hover:bg-zinc-200'>
              Рецензии
            </a>
            <a href='.' className='text-sm bg-white rounded-2xl px-11 py-2 border-black border transition hover:bg-zinc-200'>
              Состав
            </a>
          </div>
          <div className='flex flex-row items-center justify-end ml-auto'>
            <img src={require('../img/awards/SAG.png')} alt='SAG' className='w-[48px] h-[48px] p-1 object-contain' />
            <img src={require('../img/awards/Saturn.png')} alt='Saturn' className='w-[48px] h-[48px] p-1 object-contain' />
            <img src={require('../img/awards/BAFTA.png')} alt='BAFTA' className='w-[48px] h-[48px] p-1 object-contain' />
            <img src={require('../img/awards/Golden Globe.png')} alt='Golden Globe' className='w-[48px] h-[48px] p-1 object-contain' />
            <img src={require('../img/awards/Oscar.png')} alt='Oscar' className='w-[48px] h-[48px] p-1 object-contain' />
          </div>
        </div>
      </div>
      <div className='flex flex-row items-center mt-8 select-none gap-8'>
        <div className='flex flex-col w-[100%] relative'>
          {/* Dates */}
          <div>
            <span>Дата выхода</span>
            <span className='font-medium absolute right-0'>{new Date(film[0].release_date).toLocaleString("ru", { year: 'numeric', month: 'long', day:'numeric' })}</span>
          </div>
          {
            film[0].release_date_streams &&
            <div className='text-zinc-400'>
              <span>{'>'} стриминг-сервисы</span>
              <span className='absolute right-0'>{new Date(film[0].release_date_streams).toLocaleString("ru", { year: 'numeric', month: 'long', day:'numeric' })}</span>
            </div>
          }
          {
            film[0].release_date_russia &&
            <div className='text-zinc-400'>
              <span>{'>'} в России</span>
              <span className='absolute right-0'>{new Date(film[0].release_date_russia).toLocaleString("ru", { year: 'numeric', month: 'long', day:'numeric' })}</span>
            </div>
          }
          {/* Genres */}
          <div>
            <span>Жанр</span>
            <span className='absolute right-0'>
              {genres.map((genre, index) => (
                <span>
                  <a href={`/genre/${genre.id}`} className='font-medium'>{genre.name}</a>
                  {index !== genres.length-1 && ' / '}
                </span>
              ))}
            </span>
          </div>
          {/* Country */}
          <div>
            <span>Страна</span>
            <span className='font-medium absolute right-0'>США / Великобритания</span>
          </div>
          {/* Rating */}
          <div>
            <span>Рейтинг</span>
            <span className='font-medium absolute right-0'>{film[0].age_limit}</span>
          </div>
        </div>
        {/* Trailer */}
        {
          trailer &&
          <a href='https://youtu.be/bK6ldnjE3Y0' className='relative'>
            <div className='absolute z-10 translate-x-1/2 translate-y-14'>
              <span className='flex items-center gap-2 text-white font-semibold text-2xl'>{<FaPlay />} Трейлер</span>
            </div>
            <img src={trailer} alt='Trailer' className='rounded-2xl brightness-50 transition hover:brightness-75 w-[460px]' />
          </a>
        }
      </div>
    </>
  )
}

export default Film