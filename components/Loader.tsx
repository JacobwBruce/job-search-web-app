import React, { FC } from 'react';

const Loader: FC = () => {
    return (
        <div className='flex items-center justify-center space-x-2 animate-pulse h-full'>
            <div className='w-8 h-8 bg-blue-400 rounded-full'></div>
            <div className='w-8 h-8 bg-blue-400 rounded-full'></div>
            <div className='w-8 h-8 bg-blue-400 rounded-full'></div>
        </div>
    );
};

export default Loader;
