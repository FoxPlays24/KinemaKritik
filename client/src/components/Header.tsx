import React from 'react'
import { FaArrowLeft } from 'react-icons/fa'

interface HeaderProps {
  label: string
  label2?: string
  showBackArrow?: boolean
}

const Header : React.FC<HeaderProps> = ({label,label2,showBackArrow}) => {
  return (
  <div className='sticky top-0 flex p-4 bg-white backdrop-blur-sm bg-white/70 items-center gap-6 z-10'>
    {showBackArrow && <a href='/'><FaArrowLeft className='size-6'/></a>}
    <div className='flex-col select-none'>
      <h2 className='text-xl font-semibold'>{label}</h2>
      <span className='text-sm'>{label2}</span>
    </div>
  </div>
  )
}

export default Header