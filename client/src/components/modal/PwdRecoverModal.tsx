"use client"

import { Modal } from "./Modal"
import { usePwdRecoverModal } from '@/hooks/useModal'

export function PwdRecoverModal({previousModal}: any) {
  const pwdRecoverModal = usePwdRecoverModal()

  return (
    <Modal previousModal={previousModal} title="Восстановление пароля" buttonName="Отправить код" isOpen={pwdRecoverModal.isOpen} handleClose={pwdRecoverModal.onClose}>
      <p className="text-sm text-center">
        После нажатия кнопки "Отправить код" вам на почту, по которой зарегистрирован аккаунт, прийдет код для сброса пароля
      </p>
      <input placeholder="Почта или логин" spellCheck="false" type="email" className="bg-slate-200 focus:outline-none focus:ring-2 ring-slate-400 px-3 py-2 rounded-2xl w-full" />
    </Modal>
  )
}