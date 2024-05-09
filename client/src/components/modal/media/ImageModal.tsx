"use client"

import { useParams, useSearchParams } from "next/navigation"
import { MediaModal } from "./MediaModal"
import Image from "next/image"
import { useRouter } from "next/navigation"

export function ImageModal() {
  const searchParams = useSearchParams()
  const link = useParams().link
  const image = searchParams.get("img")
  const router = useRouter()

  return (
    <>
      <MediaModal isOpen={image !== null} handleClose={() => router.replace("?")}>
        <Image src={`/films/shots/${link}/${image}`} width={0} height={0} alt="Image" className="w-full h-auto rounded-2xl scale-up-center" unoptimized priority />
      </MediaModal>
    </>
  )
}