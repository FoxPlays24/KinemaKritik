import React from 'react';
import { IconType } from 'react-icons';

interface SideBarComponentProps {
    name: string;
    icon: IconType;
    href?: string;
}
  
const SideBarComponent : React.FC<SideBarComponentProps> = ({ name, icon: Icon, href }) => {
  return (
  <a className='
  flex flex-row 
  items-center 
  select-none 
  gap-2 
  px-3
  lg:px-4 
  py-1 
  rounded-full 
  bg-gray-300 
  transition 
  hover:bg-gray-400 hover:text-white 
  active:bg-gray-400 active:text-white' href={href}>
    <Icon size={32} className='w-6' /><p className='hidden lg:block'>{name}</p>
  </a>
  );
}

export default SideBarComponent