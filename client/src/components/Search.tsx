"use client"

import { ALargeSmall, Film, Search, User } from "lucide-react"
import { useEffect, useState } from "react"
import { useDebounce } from "use-debounce"

interface SearchItemProps {
  type:  string
  name:  string
  link?: string
}

function SearchItem({ type, name, link }: SearchItemProps) {
  const icon = type=="film"  ? <Film /> : 
               type=="user"  ? <User /> : 
               type=="genre" ? <ALargeSmall /> : ""
  
  return (
    <a href={`/${type}/${link}`} className="p-2 flex gap-2">
      {icon} {name}
    </a>
  )
}

export function SearchInput() {
  const [text, setText] = useState("")
  const [value] = useDebounce(text, 500)
  const [result, setResult] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetch(`http://localhost:3000/search?query=${value}`).then(res => res.json())
        setResult(result)
      } catch (err) {}
    }
    fetchData()
  }, [value])

  return (
    <div className="w-[40%] flex justify-center">
      <div className="flex items-center w-full">
        <div className="absolute pl-2"><Search /></div>
        <input autoComplete="off" name="search" placeholder="Поиск..." onChange={(e) => setText(e.target.value)} spellCheck="false" className="bg-slate-200 text-lg focus:outline-none focus:ring-2 ring-slate-400 p-2 rounded-2xl w-full ps-10" />
      </div>
      {
        value &&
        <div className="absolute w-[38%] translate-y-14">
          <div className="bg-slate-200 flex flex-col slide-down p-4 rounded-2xl border-2 border-slate-400 divide-y-2 divide-slate-300">
            {
              result.slice(0, 5).map((item: any) => <SearchItem key={item.link} type={item.type} name={item.title} link={item.link} />)
            }
            {
              !result.length &&
              <p className="select-none">Результатов по вашему запросу нет :(</p>
            }
          </div>
        </div>
      }
    </div>
  )
}