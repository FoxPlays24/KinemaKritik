import Image from "next/image"
import { ArrowLeft, X } from "lucide-react"
import { FormEventHandler } from "react"

interface ModalProps {
  isOpen?:        boolean
  title:          string
  buttonName:     string
  children:       React.ReactNode
  handleClose:    () => void
  previousModal?: React.ReactNode
  handleSubmit:   FormEventHandler<HTMLFormElement>
  isLoading:      boolean
}

export function Modal({isOpen, title, buttonName, children, handleClose, previousModal, handleSubmit, isLoading}: ModalProps) {
  if(!isOpen) return

  return (
    <div className="fixed inset-0 bg-slate-900/30 flex justify-center items-center z-50">
      <div className="w-[40rem]">
        <div className="bg-white rounded-2xl p-6 flex flex-col gap-2">
          <div className="inline-flex mb-4">
            {
              previousModal
              ? <button><ArrowLeft /></button>
              : <Image src="/tinylogo.svg" width={48} height={0} className="w-12 h-auto transition group-hover:scale-95" alt="Logo" priority={true} />
            }
            <h2 className="ml-auto text-2xl font-semibold">{title}</h2>
            <div className="ml-auto bg-slate-200 rounded-2xl"><button className="button" onClick={handleClose}><X /></button></div>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 px-20">
            {children}
            <button disabled={isLoading} type="submit" className="mt-8 bg-slate-200 button">{buttonName}</button>
          </form>
        </div>
      </div>
    </div>  
  )
}