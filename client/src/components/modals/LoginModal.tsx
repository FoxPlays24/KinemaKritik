import React, { useCallback, useState } from 'react'
import { useLoginModal, useRegisterModal } from '../../hooks/useAuthModal.ts'
import Input from '../modalComponents/Input.tsx'
import Modal from '../Modal.tsx'

const LoginModal = () => {
  const loginModal = useLoginModal()
  const registerModal = useRegisterModal()

  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const onToggle = useCallback(() => {
    if(isLoading) return
    loginModal.onClose()
    registerModal.onOpen()
  }, [isLoading, loginModal, registerModal])

  const onSubmit = useCallback(() => {
    try {
      setIsLoading(true)
      loginModal.onClose()
    } catch (err) {
        console.error(err)
    } finally {
        setIsLoading(false)
    }
  }, [loginModal])

  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <Input placeholder='Логин' onChange={(e) => setLogin(e.target.value)} value={login} disabled={isLoading} />
      <Input placeholder='Пароль' onChange={(e) => setPassword(e.target.value)} value={password} disabled={isLoading} type={'password'} />
    </div>
  )

  const footerContent = (
    <div className='text-zinc-400 text-center mt-2'>
      <p>Первый раз на сайте? <span onClick={onToggle} className='cursor-pointer text-black hover:underline'>Создайте аккаунт</span></p>
    </div>
  )
  
  return (
    <Modal disabled={isLoading} isOpen={loginModal.isOpen} title='Вход' actionLabel='Войти' onClose={loginModal.onClose} onSubmit={onSubmit} body={bodyContent} footer={footerContent} />
  )
}

export default LoginModal