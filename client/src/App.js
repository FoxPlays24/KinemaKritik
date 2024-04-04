
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import SideBar from './components/SideBar'
import BlockBar from './components/BlockBar'

import Film from './pages/Film';

function App() {
  return (
  <div className='bg-[#DDDFE1] h-screen'>
    <div className='container h-full mx-auto'>
      <div className='grid grid-cols-4 h-full'>
        <SideBar />
        <div className='bg-white shadow-xl col-span-3 lg:col-span-2 p-4'>
          <BrowserRouter>
            <Routes>
              {/* <Route path="/" element={<Main/>}/> */}
              <Route path="/film/:id" element={<Film/>}/>
            </Routes>
          </BrowserRouter>
        </div>
        <BlockBar />
      </div>
    </div>
  </div>
  );
}

export default App;
