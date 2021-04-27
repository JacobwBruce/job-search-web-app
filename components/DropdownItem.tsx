import React, { FC } from 'react';
import '@/styles/Dropdown.module.css';

interface Props {
    onClick: React.MouseEventHandler<HTMLLIElement>;
}

const DropdownItem: FC<Props> = ({ children, onClick }) => {
    return (
        <li
            onClick={onClick}
            className='cursor-pointer rounded-sm px-3 py-1 list hover:bg-indigo-600 hover:text-white'
        >
            {children}
        </li>
    );
};

export default DropdownItem;
