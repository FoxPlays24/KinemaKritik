
import SideBar from './components/SideBar';
import BlockBar from './components/BlockBar';

function App() {
  return (
  <div className='bg-[#DDDFE1] h-screen'>
    <div className='container h-full mx-auto'>
      <div className='grid grid-cols-4 h-full'>
        <SideBar />
        <div className='bg-white shadow-xl col-span-3 lg:col-span-2 p-4'>
          <img src={require('./img/movies/banners/1.png')} alt='movie' className='rounded-md' loading='eager' />
          <div className='grid grid-rows-2 mt-8'>

            <div className='flex flex-row items-center'>
              <div className='flex gap-2 font-roboto items-center'>
                <span className='text-2xl font-medium'>Оппенгеймер</span>
                <span className='text-sm text-[#C64137]'>+240</span>
              </div>
              <span className='text-sm font-roboto text-end ml-auto'>18+ Oppenheimer 2023 Кристофер Нолан</span>
            </div>

            <div className='flex flex-row items-center'>
              <div className='flex flex-row gap-4 select-none'>
                <a href='.' className='text-sm text-white bg-[#C64137] rounded-2xl px-11 py-2 cursor-default'>
                  Инфо
                </a>
                <a href='.' className='text-sm bg-white rounded-2xl px-11 py-2 border-black border transition hover:bg-zinc-200'>
                  Рецензии
                </a>
                <a href='.' className='text-sm bg-white rounded-2xl px-11 py-2 border-black border transition hover:bg-zinc-200'>
                  Состав
                </a>
              </div>
              <div className='flex flex-row items-center justify-end ml-auto'>
                <img src={require('./img/awards/SAG.png')} alt='SAG' className='w-[48px] h-[48px] p-1 object-contain' />
                <img src={require('./img/awards/Saturn.png')} alt='Saturn' className='w-[48px] h-[48px] p-1 object-contain' />
                <img src={require('./img/awards/BAFTA.png')} alt='BAFTA' className='w-[48px] h-[48px] p-1 object-contain' />
                <img src={require('./img/awards/Golden Globe.png')} alt='Golden Globe' className='w-[48px] h-[48px] p-1 object-contain' />
                <img src={require('./img/awards/Oscar.png')} alt='Oscar' className='w-[48px] h-[48px] p-1 object-contain' />
              </div>
            </div>

          </div>
        </div>
        <BlockBar />
      </div>
    </div>
  </div>
  );
}

export default App;
