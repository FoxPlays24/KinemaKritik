import Image from "next/image"

export default function Error404() {
    return (
      <div className="h-full flex items-center justify-center select-none">
        <Image src="/logo.svg" alt="Error 404: Page not found" width={182} height={182} />
      </div>
    )
  }