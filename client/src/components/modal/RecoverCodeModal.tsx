"use client"

import { useState } from "react"
import { Modal } from "./Modal"
import { useRecoverCodeModal } from '@/hooks/useModal'
import { compareCodes, login, pwdChange } from "@/utils/actions"
import toast from "react-hot-toast"

export function RecoverCodeModal() {
  const [isLoading, setIsLoading] = useState(false)
  const [err, setErr] = useState(null)
  const [correctCode, setCorrectCode] = useState<string>("")

  const recoverCodeModal = useRecoverCodeModal()

  async function handleSubmitCode(event: any) {
    event.preventDefault()

    setIsLoading(true)

    const data = new FormData(event.currentTarget)
    const inputs : any = Object.fromEntries(data)

    const compare = await compareCodes(inputs.code)

    if(compare && compare.type == 404 ) {
      setErr(compare.message)
      setIsLoading(false)
      return
    }

    setErr(null)
    setCorrectCode(inputs.code)
    setIsLoading(false)
  }

  async function handleSubmitPassword(event: any) {
    event.preventDefault()

    setIsLoading(true)

    const data = new FormData(event.currentTarget)
    const inputs : any = Object.fromEntries(data)
    const newPassword : string = inputs.new_password

    const change = await pwdChange(newPassword, correctCode)

    if(change && (change.type == 404 || change.type == 500)) {
      setErr(change.message)
      setIsLoading(false)
      return
    }

    setErr(null)

    toast.success("Вы успешно сменили пароль!")
    recoverCodeModal.onClose()
    
    setCorrectCode("")
    setIsLoading(false)
  }

  return (
    <Modal isLoading={isLoading} title="Подтверждение сброса пароля" buttonName={correctCode ? "Изменить" : "Готово"} isOpen={recoverCodeModal.isOpen} handleClose={recoverCodeModal.onClose} handleSubmit={correctCode ? handleSubmitPassword : handleSubmitCode}>
      {
        !correctCode &&
        <>
          <div className="text-sm text-center flex flex-col">
            <p>На почту, по которой был зарегистрирован данный профиль, был отправлен код для сброса пароля.</p>
            <p>Пожалуйста, проверьте почту на наличие письма с кодом.</p>
          </div>
          <input name="code" placeholder="Код для сброса пароля" spellCheck="false" type="text" className="bg-slate-200 focus:outline-none focus:ring-2 ring-slate-400 px-3 py-2 rounded-2xl w-full" />
        </>
      }
      {
        correctCode &&
        <>
          <div className="text-sm text-center flex flex-col">
            <p>Пожалуйста, введите новый пароль</p>
          </div>
          <input name='new_password' placeholder="Новый пароль" spellCheck="false" type="password" className="bg-slate-200 focus:outline-none focus:ring-2 ring-slate-400 px-3 py-2 rounded-2xl w-full" />
        </>
      }
      <p className='text-red-600'>{err}</p>
    </Modal>
  )
}