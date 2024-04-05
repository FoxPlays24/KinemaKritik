import React from 'react';
import { IconType } from 'react-icons';

interface SideBarComponentProps {
    name: string;
    href?: string;
    icon: IconType;
}
  
const SideBarComponent : React.FC<SideBarComponentProps> = ({ name, icon: Icon, href }) => {
  return (
  <div className='flex flex-row items-center justify-center lg:justify-start'>
    <div className='
    text-zinc-400
    rounded-full 
    p-1
    cursor-pointer
    transition
    hover:text-zinc-800
    hover:font-bold
    hover:bg-gray-200
    lg:flex
    items-center
    text-lg
    font-roboto
    hover:scale-105
    '>
        <Icon size={32} />
        <a href={href}>
          <p className='hidden lg:block pl-3'>{name}</p>
        </a>
    </div>
  </div>
  );
}

export default SideBarComponent;