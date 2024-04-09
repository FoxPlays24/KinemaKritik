import { useLocation } from 'react-router-dom'
import { getUser } from '../api/users.ts'

import { FaArrowLeft } from 'react-icons/fa'
import profile from '../img/misc/placeholder_profile.png'

const User = () => {
  const userLogin = useLocation().pathname.split("/")[2]
  
  const { data: user, isUserLoading } = getUser(userLogin)
  
  if ((isUserLoading || !user)) {
    return (
      <>
      Загрузка
      </>
    )
  }

  if(!user.length)
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
          <h2 className='text-xl font-semibold'>{user[0].username}</h2>
          <span className='text-sm'>3 рецензии</span>
        </div>
      </div>
      <div>
        <div className='bg-repeat h-52 rounded-md' style={{backgroundImage: `url(${require('../img/misc/placeholder.png')})`}} />
        <div className='flex items-center gap-6'>
          <img className='w-32 rounded-full border-2 -mt-12 ml-6' src={profile} alt='Profile' />
          <div className='flex flex-col'>
            <h2 className='text-2xl font-medium'>{user[0].username}</h2>
            <span className='text-gray-600'>{userLogin}</span>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default User