import React, { FC, useEffect, useState } from 'react';

interface Props {
    title: string;
    color: string;
    fixed?: boolean;
}

const Alert: FC<Props> = ({ title, color, children, fixed = false }) => {
    const [colorClassesOne, setColorClassesOne] = useState<string>('');
    const [colorClassesTwo, setColorClassesTwo] = useState<string>('');

    useEffect(() => {
        /* 
        Dynamically setting the color like this -> 'border-${color}-500' doesn't work with Tailwind
        Need to type out each class strongly, as in the switch statement below so tailwind doesn't 'purge' unused classes
        */
        switch (color) {
            case 'red':
                setColorClassesOne('bg-red-100 border-red-500 text-red-900');
                setColorClassesTwo('text-red-500');
                break;
            case 'blue':
                setColorClassesOne('bg-blue-100 border-blue-500 text-blue-900');
                setColorClassesTwo('text-blue-500');
                break;
            case 'yellow':
                setColorClassesOne('bg-yellow-100 border-yellow-500 text-yellow-900');
                setColorClassesTwo('text-yellow-500');
                break;
            case 'indigo':
                setColorClassesOne('bg-indigo-100 border-indigo-500 text-indigo-900');
                setColorClassesTwo('text-indigo-500');
                break;
            case 'green':
                setColorClassesOne('bg-green-100 border-green-500 text-green-900');
                setColorClassesTwo('text-green-500');
                break;
            case 'pink':
                setColorClassesOne('bg-pink-100 border-pink-500 text-pink-900');
                setColorClassesTwo('text-pink-500');
                break;
            case 'purple':
                setColorClassesOne('bg-purple-100 border-purple-500 text-purple-900');
                setColorClassesTwo('text-purple-500');
                break;
            case 'gray':
                setColorClassesOne('bg-gray-100 border-gray-500 text-gray-900');
                setColorClassesTwo('text-gray-500');
                break;
        }
    }, []);

    return (
        <div
            className={`${colorClassesOne} border-t-4 rounded-b px-4 py-3 shadow-md ${
                fixed && 'fixed w-full'
            }`}
            role='alert'
        >
            <div className='flex'>
                <div className='py-1'>
                    <svg
                        className={`fill-current h-6 w-6 ${colorClassesTwo} mr-4`}
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 20 20'
                    >
                        <path d='M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z' />
                    </svg>
                </div>
                <div>
                    <p className='font-bold'>{title}</p>
                    <p className='text-sm'>{children}</p>
                </div>
            </div>
        </div>
    );
};

export default Alert;
