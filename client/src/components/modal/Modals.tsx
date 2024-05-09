

import { LoginModal }      from "@/components/modal/LoginModal"
import { RegisterModal }   from "@/components/modal/RegisterModal"
import { PwdRecoverModal } from "@/components/modal/PwdRecoverModal"
import { ImageModal }      from "./media/ImageModal"

export function Modals() {
  return (
    <>
      <LoginModal />
      <RegisterModal />
      <PwdRecoverModal />
      <ImageModal />
    </>
  )
}