import React, { useEffect } from 'react';
import nookies from 'nookies';
import { GetServerSideProps } from 'next';
import { verifyIdToken } from '@/lib/firebaseAdmin';
import Header from '@/components/Header';
import Head from 'next/head';
import { getUserBookmarks } from '@/lib/db';
import Loader from '@/components/Loader';

const dashboard = ({ user }) => {
    useEffect(() => {
        getBookmarks();
    }, []);

    const getBookmarks = async () => {
        const data = await getUserBookmarks(user.uid);
    };

    if (user) {
        return (
            <>
                <Head>
                    <title>Dashboard</title>
                </Head>
                <Header />
                <div>
                    <h1 className='text-4xl mt-10 text-center'>Dashboard Page</h1>
                </div>
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
