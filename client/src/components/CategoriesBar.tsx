import { Compass, Film, Home, Info, SquareGanttChart } from "lucide-react"
import Link from "next/link"

export async function CategoriesBar() {
  const buttons = [
    { name: 'Лента', icon: <Home className="size-16 lg:size-6" />, href: "/" },
    { name: 'Кино', icon: <Film className="size-16 lg:size-6" />, href: "/films" },
    { name: 'Рецензии', icon: <SquareGanttChart className="size-16 lg:size-6" />, href: "/reivews" },
    { name: 'О сайте', icon: <Info className="size-16 lg:size-6" />, href: "/about" }
  ]

  return (
    <div className="hidden lg:flex h-screen">
      <div className="fixed -translate-x-60 flex flex-col items-center bg-white w-60 h-full border border-gray-2 divide-gray-2 shadow-lg px-4 pt-8 select-none">
        <div className="flex flex-col items-center mb-6 mt-20">
          <Compass />
          <h2 className="text-xl">Навигация</h2>
        </div>
        { 
          buttons.map(button => (
            <Link href={button.href} className="button justify-start w-full" key={button.name}>{button.icon} {button.name}</Link>
          ))
        }
      </div>
    </div>
  )
}