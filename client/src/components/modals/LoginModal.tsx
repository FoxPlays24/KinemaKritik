import React, { useCallback, useContext, useState } from 'react'
import { useLoginModal, useRegisterModal } from '../../hooks/useAuthModal.ts'
import Input from '../modalComponents/Input.tsx'
import Modal from '../Modal.tsx'

import { AuthContext } from '../../context/authContext.js'
import toast from 'react-hot-toast'

const LoginModal = () => {
  const loginModal = useLoginModal()
  const registerModal = useRegisterModal()

  const [inputs,setInputs] = useState({
    login: '',
    password: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [err,setErr] = useState(null)

  const handleInput = (e) => {
    setInputs(prev => ({...prev, [e.target.name]: [e.target.value]}))
  }

  const onToggle = useCallback(() => {
    if(isLoading) return
    loginModal.onClose()
    registerModal.onOpen()
  }, [isLoading, loginModal, registerModal])

  const { login } = useContext(AuthContext)

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true)
      
      await login(inputs)
      toast.success(`Вы успешно вошли!`)
      
      inputs.login = ''
      inputs.password = ''

      setErr(null)

      loginModal.onClose()
    } catch (err) {
      setErr(err.response.data)
    } finally {
      setIsLoading(false)
    }
  }, [inputs, login, loginModal])

  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <Input name='login' placeholder='Логин' onChange={handleInput} value={inputs.login} disabled={isLoading} />
      <Input name='password' placeholder='Пароль' onChange={handleInput} value={inputs.password} disabled={isLoading} type={'password'} />
    </div>
  )

  const footerContent = (
    <div className='text-zinc-400 text-center mt-2'>
      <p className='text-red-600'>{err}</p>
      <p>Первый раз на сайте? <span onClick={onToggle} className='cursor-pointer text-black hover:underline'>Создайте аккаунт</span></p>
    </div>
  )
  
  return (
    <Modal disabled={isLoading} isOpen={loginModal.isOpen} title='Вход' actionLabel='Войти' onClose={loginModal.onClose} onSubmit={onSubmit} body={bodyContent} footer={footerContent} />
  )
}

export default LoginModal