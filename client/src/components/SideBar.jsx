import { IoIosNotifications } from 'react-icons/io';
import { TiHome } from 'react-icons/ti';
import { MdMovie } from 'react-icons/md';
import { RiMessageFill } from 'react-icons/ri';
import { IoIosMore } from 'react-icons/io';

import profile from '../img/users/1.png';
import logo from '../img/logo.svg';

import SideBarComponent from './SideBarComponent.tsx';

const SideBarLogo = 
  <div className='bg-white p-4 w-28 h-28 rounded shadow-xl mb-6 hidden lg:block'>
    <a href='/'>
      <img src={logo} alt='KinemaKritik' />
    </a>
  </div>;

const SideBar = () => {
  const items = [
    { name: 'Уведомления', icon: IoIosNotifications, href: '.' },
    { name: 'Главная', icon: TiHome, href: '/' },
    { name: 'Кинема', icon: MdMovie, href: '/films' },
    { name: 'Рецензии', icon: RiMessageFill, href: '/reviews' },
    { name: 'Еще', icon: IoIosMore, href: '.' }
  ];

  return (
  <div className='flex flex-col items-end mr-8 justify-center'>
    <div className='flex flex-col items-center'>
    {SideBarLogo}

    {/* Side Bar */}
    <div className='px-4 py-8 bg-white rounded shadow-xl'>

      {/* User */}
      <a href='/FoxPlays'>
      <div className='mb-4 flex items-center gap-4 select-none cursor-pointer p-1 rounded-2xl transition hover:bg-gray-200 hover:scale-105'>
        {/* User Picture */}
        <div className='relative w-12'>
          <img className='rounded-full' src={profile} alt='Profile' />
          <span className='-bottom-1 -right-1 absolute bg-gray-300 rounded-full text-xs text-gray-600'>+210</span>
        </div>
        {/* User Nickname & Status */}
        <div className='w-40 hidden lg:block'>
          <span className='text-xl font-bold truncate'>FoxPlays 🦊</span>
          <span className='text-gray-400 line-clamp-2 leading-none text-sm'>Рецензии не для слабонервных</span>
        </div>
      </div>
      </a>

      {/* Components */}
      {items.map((item) => (
        <SideBarComponent key={item.name} name={item.name} icon={item.icon} href={item.href} />
      ))}
    </div>
    </div>
    
  </div>
  );
}

export default SideBar;