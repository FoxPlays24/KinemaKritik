import { Search } from "lucide-react";

export function Input() {
  return ( 
    <>
    <button className="block lg:hidden bg-slate-200 p-2 rounded-2xl"><Search /></button>

    <button className="hidden lg:flex items-center">
      <p className="absolute pl-2"><Search /></p>
      <input name="search" placeholder="Поиск..." spellCheck="false" className="bg-slate-200 text-lg focus:outline-none focus:ring-2 ring-slate-400 p-2 rounded-2xl w-full even:ps-10" />
    </button>
    </>
  )
}