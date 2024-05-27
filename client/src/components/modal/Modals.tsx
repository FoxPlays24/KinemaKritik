

import { LoginModal }      from "./LoginModal"
import { RegisterModal }   from "./RegisterModal"
import { PwdRecoverModal } from "./PwdRecoverModal"
import { ImageModal }      from "./media/ImageModal"
import { Suspense } from "react"
import { RecoverCodeModal } from "./RecoverCodeModal"

export function Modals() {
  return (
    <>
      <LoginModal />
      <RegisterModal />
      
      {/* Passwords */}
      <PwdRecoverModal />
      <RecoverCodeModal />

      <Suspense>
        <ImageModal />
      </Suspense>
    </>
  )
}