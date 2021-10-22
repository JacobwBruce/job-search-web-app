import React, { FC } from 'react';
import { JobType } from 'types/JobType';
import JobCard from './JobCard';
import JobSearchForm from './JobSearchForm';

interface Props {
    jobs: Array<JobType>;
    bookmarkedJobs: Array<any>;
    saveJob: (job: JobType) => void;
    removeJob: (job: JobType) => void;
}

const JobResults: FC<Props> = ({ jobs, bookmarkedJobs, saveJob, removeJob }) => {
    const checkIfBookmarked = (job: JobType): boolean => {
        let flag = false;

        bookmarkedJobs.forEach((bookmark) => {
            if (bookmark.id === job.id) {
                flag = true;
            }
        });

        return flag;
    };

    return (
        <div className='flex flex-col items-center mt-5 w-full space-y-8 pb-10'>
            {jobs.map((job) => (
                <JobCard
                    key={job.id}
                    job={job}
                    saveJob={saveJob}
                    removeJob={removeJob}
                    bookmarked={checkIfBookmarked(job)}
                />
            ))}
        </div>
    );
};

export default JobResults;
