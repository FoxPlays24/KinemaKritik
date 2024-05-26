import { Header } from "@/components/Header"
import { Github, Info } from "lucide-react"
import Image from "next/image"

export default function Privacy() {
  return (
    <>
      <Header title="О сайте" icon={<Info />}/>
      <Image src="/logo.svg" width={128} height={128} className="mx-auto" alt="Logo" priority />
      <div className="text-center p-4 mt-6 mb-24 text-xl">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold">КинемаКритик</h2>
          <p>Сайт предназначен для рецензий на фильмы и сериалы и является дипломной работой автора сайта</p>
        </div>
        <p>Автор сайта - Хнытиков Алексей</p>
        <div className="flex justify-center">
          <a href="https://github.com/FoxPlays24/KinemaKritik" className="button border-2 flex gap-2">Проект на GitHub <Github /></a>
        </div>
        <div className="flex justify-center mt-48">
          <Image src="/pages/about.png" alt="About" width={200} height={200} />
        </div>
      </div>
    </>
  )
}