import React, { FC } from 'react';
import { JobType } from 'types/JobType';
import JobSearchForm from './JobSearchForm';
import { ImLocation } from 'react-icons/im';
import { BsBookmarkPlus, BsFillBookmarkFill } from 'react-icons/bs';
import { bookmarkJob } from '@/lib/db';
import { useAuth } from '@/lib/auth';

interface Props {
    jobs: Array<JobType>;
}

const JobResults: FC<Props> = ({ jobs }) => {
    const { user } = useAuth();

    const formatIsoDate = (isoDate: string): string => {
        var d = new Date(isoDate);
        return d.toLocaleDateString('en-US');
    };

    const saveJob = (job: JobType) => {
        bookmarkJob(user.uid, job);
        alert('saved job');
    };

    const removeJob = (job: JobType) => {
        //save the job to Firebase
        console.log(job);
    };
    console.log(jobs);
    return (
        <div className='flex flex-col items-center mt-5 w-full space-y-8 pb-10'>
            <JobSearchForm />
            {jobs.map((job) => (
                <div
                    key={job.id}
                    className='bg-white py-6 space-y-3 max-w-5xl px-6 shadow-sm rounded-lg sm:px-10 ml-0 sm:ml-5 w-full'
                >
                    <div className='flex justify-between items-center'>
                        <span className='text-2xl font-bold'>{job.title}</span>
                        <BsBookmarkPlus
                            className='text-xl cursor-pointer'
                            onClick={() => saveJob(job)}
                        />
                        {/* <BsFillBookmarkFill
                            className='text-xl cursor-pointer text-indigo-500'
                            onClick={() => removeJob(job)}
                        /> */}
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
            ))}
        </div>
    );
};

export default JobResults;
