import React from 'react';
import nookies from 'nookies';
import { GetServerSideProps } from 'next';
import { verifyIdToken } from '@/lib/firebaseAdmin';
import Header from '@/components/Header';

const dashboard = ({ user }) => {
    if (user) {
        return (
            <>
                <Header />
                <div>
                    <h1 className='text-4xl mt-10 text-center'>Dashboard Page</h1>
                </div>
            </>
        );
    } else {
        return <div>Loading...</div>;
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
