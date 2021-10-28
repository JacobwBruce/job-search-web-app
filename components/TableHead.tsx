import React, { FC } from 'react';

const TableHead: FC = ({ children }) => {
    return <thead className='bg-gray-50'>{children}</thead>;
};

// <th scope='col' className='relative px-6 py-3'>
//     <span className='sr-only'>Edit</span>
// </th>;

export default TableHead;
