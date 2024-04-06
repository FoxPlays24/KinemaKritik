import React, { useCallback } from 'react'
import { IoMdClose } from 'react-icons/io'
import Button from './modalComponents/Button.tsx'
import logo from '../img/logo.svg'

interface ModalProps {
  isOpen?: boolean
  onClose: () => void
  onSubmit: () => void
  title?: string
  body?: React.ReactElement
  footer: React.ReactElement
  actionLabel: string
  disabled?: boolean
}

const Modal : React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  disabled
}) => {
  const handleClose = useCallback(() => {
    if(disabled) return
    onClose()
  }, [disabled, onClose])

  const handeSubmit = useCallback(() => {
    if(disabled) return
    onSubmit()
  }, [disabled, onSubmit])

  if(!isOpen) return null

  return (
    <div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed z-50 inset-0 outline-none bg-zinc-800 bg-opacity-50'>
      <div className='relative w-full lg:w-3/6 my-6 mx-auto lg:max-w-3xl h-full lg:h-auto'>
        {/* Content */}
        <div className='h-full lg:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white'>
          {/* Header */}
          <div className='flex items-center justify-between p-10 rounded-t select-none'>
            <img src={logo} alt='KinemaKritik' className='size-12 mr-4' />
            <h3 className='text-3xl font-semibold'>{title}</h3>
            <button onClick={handleClose} className='p-1 ml-auto border-0 transition hover:opacity-60 hover:scale-125'>
              <IoMdClose />
            </button>
          </div>
          {/* Body */}
          <div className='relative p-10 flex-auto'>
            {body}
          </div>
          {/* Footer */}
          <div className='flex flex-col gap-2 p-10'>
            <Button disabled={disabled} label={actionLabel} secondary fullWidth large onClick={handeSubmit} />
            {footer}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal