import { X } from "lucide-react"

interface MediaModalProps {
  isOpen?:     boolean
  handleClose: () => void
  children:    React.ReactNode
}

export function MediaModal({isOpen, handleClose, children}: MediaModalProps) {
  if(!isOpen) return

  return (
    <div className="fixed inset-0 bg-slate-900/30 flex justify-center items-center z-50">
      <div className="w-[60%] group">
        <button className="fixed bg-black text-white transition lg:opacity-0 group-hover:opacity-80 hover:scale-110 active:scale-95 p-2 rounded-2xl m-4 z-10" onClick={handleClose}><X /></button>
        {children}
      </div>
    </div>  
  )
} 