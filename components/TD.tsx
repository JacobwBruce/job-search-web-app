import React, { FC } from 'react';

const TD: FC = ({ children }) => {
    return <td className='px-6 py-4 whitespace-nowrap'>{children}</td>;
};

export default TD;
