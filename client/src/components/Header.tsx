import React from 'react'
import { FaArrowLeft } from 'react-icons/fa'

interface HeaderProps {
  label: string
  label2?: string
  showBackArrow?: boolean
}

const Header : React.FC<HeaderProps> = ({label,label2,showBackArrow}) => {
  return (
  <div className='pb-12'>
    <div className='flex opacity-75 bg-white w-[40%] items-center gap-6 z-10 fixed -translate-x-4 -translate-y-4 p-4'>
      {showBackArrow && <a href='/'><FaArrowLeft className='size-6'/></a>}
      <div className='flex-col select-none'>
        <h2 className='text-xl font-semibold'>{label}</h2>
        <span className='text-sm'>
          {label2}
        </span>
      </div>
    </div>
  </div>
  )
}

export default Header