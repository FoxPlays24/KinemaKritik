import Image from "next/image"

export default function Error404() {
    return (
      <div className="h-full flex items-center justify-center select-none">
        <Image src="/pages/not-found.png" alt="Error 404: Page not found" width={240} height={240} />
      </div>
    )
  }