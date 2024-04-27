import { RiMessageFill } from 'react-icons/ri'
import { IoIosMore } from 'react-icons/io'

import profile from '../img/misc/placeholder_profile.png'
import logo from '../img/logo.svg'

import SideBarComponent from './SideBarComponent.tsx'
import { useRegisterModal } from '../hooks/useAuthModal.ts'
import { useCallback, useContext } from 'react'
import { AuthContext } from '../context/authContext.js'

import { getUser } from '../api/users.ts'
import { bufferToBase64 } from './ImageUpload.tsx'

import { LuArrowRightToLine } from "react-icons/lu";



const SideBar = () => {
  const registerModal = useRegisterModal()

  const { currentUser } = useContext(AuthContext)
  const { data: user } = getUser(currentUser ? currentUser.login : null)

  const onClick = useCallback(async () => {
    registerModal.onOpen()
  }, [registerModal])

  const items = [
    { name: 'Лента', icon: RiMessageFill, href: '/' },
    { name: 'О сайте', icon: IoIosMore, href: '.' }
  ]

  return (
  <>
  <header className='hidden lg:flex items-center justify-end ml-4 mr-8 select-none'>
    <div className='flex flex-col w-64 gap-2 px-4 py-8 bg-white border border-gray-300 rounded-2xl shadow-xl'>

      <div className='flex flex-row justify-center'>
        <a href='/'>
          <img src={logo} alt='KinemaKritik' className='size-20' />
        </a>
      </div>

      {/* User */}
      <div className='flex flex-row items-center gap-2 w-full'>
        {
          user ?
          <>
            <img className='w-14 rounded-2xl' src={bufferToBase64(user.profile_image,profile)} alt='Profile' />
            <div className='text-left truncate'>
              <span className='text-xl font-bold truncate line-clamp-1'>{user.username}</span>
              <span className='text-gray-400 line-clamp-2 leading-none text-sm'>{user.status}</span>
            </div>
            <a href={`/user/${currentUser.login}`} className='ml-auto bg-gray-300 rounded-full p-2 transition hover:scale-110 hover:brightness-90'>
              <LuArrowRightToLine />
            </a>
          </>
          :
          <>
          <img className='relative w-14 rounded-2xl' src={profile} alt='Profile' />
          <div className='text-left'>
            <span className='text-xl font-bold truncate line-clamp-1'>Гость</span>
            <span className='text-gray-400 line-clamp-2 leading-none text-sm'>Вы в режиме гостя</span>
          </div>
          <button onClick={onClick} className='ml-auto bg-gray-300 rounded-full p-2 transition hover:scale-110 hover:brightness-90'>
            <LuArrowRightToLine />
          </button>
          </>
        }
        
      </div>

      <hr/>

      <input className="bg-gray-300 rounded-2xl p-2" placeholder="Поиск..." />

      {/* Components */}
      {items.map((item) => (
        <SideBarComponent key={item.name} name={item.name} icon={item.icon} href={item.href} />
      ))}

    </div>
  </header>

  {/* Mobile */}
  <header className='absolute lg:hidden bottom-0 flex justify-center w-screen z-10 p-2 select-none'>
    <div className='flex flex-row justify-center gap-2 p-2 bg-white border border-gray-300 rounded-2xl shadow-xl w-screen'>
      
      <img src={logo} alt='KinemaKritik' className='size-12' />
      
      {
        user ?
        <a href={`/user/${currentUser.login}`} className='transition active:scale-110 active:brightness-75'>
          <img className='w-12 rounded-2xl' src={bufferToBase64(user.profile_image,profile)} alt='Profile' />
        </a>
        : 
        <button onClick={onClick} className='transition active:scale-110 active:brightness-75'>
          <img className='w-12 rounded-2xl' src={profile} alt='Profile' />
        </button>
      }
      
      {items.map((item) => (
        <SideBarComponent key={item.name} name={item.name} icon={item.icon} href={item.href} />
      ))}
    
    </div>
  </header>
  </>
  )
}

export default SideBar