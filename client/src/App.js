
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import SideBar from './components/SideBar'
import BlockBar from './components/BlockBar'

import Film from './pages/Film'
import User from './pages/User'
import Reviews from './pages/Reviews'
import Review from './pages/Review'

function App() {
  return (
  <div className='bg-gray-200 h-screen'>
    <div className='grid grid-cols-1 lg:grid-cols-4 h-full'>
      <SideBar />
      <main className='grid-col-2 col-span-2 mx-1 lg:mx-0 bg-white shadow-xl overflow-y-scroll scrollbar-hide'>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Reviews/>}/>
            <Route path='/film/:id' element={<Film/>}/>
            <Route path='/user/:id' element={<User/>}/>
            <Route path='/review/:id' element={<Review/>}/>
          </Routes>
        </BrowserRouter>
      </main>
      <BlockBar />
    </div>
  </div>
  );
}

export default App;
