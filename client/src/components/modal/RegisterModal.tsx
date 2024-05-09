"use client"

import Image from "next/image"
import { Modal } from "./Modal"
import { useLoginModal, usePwdRecoverModal, useRegisterModal } from '@/hooks/useModal'
import { useState } from "react"
import { register } from "@/utils/actions"

interface RegisterButtonProps {
  svg?: string;
  name: string;
}

function RegisterButton({svg, name}: RegisterButtonProps) {
  return (
    <button name={name} className="border border-slate-300 rounded-full px-4 py-2 flex items-center gap-4 transition-colors hover:bg-slate-300">
      <Image src={svg || ""} alt={name} width={24} height={24} />
      <p className="mx-auto text-center px-2 -translate-x-4">Зарегистироваться с {name}</p>
    </button>
  )
}

export function RegisterModal() {
  const [isLoading, setIsLoading] = useState(false)
  const [err,setErr] = useState(null)
  
  const registerModal   = useRegisterModal()
  const loginModal      = useLoginModal()
  const pwdRecoverModal = usePwdRecoverModal()

  const onToggle = () => {
    registerModal.onClose()
    loginModal.onOpen()
  }

  const onRecover = () => {
    registerModal.onClose()
    pwdRecoverModal.onOpen()
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    try {
      setIsLoading(true)
      
      const data = new FormData(event.currentTarget)
      const inputs = Object.fromEntries(data)

      await register(inputs)

      setErr(null)

      registerModal.onClose()
    } catch (err: any) {
      setErr(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Modal isLoading={isLoading} title="Регистрация" buttonName="Зарегистрироваться" isOpen={registerModal.isOpen} handleClose={registerModal.onClose} handleSubmit={handleSubmit}>
      <p className="text-sm text-center">
        Продолжая, вы соглашаетесь с <a href="/terms" className="link">пользовательским соглашением</a> и подтверждаете, что ознакомились с <a href="/privacy" className="link">политикой конфиденциальности сайта</a>
      </p>
      <div className="flex flex-col justify-center gap-2">
        <RegisterButton svg="/google.svg" name="Google" />
        <RegisterButton svg="/telegram.svg" name="Telegram" />
      </div>
      <div className="inline-flex items-center justify-center w-full select-none">
        <hr className="w-[31rem] h-px border-0 my-2 bg-slate-300" />
        <span className="absolute px-3 bg-white text-slate-300">ИЛИ</span>
      </div>
      <input name='mail' placeholder="Почта" spellCheck="false" type="email" className="bg-slate-200 focus:outline-none focus:ring-2 ring-slate-400 px-3 py-2 rounded-2xl w-full" />
      <input name='login' placeholder="Логин" spellCheck="false" type="text" className="bg-slate-200 focus:outline-none focus:ring-2 ring-slate-400 px-3 py-2 rounded-2xl w-full" />
      <input name='password' placeholder="Пароль" spellCheck="false" type="password" className="bg-slate-200 focus:outline-none focus:ring-2 ring-slate-400 px-3 py-2 rounded-2xl w-full" />
      <div>
      <p className='text-red-600'>{err}</p>
      <span onClick={onRecover} className="link cursor-pointer">Забыли пароль?</span>
        <p>Уже есть аккаунт? <span onClick={onToggle} className="link cursor-pointer">Войдите в него!</span></p>
      </div>
    </Modal>
  )
}