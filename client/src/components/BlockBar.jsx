import BlockBarComponent from "./BlockBarComponent.tsx";
import { getFilms } from '../api/films.ts'

const BlockBar = () => {
  const { data: films } = getFilms()

  return (
  <div className="hidden lg:flex items-center justify-start ml-8 mr-4 overflow-y-scroll scrollbar-hide">
    <div className='flex flex-col w-80 gap-2 px-4 h-screen bg-white border border-gray-300 shadow-xl'>
      <p className="sticky top-0 flex flex-row justify-center items-center p-4 backdrop-blur-sm bg-white/70 gap-6 z-10 text-xl font-semibold">Последнее кино</p>
      {films?.map(film => (
        <BlockBarComponent key={film.id} id={film.id} title={film.title} />
      ))}
    </div>
  </div>
  )
}

export default BlockBar;