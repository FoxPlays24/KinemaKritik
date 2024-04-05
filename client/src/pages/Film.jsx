import { useEffect, useState } from 'react'
import axios from 'axios'
import { useLocation } from 'react-router-dom'

import { FaPlay } from "react-icons/fa";

const Film = () => {
  const filmId = parseInt(useLocation().pathname.split("/")[2])

  const [film,setFilm] = useState([])
  const [banner,setBanner] = useState([])
  const [trailer,setTrailer] = useState([])
  const [primaryColor, setPrimaryColor] = useState([])
  const [genres,setGenres] = useState([])
  
  useEffect(() => {
    const fetchFilm = async () => {
      try {
        const res = await axios.get(`http://localhost:80/films/${filmId}`)
        setFilm(res.data[0])
        setPrimaryColor(res.data[0].page_primary_color.length ? res.data[0].page_primary_color : '#000')
      } catch (err) {
        console.error(err)
      }
    }
    fetchFilm()

    const fetchBanner = async () => {
      try {
        const img = require(`../img/movies/banners/${filmId}.png`)
        setBanner(img)
      } catch (err) {
        setBanner(null)
      }
    }
    fetchBanner()

    const fetchTrailer = async () => {
      try {
        const img = require(`../img/movies/trailer/${filmId}.png`)
        setTrailer(img)
      } catch (err) {
        setTrailer(null)
      }
    }
    fetchTrailer()

    const fetchGenres = async () => {
      try {
        const res = await axios.get(`http://localhost:80/films/${filmId}/genres`)
        setGenres(res.data)
      } catch (err) {
        console.error(err)
      }
    }
    fetchGenres()
  }, [filmId])

  return (
    <>
      {
        banner ? <img src={banner} alt='Banner' className='rounded-md' loading='eager' /> 
        : <div className='bg-repeat h-52 rounded-md' style={{backgroundImage: `url(${require('../img/misc/placeholder.png')})`}} />
      }
      <div className='grid grid-rows-2 mt-8'>
        <div className='flex flex-row items-center'>
          <div className='flex gap-2 font-roboto items-center'>
            <span className='text-2xl font-medium'>{film.title}</span>
            <span className={`text-[${primaryColor}] text-sm`}>+240</span>
          </div>
          <span className='text-sm font-roboto text-end ml-auto'>{film.age_limit} {film.original_title} {new Date(film.release_date).getFullYear()} Кристофер Нолан</span>
        </div>

        <div className='flex flex-row items-center'>
          <div className='flex flex-row gap-4 select-none'>
            <a href='.' className={`text-sm text-white bg-[${primaryColor}] rounded-2xl px-11 py-2 cursor-default`}>
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
            <span className='font-medium absolute right-0'>{new Date(film.release_date).toLocaleString("ru", { year: 'numeric', month: 'long', day:'numeric' })}</span>
          </div>
          {
            film.release_date_streams &&
            <div className='text-zinc-400'>
              <span>{'>'} стриминг-сервисы</span>
              <span className='absolute right-0'>{new Date(film.release_date_streams).toLocaleString("ru", { year: 'numeric', month: 'long', day:'numeric' })}</span>
            </div>
          }
          {
            film.release_date_russia &&
            <div className='text-zinc-400'>
              <span>{'>'} в России</span>
              <span className='absolute right-0'>{new Date(film.release_date_russia).toLocaleString("ru", { year: 'numeric', month: 'long', day:'numeric' })}</span>
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
            <span className='font-medium absolute right-0'>{film.age_limit}</span>
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