import React, { useCallback, useContext, useState } from 'react'
import { useLoginModal, useRegisterModal } from '../../hooks/useAuthModal.ts'
import Input from '../modalComponents/Input.tsx'
import Modal from '../Modal.tsx'

import toast from 'react-hot-toast'
import axios from 'axios'
import { AuthContext } from '../../context/authContext.js'

const RegisterModal = () => {
  const loginModal = useLoginModal()
  const registerModal = useRegisterModal()

  const [inputs,setInputs] = useState({
    mail: '',
    username: '',
    login: '',
    password: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [err,setErr] = useState(null)

  const handleInput = (e) => {
    setInputs(prev => ({...prev, [e.target.name]: [e.target.value]}))
  }

  const onToggle = useCallback(() => {
    if(isLoading) return
    registerModal.onClose()
    loginModal.onOpen()
  }, [isLoading, registerModal, loginModal])

  const { login } = useContext(AuthContext)

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true)

      console.log(inputs)
      
      await axios.post('http://localhost:3001/register', inputs)
      await login(inputs)
      toast.success(`Пользователь '${inputs.username}' успешно зарегистрирован!`)

      inputs.mail=''
      inputs.username=''
      inputs.login=''
      inputs.password=''

      setErr(null)

      registerModal.onClose()
    } catch (err) {
      setErr(err.response.data)
    } finally {
      setIsLoading(false)
    }
  }, [inputs, login, registerModal])

  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <Input name='mail' placeholder='Почта' onChange={handleInput} value={inputs.mail} disabled={isLoading} type={'email'} />
      <Input name='username' placeholder='Псевдоним' onChange={handleInput} value={inputs.username} disabled={isLoading} />
      <Input name='login' placeholder='Логин' onChange={handleInput} value={inputs.login} disabled={isLoading} />
      <Input name='password' placeholder='Пароль' onChange={handleInput} value={inputs.password} disabled={isLoading} type={'password'} />
    </div>
  )

  const footerContent = (
    <div className='text-zinc-400 text-center mt-2'>
      <p className='text-red-600'>{err}</p>
      <p>Уже есть аккаунт? <span onClick={onToggle} className='cursor-pointer text-black hover:underline'>Войти</span></p>
    </div>
  )
  
  return (
  <Modal disabled={isLoading} isOpen={registerModal.isOpen} title='Регистрация' actionLabel='Зарегистироваться' onClose={registerModal.onClose} onSubmit={onSubmit} body={bodyContent} footer={footerContent} />
  )
}

export default RegisterModal