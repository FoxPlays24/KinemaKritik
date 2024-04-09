import React, { useContext } from 'react'

import { FaHeart } from 'react-icons/fa'
import { FaHeartBroken } from 'react-icons/fa'
import { BiSolidLike } from 'react-icons/bi'

import profile from '../img/misc/placeholder_profile.png'
import { getReviewLikes, getReviewLiked } from '../api/reviews.ts'

import axios from 'axios'
import { AuthContext } from '../context/authContext.js'
import { useRegisterModal } from '../hooks/useAuthModal.ts'

const formatDate = (date) => {
    let year   = new Intl.DateTimeFormat('en', { year: '2-digit' }).format(date)
    let month  = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(date)
    let day    = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date)
    let hour   = new Intl.DateTimeFormat('en', { hour: '2-digit', hour12: false }).format(date)
    let minute = new Intl.DateTimeFormat('en', { minute: '2-digit' }).format(date)
    
    return `${day}.${month}.${year} ${hour}:${minute}`
}

const ReviewLikes = (reviewId) => {
  const { currentUser } = useContext(AuthContext)
  const { data: likes, mutate: mutateLikes } = getReviewLikes(reviewId)
  const { data: liked, mutate: mutateLiked } = getReviewLiked(reviewId,currentUser ? currentUser.id : null)

  const registerModal = useRegisterModal()

  let isLoading = false

  const like = async (selectedValue) => {
    if(!currentUser)
      return registerModal.onOpen()

    let value = (liked === selectedValue) ? 0 : selectedValue
    isLoading = true

    await axios.post('http://localhost:80/review/like', {
      "user_id": currentUser.id,
      "review_id": reviewId,
      "liked": value
    })
    
    mutateLikes(likes, value)
    mutateLiked(liked, value)

    isLoading = false
  }

  return (
  <div className='flex flex-row mt-4'>
    <div className='flex bg-white rounded-full px-4 py-1 items-center gap-2'>
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
  </div>
  )
}

interface ReviewProps { review }

const Review : React.FC<ReviewProps> = ({ review }) => {
  return (
  <div className='flex flex-col bg-zinc-200 rounded p-3 shadow-md border border-zinc-300'>
    <div>
      <a href={`/user/${review.login}`} className='flex items-center gap-2 mb-2'>
        <img className='rounded-full size-6' src={profile} alt='Profile' />
        <span className='text-xl font-bold truncate line-clamp-1'>{review.username}</span>
        <span className='text-sm text-zinc-400'>{formatDate(new Date(review.created_at))}</span>
      </a>
      <h3 className='flex items-center gap-2 font-semibold text-xl mb-2'>
        {
        review.liked === 1
        ? <FaHeart className='text-red-600'/>
        : <FaHeartBroken className='text-purple-800'/>
        }
        {review.title}
      </h3>
      <div className='whitespace-pre-line leading-relaxed text-sm'>{review.content}</div>
    </div>
    {ReviewLikes(review.id)}
  </div>
  )
}

export default Review
