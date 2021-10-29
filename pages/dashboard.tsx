import React, { useEffect, useState } from 'react';
import nookies from 'nookies';
import { GetServerSideProps } from 'next';
import { verifyIdToken } from '@/lib/firebaseAdmin';
import Header from '@/components/Header';
import Head from 'next/head';
import { getUserBookmarks } from '@/lib/db';
import Loader from '@/components/Loader';
import { JobType } from 'types/JobType';
import Table from '@/components/Table';
import TableHead from '@/components/TableHead';
import TH from '@/components/TH';
import TableBody from '@/components/TableBody';
import TD from '@/components/TD';
import { formatIsoDate } from 'utilities/formatIsoDate';
import StatusDropDown from '@/components/StatusDropDown';

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

    if (user) {
        return (
            <>
                <Head>
                    <title>Dashboard</title>
                </Head>
                <Header />
                <div>
                    <h1 className='text-4xl mt-10 text-center mb-6'>Saved Job Postings</h1>
                </div>
                <div className='w-full flex justify-center'>
                    <Table>
                        <TableHead>
                            <tr>
                                <TH>Position</TH>
                                <TH>Company</TH>
                                <TH>Date Saved</TH>
                                <TH center={true}>Status</TH>
                                <th scope='col' className='relative px-6 py-3'>
                                    <span className='sr-only'>Link</span>
                                </th>
                            </tr>
                        </TableHead>
                        <TableBody>
                            {bookmarks.map((bookmark) => (
                                <tr key={bookmark.id}>
                                    <TD>
                                        <div className='text-sm font-medium text-gray-900'>
                                            {bookmark.title}
                                        </div>
                                    </TD>
                                    <TD>
                                        <div className='text-sm text-gray-900'>
                                            {bookmark.company.display_name}
                                        </div>
                                        <div className='text-sm text-gray-500'>
                                            {bookmark.location.display_name}
                                        </div>
                                    </TD>
                                    <TD>
                                        <div className='text-sm text-gray-900'>
                                            {formatIsoDate(bookmark.created)}
                                        </div>
                                    </TD>
                                    <TD>
                                        <StatusDropDown status={bookmark.status || 'No Status'} />
                                    </TD>
                                    <TD>
                                        <div className='text-right text-sm font-medium'>
                                            <a
                                                href={bookmark.redirect_url}
                                                target='__blank__'
                                                className='text-indigo-600 hover:text-indigo-900'
                                            >
                                                Visit
                                            </a>
                                        </div>
                                    </TD>
                                </tr>
                            ))}
                        </TableBody>
                    </Table>
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
