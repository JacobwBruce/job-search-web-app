import React, { FC, useEffect, useState } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';

interface Props {
    title: string;
    color: string;
    timeout?: number;
}

const Toast: FC<Props> = ({ title, color, timeout = 5000, children }) => {
    const [colorClasses, setColorClasses] = useState('');
    const [show, setShow] = useState<boolean>(true);

    useEffect(() => {
        /* 
        Dynamically setting the color like this -> 'border-${color}-500' doesn't work with Tailwind
        Need to type out each class strongly, as in the switch statement below so tailwind doesn't 'purge' unused classes
        */
        switch (color) {
            case 'red':
                setColorClasses('bg-red-100 border-red-700');
                break;
            case 'blue':
                setColorClasses('bg-blue-100 border-blue-700');
                break;
            case 'yellow':
                setColorClasses('bg-yellow-100 border-yellow-700');
                break;
            case 'indigo':
                setColorClasses('bg-indigo-100 border-indigo-700');
                break;
            case 'green':
                setColorClasses('bg-green-100 border-green-700');
                break;
            case 'pink':
                setColorClasses('bg-pink-100 border-pink-700');
                break;
            case 'purple':
                setColorClasses('bg-purple-100 border-purple-700');
                break;
            case 'gray':
                setColorClasses('bg-gray-100 border-gray-700');
                break;
        }

        setTimeout(() => {
            removeToast();
        }, timeout);
    }, []);

    const removeToast = () => {
        setShow(false);
    };

    return (
        <div
            className={`fixed right-6 bottom-6 border-l-4 rounded-b px-4 py-3 shadow-md max-w-sm ${colorClasses} ${
                show ? 'visible' : 'invisible'
            }`}
        >
            <div className='flex flex-row flex-nowrap justify-between'>
                <p className='font-medium text-lg'>{title}</p>
                <AiFillCloseCircle className='text-xl cursor-pointer' onClick={removeToast} />
            </div>
            <p>{children}</p>
        </div>
    );
};

export default Toast;
