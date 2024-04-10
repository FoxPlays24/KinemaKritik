
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import SideBar from './components/SideBar'
import BlockBar from './components/BlockBar'

import Film from './pages/Film'
import User from './pages/User'
// import Main from './pages/Main'
import Reviews from './pages/Reviews'
import Notifications from './pages/Notifications'

function App() {
  return (
  <div className='bg-[#DDDFE1] h-screen'>
    <div className='container h-full mx-auto'>
      <div className='grid grid-cols-4 h-full'>
        <SideBar />
        <div className='bg-white shadow-xl col-span-3 lg:col-span-2 p-4 overflow-y-scroll scrollbar-hide'>
          <BrowserRouter>
            <Routes>
              {/* <Route path='/' element={<Main/>}/> */}
              <Route path='/' element={<Reviews/>}/>
              <Route path='/film/:id' element={<Film/>}/>
              <Route path='/user/:id' element={<User/>}/>
              <Route path='/notifications' element={<Notifications/>}/>
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
