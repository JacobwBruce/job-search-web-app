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
            <div className='h-5/6 flex md:items-center'>
                <div className='flex flex-col md:mt-20 lg:mt-0 lg:flex-row justify-items-center mx-4 md:mx-10'>
                    <h1 className='text-xl my-12 text-center font-bold lg:text-right lg:text-4xl md:mx-10'>
                        Welcome to{' '}
                        <span className='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-red-500'>
                            JobSearch!
                        </span>{' '}
                        <br />A student project for searching, organizing and keeping track of job
                        listings
                    </h1>

                    <div className='text-center'>
                        <img
                            className=' max-w-full lg:max-w-lg'
                            src='/control_panel.svg'
                            alt='control panel'
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
