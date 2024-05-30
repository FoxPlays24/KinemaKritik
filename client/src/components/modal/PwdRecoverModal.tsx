"use client"

import { useState } from "react"
import { Modal } from "./Modal"
import { usePwdRecoverModal, useRecoverCodeModal } from '@/hooks/useModal'
import { compareLoginMail } from "@/utils/actions"
import toast from "react-hot-toast"

export function PwdRecoverModal() {
  const [isLoading, setIsLoading] = useState(false)
  const [err,setErr] = useState(null)

  const pwdRecoverModal = usePwdRecoverModal()
  const recoverCodeModal = useRecoverCodeModal()

  async function handleSubmit(event: any) {
    event.preventDefault()

    setIsLoading(true)

    const data = new FormData(event.currentTarget)
    const inputs : any = Object.fromEntries(data)
    
    const compare = await compareLoginMail(inputs.loginMail)

    if(compare && compare.type == 404 ) {
      setErr(compare.message)
      setIsLoading(false)
      return
    }
    
    await fetch("")

    setErr(null)

    toast.success("На вашу почту был отправлен код для сброса пароля!")
    
    recoverCodeModal.onOpen()
    pwdRecoverModal.onClose()
    
    setIsLoading(false)
  }

  return (
    <Modal isLoading={isLoading} title="Восстановление пароля" buttonName="Отправить код" isOpen={pwdRecoverModal.isOpen} handleClose={pwdRecoverModal.onClose} handleSubmit={handleSubmit}>
      <p className="text-sm text-center">
        После нажатия кнопки "Отправить код" на вашу электронную почту будет отправлен код для восстановления пароля
      </p>
      <input name="loginMail" placeholder="Почта или логин" spellCheck="false" type="text" className="bg-slate-200 focus:outline-none focus:ring-2 ring-slate-400 px-3 py-2 rounded-2xl w-full" />
      <p className='text-red-600'>{err}</p>
    </Modal>
  )
}