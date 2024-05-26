"use client"

import { useState } from "react"
import { Modal } from "./Modal"
import { useRecoverCodeModal } from '@/hooks/useModal'
import toast from "react-hot-toast"

export function RecoverCodeModal() {
  const [isLoading, setIsLoading] = useState(false)
  const [err,setErr] = useState(null)

  const recoverCodeModal = useRecoverCodeModal()

  async function handleSubmit(event: any) {
    event.preventDefault()

    setIsLoading(true)

    const data = new FormData(event.currentTarget)
    const inputs : any = Object.fromEntries(data)



    // if(compare && compare.type == 404 ) {
    //   setErr(compare.message)
    //   setIsLoading(false)
    //   return
    // }

    setErr(null)

    toast.success("На вашу почту был отправлен код для сброса пароля!")
    // pwdRecoverModal.onClose()
    
    setIsLoading(false)
    
    // window.location.reload()
  }

  return (
    <Modal isLoading={isLoading} title="Подтверждение сброса пароля" buttonName="Готово" isOpen={recoverCodeModal.isOpen} handleClose={recoverCodeModal.onClose} handleSubmit={handleSubmit}>
      <div className="text-sm text-center flex flex-col">
        <p>На почту, по которой был зарегистрирован данный профиль, был отправлен код для сброса пароля.</p>
        <p>Пожалуйста, проверьте почту на наличие письма с кодом.</p>
      </div>
      <input name="loginMail" placeholder="Код для сброса пароля" spellCheck="false" type="text" className="bg-slate-200 focus:outline-none focus:ring-2 ring-slate-400 px-3 py-2 rounded-2xl w-full" />
      <p className='text-red-600'>{err}</p>
    </Modal>
  )
}