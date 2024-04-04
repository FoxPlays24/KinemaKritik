import React from 'react';

interface BlockBarComponentProps {
    id: number;
    title: string;
}

const BlockBarComponent : React.FC<BlockBarComponentProps> = ({ id, title }) => {
    return (
        <a href={`/film/${id}`} className='transition hover:scale-[98%] hover:brightness-90'>
            <img src={require(`../img/movies/blocks/${id}.png`)} title={title} alt={title} className='w-[300px] h-[300px] rounded-2xl' loading='eager' />
        </a>
    );
}

export default BlockBarComponent;