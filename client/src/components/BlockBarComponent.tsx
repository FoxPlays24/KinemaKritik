import React from 'react';

interface BlockBarComponentProps {
    image: string;
}

const BlockBarComponent : React.FC<BlockBarComponentProps> = ({ image }) => {
    return (
        <img src={image} alt='movie' className='w-[300px] h-[300px] rounded-2xl cursor-pointer transition hover:scale-[98%] hover:brightness-90' loading='eager' />
    );
}

export default BlockBarComponent;