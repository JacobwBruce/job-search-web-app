import Header from '@/components/Header';
import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import InitialSearchPage from '@/components/InitialSearchPage';
import JobResults from '@/components/JobResults';
import axios from 'axios';
import { JobType } from 'types/JobType';
import Head from 'next/head';
import { bookmarkJob, deleteJobBookmark, getUserBookmarks } from '@/lib/db';
import { useAuth } from '@/lib/auth';
import Loader from '@/components/Loader';
import JobSearchForm from '@/components/JobSearchForm';
import Alert from '@/components/Alert';
import Toast from '@/components/Toast';

export interface SearchFormValues {
    search: string;
    where: string;
    company: string;
}

const Search = ({ search, where, company }) => {
    const [jobs, setJobs] = useState<Array<JobType>>([]);
    const [loading, setLoading] = useState<boolean>(search);
    const [alerts, setAlerts] = useState<Array<any>>([]);
    const { user } = useAuth();

    const [bookmarkedJobs, setBookmarkedJobs] = useState([]);

    useEffect(() => {
        getBookmarks();
    }, [user]);

    const getBookmarks = async () => {
        if (user) {
            const data = await getUserBookmarks(user.uid);
            setBookmarkedJobs(data);
        }
    };

    useEffect(() => {
        if (search) {
            queryJobs();
        }
    }, []);

    const formatJobData = (s: string): string => {
        return s.replaceAll('<strong>', '').replaceAll('</strong>', '');
    };

    const saveJob = (job: JobType) => {
        setLoading(true);
        bookmarkJob(user.uid, job);
        getBookmarks();
        setLoading(false);
        const temp = alerts;
        temp.push({
            title: 'Saved Job',
            color: 'green',
            message: `Successfully saved ${job.title} posting from ${job.company.display_name}`,
        });
        setAlerts(temp);
    };

    const removeJob = (job: JobType) => {
        setLoading(true);
        deleteJobBookmark(user.uid, job.id);
        getBookmarks();
        setLoading(false);
        const temp = alerts;
        temp.push({
            title: 'Saved Job',
            color: 'green',
            message: `Successfully saved ${job.title} posting from ${job.company.display_name}`,
        });
        setAlerts(temp);
    };

    const queryJobs = async () => {
        try {
            let queryOptions = `&what=${search}`;

            if (where) queryOptions += `&where=${where}`;
            if (company) queryOptions += `&company=${company}`;

            const { data } = await axios.get(
                `https://api.adzuna.com/v1/api/jobs/ca/search/1?app_id=${process.env.NEXT_PUBLIC_ADZUNA_ID}&app_key=${process.env.NEXT_PUBLIC_ADZUNA_KEY}${queryOptions}`
            );

            for (let i = 0; i < data.results.length; i++) {
                data.results[i].title = formatJobData(data.results[i].title);
                data.results[i].description = formatJobData(data.results[i].description);
            }

            setJobs(data.results);
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    };

    return (
        <>
            <Head>
                <title>Search Jobs</title>
            </Head>
            <Header />

            {alerts && (
                <ul className='fixed bottom-6 right-6 space-y-6'>
                    {alerts.map((alert) => (
                        <li>
                            <Toast title={alert.title} color={alert.color}>
                                {alert.message}
                            </Toast>
                        </li>
                    ))}
                </ul>
            )}
            {!search && <InitialSearchPage />}
            {loading && <Loader />}
            {!loading && search && (
                <>
                    <JobSearchForm />
                    <JobResults
                        jobs={jobs}
                        bookmarkedJobs={bookmarkedJobs}
                        saveJob={saveJob}
                        removeJob={removeJob}
                    />
                </>
            )}
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    return {
        props: {
            search: query.search || null,
            where: query.where || null,
            company: query.company || null,
        },
    };
};

export default Search;
