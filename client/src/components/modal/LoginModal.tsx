"use client"

import Image from "next/image"
import { Modal } from "./Modal"
import { useLoginModal, usePwdRecoverModal, useRegisterModal } from '@/hooks/useModal'
import { login } from "@/utils/actions"
import { useState } from "react"
import toast from "react-hot-toast"

interface LoginButtonProps {
  svg?: string
  name: string
}

function LoginButton({svg, name}: LoginButtonProps) {
  return (
    <button name={name} className="border border-slate-300 rounded-full px-4 py-2 flex items-center gap-4 transition-colors hover:bg-slate-300">
      <Image src={svg || ""} alt={name} width={24} height={24} />
      <p className="mx-auto text-center px-2 -translate-x-4">Войти с {name}</p>
    </button>
  )
}

export function LoginModal() {
  const [isLoading, setIsLoading] = useState(false)
  const [err,setErr] = useState(null)

  const loginModal      = useLoginModal()
  const registerModal   = useRegisterModal()
  const pwdRecoverModal = usePwdRecoverModal()

  const onToggle = () => {
    loginModal.onClose()
    registerModal.onOpen()
  }

  const onRecover = () => {
    loginModal.onClose()
    pwdRecoverModal.onOpen()
  }
  
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setIsLoading(true)

    const data = new FormData(event.currentTarget)
    const inputs = Object.fromEntries(data)

    const logining = await login(inputs)

    if(logining && (logining.type == 404 || logining.type == 500) ) {
      setErr(logining.message)
      setIsLoading(false)
      return
    }

    setErr(null)

    toast.success("Вы успешно вошли в профиль!")
    loginModal.onClose()
    
    setIsLoading(false)
    
    // window.location.reload()
  }

  return (
    <Modal isLoading={isLoading} title="Вход" buttonName="Войти" isOpen={loginModal.isOpen} handleClose={loginModal.onClose} handleSubmit={handleSubmit} >
      <p className="text-sm text-center">
        Продолжая, вы соглашаетесь с <a href="/terms" className="link">пользовательским соглашением</a> и подтверждаете, что ознакомились с <a href="/privacy" className="link">политикой конфиденциальности сайта</a>
      </p>
      {/* <div className="flex flex-col justify-center gap-2">
        <LoginButton svg="/google.svg" name="Google" />
        <LoginButton svg="/telegram.svg" name="Telegram" />
      </div> */}
      <div className="inline-flex items-center justify-center w-full select-none">
        <hr className="w-[31rem] h-px border-0 my-2 bg-slate-300" />
        <span className="absolute px-3 bg-white text-slate-300">ИЛИ</span>
      </div>
      <input name='loginMail' placeholder="Почта или логин" spellCheck="false" type="text" className="bg-slate-200 focus:outline-none focus:ring-2 ring-slate-400 px-3 py-2 rounded-2xl w-full" />
      <input name='password' placeholder="Пароль" spellCheck="false" type="password" className="bg-slate-200 focus:outline-none focus:ring-2 ring-slate-400 px-3 py-2 rounded-2xl w-full" />
      <p className='text-red-600'>{err}</p>
      <div>
        <span onClick={onRecover} className="link cursor-pointer">Забыли пароль?</span>
        <p>Нет аккаунта? <span onClick={onToggle} className="link cursor-pointer">Зарегистрируйтесь на КинемаКритик!</span></p>
      </div>
    </Modal>
  )
}