import React, { useCallback, useState } from 'react'
import { useLoginModal, useRegisterModal } from '../../hooks/useAuthModal.ts'
import Input from '../modalComponents/Input.tsx'
import Modal from '../Modal.tsx'

const RegisterModal = () => {
  const loginModal = useLoginModal()
  const registerModal = useRegisterModal()

  const [mail, setMail] = useState('')
  const [nickname, setNickname] = useState('')
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const onToggle = useCallback(() => {
    if(isLoading) return
    registerModal.onClose()
    loginModal.onOpen()
  }, [isLoading, registerModal, loginModal])

  const onSubmit = useCallback(() => {
    try {
      setIsLoading(true)
      registerModal.onClose()
    } catch (err) {
        console.error(err)
    } finally {
        setIsLoading(false)
    }
  }, [registerModal])

  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <Input placeholder='Почта' onChange={(e) => setMail(e.target.value)} value={mail} disabled={isLoading} type={'email'} />
      <Input placeholder='Псевдоним' onChange={(e) => setNickname(e.target.value)} value={nickname} disabled={isLoading} />
      <Input placeholder='Логин' onChange={(e) => setLogin(e.target.value)} value={login} disabled={isLoading} />
      <Input placeholder='Пароль' onChange={(e) => setPassword(e.target.value)} value={password} disabled={isLoading} type={'password'} />
    </div>
  )

  const footerContent = (
    <div className='text-zinc-400 text-center mt-2'>
      <p>Уже есть аккаунт? <span onClick={onToggle} className='cursor-pointer text-black hover:underline'>Войти</span></p>
    </div>
  )
  
  return (
    <Modal disabled={isLoading} isOpen={registerModal.isOpen} title='Регистрация' actionLabel='Зарегистироваться' onClose={registerModal.onClose} onSubmit={onSubmit} body={bodyContent} footer={footerContent} />
  )
}

export default RegisterModal