

import { LoginModal }      from "./LoginModal"
import { RegisterModal }   from "./RegisterModal"
import { PwdRecoverModal } from "./PwdRecoverModal"
import { ImageModal }      from "./media/ImageModal"
import { Suspense } from "react"

export function Modals() {
  return (
    <>
      <LoginModal />
      <RegisterModal />
      <PwdRecoverModal />
      <Suspense>
        <ImageModal />
      </Suspense>
    </>
  )
}