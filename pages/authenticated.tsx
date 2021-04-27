import React, { FC } from 'react';
import nookies from 'nookies';
import firebase from 'firebase/app';
import firebaseClient from '@/lib/firebaseClient';
import { GetServerSideProps } from 'next';
import { verifyIdToken } from '@/lib/firebaseAdmin';

const authenticated = ({ user }) => {
    if (user) {
        return <div>Authenticated route</div>;
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

export default authenticated;
