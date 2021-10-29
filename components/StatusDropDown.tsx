import React, { FC, useEffect, useState } from 'react';

interface Props {
    status: string;
}

const StatusDropDown: FC<Props> = ({ status }) => {
    const [colorClasses, setColorClasses] = useState<string>('gray');
    const statuses = [
        'Applied',
        'Referred',
        'Interviewed',
        'Rejected',
        'Offered',
        'Signed',
        'No Status',
    ];

    useEffect(() => {
        switch (status) {
            case statuses[0]:
                console.log('Setting color to yellow');
                setColorClasses('bg-yellow-100 text-yellow-800');
                break;
            case statuses[1]:
                setColorClasses('bg-yellow-100 text-yellow-800');
                break;
            case statuses[2]:
                setColorClasses('bg-blue-100 text-blue-800');
                break;
            case statuses[3]:
                setColorClasses('bg-red-100 text-red-800');
                break;
            case statuses[4]:
                setColorClasses('bg-green-100 text-green-800');
                break;
            case statuses[5]:
                setColorClasses('bg-green-100 text-green-800');
                break;
            default:
                setColorClasses('bg-gray-100 text-gray-800');
        }
    }, []);

    return (
        <div className='group inline-block'>
            <button className='outline-none focus:outline-none px-3 py-1 bg-white rounded-sm flex items-center min-w-32'>
                <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${colorClasses}`}
                >
                    {status}
                </span>
            </button>
            <ul className='bg-white border rounded-md transform scale-0 group-hover:scale-100 absolute transition duration-150 ease-in-out origin-top w-32 text-center'>
                {statuses.map((s) => (
                    <li
                        key={`${s}-dropdown`}
                        onClick={() => alert(`Changed status to: ${s}`)}
                        className='cursor-pointer rounded-sm px-3 py-1 list hover:bg-indigo-600 hover:text-white'
                    >
                        {s}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default StatusDropDown;
