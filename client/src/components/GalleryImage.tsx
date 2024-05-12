"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"

export function GalleryImage({image} : {image : string}) {
  const router = useRouter()

  return (
    <button onClick={() => router.push(`?img=${image.split("/")[4]}`, { scroll: false })} className="group">
      <Image src={image} width={320} height={320} alt="Image" className="gallery-image size-32 m-1 aspect-square" />
    </button>
  )
}