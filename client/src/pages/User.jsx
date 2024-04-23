import { useLocation } from 'react-router-dom'
import { getUser } from '../api/users.ts'

import profile from '../img/misc/placeholder_profile.png'
import cover from '../img/misc/placeholder.png'
import { useContext } from 'react'
import { AuthContext } from '../context/authContext.js'
import { useEditModal } from '../hooks/useEditModal.ts'
import { bufferToBase64 } from '../components/ImageUpload.tsx'

import { IoMdExit } from 'react-icons/io'
import axios from 'axios'

import Header from '../components/Header.tsx'
import { getUserReviews } from '../api/reviews.ts'
import Review from '../components/Review.tsx'

const declOfNum = (n, titles) => {  
  return titles[n%10===1 && n%100!==11 ? 0 : n%10>=2 && n%10<=4 && (n%100<10 || n%100>=20) ? 1 : 2]
}

const User = () => {
  const userLogin = useLocation().pathname.split("/")[2]
  
  
  const { data: user } = getUser(userLogin)
  const { currentUser } = useContext(AuthContext)

  const editModal = useEditModal()

  const { data: reviews, isReviewsLoading } = getUserReviews(userLogin)

  if (isReviewsLoading || !reviews) {
    return (
    <>
    Загрузка
    </>
    )
  }

  const logOut = async () => {
    await axios.post(`${process.env.REACT_APP_API_URL}/logout`, null, {
      withCredentials: true
    })
    localStorage.clear()
    window.location.reload()
  }

  if(!user)
  return (
    <>
    404 Аккаунт не найден :(
    </>
  )

  return (
    <>
    <div className='flex flex-col gap-6'>
      <Header showBackArrow={true} label={user?.username} label2={user?.reviews > 0 && (user?.reviews + ' ' + declOfNum(user?.reviews, ['рецензия', 'рецензии', 'рецензий']))} />
      <div>
        {user?.cover_image ?
          <div className='bg-cover h-52 rounded-md' style={{backgroundImage: `url(${bufferToBase64(user?.cover_image)}`}} />
          :
          <div className='bg-repeat h-52 rounded-md' style={{backgroundImage: `url(${cover})`}} />
        }
        <div className='flex items-center gap-6 mx-6'>
          <img className='size-32 object-contain rounded-full border-2 -mt-12' src={bufferToBase64(user?.profile_image,profile)} alt='Profile' />
          <div className='flex flex-col'>
            <div className='flex flex-row items-center gap-2'>
            <h2 className='text-2xl font-medium'>{user?.username}</h2>
            <span className='text-zinc-400'>({userLogin})</span>
            </div>
            
            <span className='text-zinc-600'>{user?.status}</span>
          </div>
          {
            currentUser?.login === userLogin
            &&
            <div className='flex gap-4 ml-auto'>
              <button onClick={() => editModal.onOpen()} className='bg-zinc-300 px-4 py-2 rounded-full font-semibold transition hover:scale-105'>Редактировать</button>
              <button onClick={logOut} className='bg-zinc-300 px-4 py-2 rounded-full font-semibold transition hover:scale-105'><IoMdExit/></button>
            </div>
          }
        </div>
      </div>
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
    </>
  )
}

export default User