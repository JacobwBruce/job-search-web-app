import React, { useEffect, useState } from 'react';
import nookies from 'nookies';
import { GetServerSideProps } from 'next';
import { verifyIdToken } from '@/lib/firebaseAdmin';
import Header from '@/components/Header';
import Head from 'next/head';
import { bookmarkJob, deleteJobBookmark, getUserBookmarks } from '@/lib/db';
import Loader from '@/components/Loader';
import { JobType } from 'types/JobType';
import JobResults from '@/components/JobResults';

const dashboard = ({ user }) => {
    const [bookmarks, setBookmarks] = useState<Array<JobType>>([]);

    useEffect(() => {
        getBookmarks();
    }, []);

    const getBookmarks = async () => {
        const data = await getUserBookmarks(user.uid);
        //@ts-ignore
        setBookmarks(data);
    };

    const saveJob = (job: JobType) => {
        bookmarkJob(user.uid, job);
        getBookmarks();
    };

    const removeJob = (job: JobType) => {
        deleteJobBookmark(user.uid, job.id);
        getBookmarks();
    };

    if (user) {
        return (
            <>
                <Head>
                    <title>Dashboard</title>
                </Head>
                <Header />
                <div>
                    <h1 className='text-4xl mt-10 text-center'>Saved Job Postings</h1>
                </div>
                <JobResults
                    jobs={bookmarks}
                    bookmarkedJobs={bookmarks}
                    saveJob={saveJob}
                    removeJob={removeJob}
                />
            </>
        );
    } else {
        return <Loader />;
    }
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    try {
        const cookies = nookies.get(context);
        const token = await verifyIdToken(cookies.token);

        return {
            props: {
                user: token,
            },
        };
    } catch (err) {
        context.res.writeHead(302, { location: '/login' });
        context.res.end();
        return {
            props: [],
        };
    }
};

export default dashboard;
