import { useEffect, useState } from 'react'
import axios from 'axios'

import BlockBarComponent from "./BlockBarComponent.tsx";

const BlockBar = () => {
  const [films,setFilms] = useState([])
  
  useEffect(() => {
    const fetchAllFilms = async () => {
      try {
        const res = await axios.get('http://localhost:80/films')
        setFilms(res.data)
      } catch (err) {
        console.error(err)
      }
    }
    fetchAllFilms()
  }, [])

  return (
  <div className="bg-white shadow-xl ml-12 hidden lg:block h-screen overflow-y-scroll scrollbar-hide">
    <div className="fixed bg-white text-2xl truncate text-center select-none pb-6 rounded-b-2xl z-10">
      <div className="flex flex-row gap-8 mx-8 my-4 justify-center">
        <div className="w-16 h-14 bg-[#DDDFE1] rounded shadow-inner" />
        <div className="w-16 h-14 bg-[#DDDFE1] rounded shadow-inner" />
        <div className="w-16 h-14 bg-[#DDDFE1] rounded shadow-inner" />
      </div>
      Новинки на сайте
    </div>
    <div className="flex flex-col gap-4 items-center h-screen mt-36">
      {/* Components */}
      {films.map(film => (
        <BlockBarComponent key={film.id} id={film.id} title={film.title} />
      ))}
      <a href='.' className="pt-2 pb-10">
        <span className="text-2xl bg-[#DDDFE1] px-8 py-2 rounded-2xl align-top">...</span>
      </a>
    </div>
  </div>
  );
}

export default BlockBar;