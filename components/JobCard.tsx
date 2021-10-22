import React, { FC } from 'react';
import { BsBookmarkPlus, BsFillBookmarkFill } from 'react-icons/bs';
import { ImLocation } from 'react-icons/im';
import { JobType } from 'types/JobType';
import { formatIsoDate } from 'utilities/formatIsoDate';

interface Props {
    job: JobType;
    bookmarked: Boolean;
    saveJob: (job: JobType) => void;
    removeJob: (job: JobType) => void;
}

const JobCard: FC<Props> = ({ job, saveJob, removeJob, bookmarked }) => {
    return (
        <div
            key={job.id}
            className='bg-white py-6 space-y-3 max-w-5xl px-6 shadow-sm rounded-lg sm:px-10 ml-0 sm:ml-5 w-full'
        >
            <div className='flex justify-between items-center'>
                <span className='text-2xl font-bold'>{job.title}</span>
                {!bookmarked ? (
                    <BsBookmarkPlus
                        className='text-xl cursor-pointer'
                        onClick={() => saveJob(job)}
                    />
                ) : (
                    <BsFillBookmarkFill
                        className='text-xl cursor-pointer text-indigo-500'
                        onClick={() => removeJob(job)}
                    />
                )}
            </div>
            <p className='text-gray-400 flex items-center'>
                <span className='mr-3'>{job.company.display_name}</span>
                <ImLocation className='text-gray-400 text-xl' />
                {job.location.display_name}
            </p>
            <p className='text-gray-600 line-clamp-2'>{job.description}</p>
            <div className='flex justify-between items-center'>
                <a
                    target='_blank'
                    href={job.redirect_url}
                    className='py-2 px-4 rounded bg-gray-900 text-white hover:bg-gray-700'
                >
                    View
                </a>
                <span className='text-gray-400'>{formatIsoDate(job.created)}</span>
            </div>
        </div>
    );
};

export default JobCard;
