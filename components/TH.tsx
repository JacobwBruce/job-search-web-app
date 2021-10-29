import React, { FC } from 'react';

interface Props {
    center?: boolean;
}

const TH: FC<Props> = ({ children, center }) => {
    return (
        <th
            scope='col'
            className={`px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider ${
                center ? 'text-center' : 'text-left'
            }`}
        >
            {children}
        </th>
    );
};

export default TH;
