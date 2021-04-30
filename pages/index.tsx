import React from 'react';
import Header from '@/components/Header';
import Head from 'next/head';

export default function Home() {
    return (
        <>
            <Head>
                <title>JobSearch</title>
            </Head>
            <Header />
            <div>
                <h1 className='text-4xl mt-10 text-center'>Home Page</h1>
            </div>
        </>
    );
}
