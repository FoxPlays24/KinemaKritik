import React, { useCallback, useContext, useState } from 'react'
import { FaHeart, FaHeartBroken } from 'react-icons/fa'
import { AuthContext } from '../context/authContext'
import { getFilmLiked } from '../api/films.ts'
import axios from 'axios'
import toast from 'react-hot-toast'
import { getUserReview } from '../api/reviews.ts'

const ReviewPostComponent = (filmId) => {
  const { currentUser } = useContext(AuthContext)
  const { data: liked } = getFilmLiked(filmId,currentUser?.id)

  const { data: review, isLoading: isReviewLoading } = getUserReview(filmId,currentUser?.id)
  let isReview = !(isReviewLoading || !review)

  const [inputs,setInputs] = useState({
    title: '',
    content: '',
  })

  if(isReview && (!(inputs.title.length && inputs.content.length))) {
    setInputs({title: review.title, content: review.content})
  }

  const remove = useCallback(async () => {
    if(!isReview) return
    try {
      await axios.post('http://localhost:3001/review/remove/', { "review_id": review.id })
      window.location.reload()
      toast.success('Рецензия успешно удалена!')
    } catch (err) {
      toast.error(err.response.data)
    }
  }, [isReview, review])
  
  const publish = useCallback(async () => {
    if(!currentUser) return
    try {
      await axios.post('http://localhost:3001/review', {
        "user_id": currentUser.id,
        "film_id": filmId,
        "title": inputs.title,
        "content": inputs.content
      })
      window.location.reload()
      isReview 
      ? toast.success('Рецензия успешно отредактирована!')
      : toast.success('Рецензия успешно оставлена!')
    } catch (err) {
      toast.error(err.response.data)
    }
  }, [currentUser, filmId, inputs, isReview])

  const handleInput = (e) => {
    setInputs(prev => ({...prev, [e.target.name]: e.target.value}))
  }

  if(liked !== -1 && liked !== 1)
    return

  return (
  <div className='flex flex-col gap-4 mb-8'>
    <span className='font-semibold text-xl'>Ваша рецензия:</span>
    <div className='flex flex-col bg-zinc-200 rounded p-3 shadow-md border border-zinc-300'>
      <h3 className='flex items-center gap-2 font-semibold text-xl mb-2'>
        {
          liked === 1
          ? <FaHeart className='text-red-600'/>
          : <FaHeartBroken className='text-purple-800'/>
        }
        <input name='title' onChange={handleInput} className='w-full rounded-md p-1 bg-transparent' value={inputs.title} placeholder='Заголовок' />
      </h3>
      <textarea name='content' onChange={handleInput} value={inputs.content} className='leading-relaxed text-sm bg-transparent' placeholder='Контент' />
      <div className='flex justify-end gap-4'>
      {
        isReview &&
        <button onClick={remove} className='bg-white px-4 py-2 rounded-full text-red-800 font-medium mt-4 transition hover:scale-105 hover:bg-pink-50'>Уничтожить</button>
      }
      <button onClick={publish} className='bg-white px-4 py-2 rounded-full font-medium mt-4 transition hover:scale-105 hover:bg-zinc-100'>
        {isReview ? 'Отредактировать' : 'Опубликовать'}
      </button>
      </div>
    </div>
  </div>
  );
}

export default ReviewPostComponent