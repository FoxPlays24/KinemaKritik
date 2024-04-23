import { useLocation } from 'react-router-dom'
import { getFilm, getFilmLiked, getFilmLikes, getGenres } from '../api/films.ts'
import { getReviews } from '../api/reviews.ts'

import { FaPlay } from 'react-icons/fa'
import { BiSolidLike } from 'react-icons/bi'

import Review from '../components/Review.tsx'
import ReviewPostComponent from '../components/ReviewPostComponent.tsx'

import { AuthContext } from '../context/authContext.js'
import { useContext } from 'react'
import { useRegisterModal } from '../hooks/useAuthModal.ts'

import axios from 'axios'

import Header from '../components/Header.tsx'

const getImage = (locate) => {
  try {
    const img = require('../img/'+locate)
    return img
  } catch (err) {
    return null
  }
}

const FilmLikes = (filmId) => {
  const { currentUser } = useContext(AuthContext)
  const { data: likes, mutate: mutateLikes } = getFilmLikes(filmId)
  const { data: liked, mutate: mutateLiked } = getFilmLiked(filmId,currentUser ? currentUser.id : null)

  const registerModal = useRegisterModal()

  let isLoading = false

  const like = async (selectedValue) => {
    if(!currentUser)
      return registerModal.onOpen()

    let value = (liked === selectedValue) ? 0 : selectedValue
    isLoading = true

    await axios.post(`${process.env.REACT_APP_API_URL}/films/like`, {
      "user_id": currentUser.id,
      "film_id": filmId,
      "liked": value
    })
    
    mutateLikes(likes, value)
    mutateLiked(liked, value)

    isLoading = false
  }

  return (
  <div className='flex justify-center gap-6'>
    <button disabled={isLoading} onClick={() => like(1)}>
      {liked===1 
      ? <BiSolidLike className='size-6 transition hover:scale-90 text-red-600 hover:opacity-70 disabled:opacity-50'/>
      : <BiSolidLike className='size-6 transition hover:scale-125 hover:opacity-70 disabled:opacity-50'/>
      }
    </button>
    {
      likes > 0
      ? <span className='text-red-600 font-semibold text-xl select-none'>{'+'+likes}</span>
      : <span className='text-purple-800 font-semibold text-xl select-none'>{likes}</span>
    }
    <button disabled={isLoading} onClick={() => like(-1)}>
      {liked===-1 
      ? <BiSolidLike className='size-6 transition -scale-100 hover:-scale-90 text-purple-800 hover:opacity-70 disabled:opacity-50'/>
      : <BiSolidLike className='size-6 transition -scale-100 hover:-scale-125 hover:opacity-70 disabled:opacity-50'/>
      }
    </button>
  </div>
  )
}

const Film = () => {
  const filmId = parseInt(useLocation().pathname.split("/")[2])

  const { data: film, isFilmLoading } = getFilm(filmId)
  const { data: genres, isGenresLoading } = getGenres(filmId)
  const { data: reviews, isReviewsLoading } = getReviews(filmId)

  const likes = FilmLikes(filmId)
  const reviewPost = ReviewPostComponent(filmId)
  
  if ((isFilmLoading || !film) || (isGenresLoading || !genres) || (isReviewsLoading || !reviews)) {
    return (
    <>
    Загрузка
    </>
    )
  }

  if(!film)
    return (
    <>
    404 Кино не найдено :(
    </>
    )
  
  const banner = getImage(`movies/banners/${filmId}.png`)
  const trailer = getImage(`movies/trailer/${filmId}.png`)

  return (
    <div className='flex flex-col'>
      <Header showBackArrow={true} label={`${film.title} (${new Date(film.release_date).getFullYear()})` } />
      {
        banner ? <img src={banner} alt='Banner' className='rounded-md' loading='eager' /> 
        : <div className='bg-repeat h-52 rounded-md' style={{backgroundImage: `url(${require('../img/misc/placeholder.png')})`}} />
      }
      <div className='grid grid-rows-2 mt-8'>
        <div className='flex flex-row items-center'>
          <div className='flex gap-2 font-roboto items-center'>
            <span className='text-2xl font-medium'>{film.title}</span>
          </div>
          <span className='text-sm font-roboto text-end ml-auto'>{film.age_limit} {film.original_title} {new Date(film.release_date).getFullYear()}</span>
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
            <span className='font-medium absolute right-0'>{film.country}</span>
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
          <a href=
          {film.id===0 ? 'https://youtu.be/bK6ldnjE3Y0' :
           film.id===1 ? '' :
           'https://youtu.be/n9xhJrPXop4'} className='relative'>
            <div className='absolute z-10 translate-x-1/2 translate-y-14'>
              <span className='flex items-center gap-2 text-white font-semibold text-2xl'>{<FaPlay />} Трейлер</span>
            </div>
            <img src={trailer} alt='Trailer' className='rounded-2xl brightness-50 transition hover:brightness-75 w-[460px]' />
          </a>
        }
      </div>
      <hr className="h-px my-8 bg-zinc-600 border-0"></hr>
      <span className='flex justify-center font-semibold mb-4'>Оцените {film.film_type.toLowerCase()}!</span>
      {likes}
      <hr className="h-px my-8 bg-zinc-600 border-0"></hr>
      
      <div className='flex flex-col gap-8'>
        <span className='flex justify-center font-semibold'>Рецензии</span>
        {reviewPost}
        {
          reviews.length > 0 ?
          <div className='flex flex-col gap-4 mb-16'>
            {reviews.map(review => (
                <Review review={review} />
            ))}
          </div>
          :
          <span className='flex justify-center select-none'>Рецензий пока нет... :(</span>
        }
      </div>
    </div>
  )
}

export default Film