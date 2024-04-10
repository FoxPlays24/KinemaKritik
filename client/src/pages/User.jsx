import { useLocation } from 'react-router-dom'
import { getUser } from '../api/users.ts'

import { FaArrowLeft } from 'react-icons/fa'
import profile from '../img/misc/placeholder_profile.png'
import cover from '../img/misc/placeholder.png'
import { useContext } from 'react'
import { AuthContext } from '../context/authContext.js'
import { useEditModal } from '../hooks/useEditModal.ts'
import { bufferToBase64 } from '../components/ImageUpload.tsx'

const declOfNum = (n, titles) => {  
  return titles[n%10===1 && n%100!==11 ? 0 : n%10>=2 && n%10<=4 && (n%100<10 || n%100>=20) ? 1 : 2]
}

const User = () => {
  const userLogin = useLocation().pathname.split("/")[2]
  
  const { data: user } = getUser(userLogin)
  const { currentUser } = useContext(AuthContext)

  const editModal = useEditModal()

  if(!user)
  return (
    <>
    404 Аккаунт не найден :(
    </>
  )

  return (
    <>
    <div className='flex-col'>
      <div className='flex items-center gap-6 bg-white w-full mb-4'>
        <a href='/'><FaArrowLeft className='size-6'/></a>
        <div className='flex-col'>
          <h2 className='text-xl font-semibold'>{user?.username}</h2>
          <span className='text-sm'>{user?.reviews > 0 && (user?.reviews + ' ' + declOfNum(user?.reviews, ['рецензия', 'рецензии', 'рецензий']))}</span>
        </div>
      </div>
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
            <span className='text-gray-600'>({userLogin})</span>
            </div>
            
            <span className='text-gray-600'>{user?.status}</span>
          </div>
          {
            currentUser?.login === userLogin
            &&
            <button onClick={() => editModal.onOpen()} className='bg-zinc-300 px-4 py-2 rounded-full font-semibold transition hover:scale-105 ml-auto'>Редактировать</button>
          }
        </div>
      </div>
    </div>
    </>
  )
}

export default User