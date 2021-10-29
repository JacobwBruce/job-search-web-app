import React, { useEffect, useState } from 'react';
import nookies from 'nookies';
import { GetServerSideProps } from 'next';
import { verifyIdToken } from '@/lib/firebaseAdmin';
import Header from '@/components/Header';
import Head from 'next/head';
import { deleteJobBookmark, getUserBookmarks, updateJobStatus } from '@/lib/db';
import Loader from '@/components/Loader';
import { JobType } from 'types/JobType';
import Table from '@/components/Table';
import TableHead from '@/components/TableHead';
import TH from '@/components/TH';
import TableBody from '@/components/TableBody';
import TD from '@/components/TD';
import { formatIsoDate } from 'utilities/formatIsoDate';
import StatusDropDown from '@/components/StatusDropDown';
import Dropdown from '@/components/Dropdown';
import { BsThreeDotsVertical } from 'react-icons/bs';
import DropdownItem from '@/components/DropdownItem';
import Modal from '@/components/Modal';
import { IoIosAlert } from 'react-icons/io';
import Toast from '@/components/Toast';

const dashboard = ({ user }) => {
    const [bookmarks, setBookmarks] = useState<Array<JobType>>([]);
    const [selectedJob, setSelectedJob] = useState<JobType | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [alerts, setAlerts] = useState<Array<any>>([]);

    useEffect(() => {
        getBookmarks();
    }, []);

    const getBookmarks = async () => {
        const data = await getUserBookmarks(user.uid);
        //@ts-ignore
        setBookmarks(data);
        setLoading(false);
    };

    const removeJob = async (job: JobType) => {
        setLoading(true);

        await deleteJobBookmark(user.uid, job.id).catch((error) => createErrorToast(error));
        setSelectedJob(null);

        createSuccessfulToast(
            'Deleted Job',
            `Successfully deleted ${job.title} posting from ${job.company.display_name}`
        );

        getBookmarks();
    };

    const changeJobStatus = async (job: JobType, status: string) => {
        setLoading(true);

        await updateJobStatus(user.uid, job, status).catch((error) => createErrorToast(error));

        createSuccessfulToast(
            'Updated Job Status',
            `Successfully updated ${job.title} status to ${status}`
        );

        getBookmarks();
    };

    const createSuccessfulToast = (title: string, message: string) => {
        const temp = alerts;
        temp.push({
            title,
            color: 'green',
            message,
        });
        setAlerts(temp);
    };

    const createErrorToast = (message: string) => {
        const temp = alerts;
        temp.push({
            title: 'Error',
            color: 'red',
            message,
        });
        setAlerts(temp);
    };

    if (user) {
        return (
            <>
                <Head>
                    <title>Dashboard</title>
                </Head>
                <Header />

                {alerts && (
                    <ul className='fixed bottom-6 right-6 space-y-6'>
                        {alerts.map((alert, index) => (
                            <li key={`toast-${index}`}>
                                <Toast title={alert.title} color={alert.color}>
                                    {alert.message}
                                </Toast>
                            </li>
                        ))}
                    </ul>
                )}

                {selectedJob && (
                    <Modal
                        title='Delete Job?'
                        icon={<IoIosAlert className='h-6 w-6 text-red-600' aria-hidden='true' />}
                        color='red'
                        buttonText='Delete'
                        confirmCallback={() => removeJob(selectedJob)}
                        cancelCallback={() => setSelectedJob(null)}
                    >
                        Are you sure you want to delete{' '}
                        <span className='font-medium'>{selectedJob.title}</span> posting from{' '}
                        <span className='font-medium'>{selectedJob.company.display_name}</span>?
                    </Modal>
                )}

                {loading ? (
                    <Loader />
                ) : (
                    <>
                        <h1 className='text-4xl mt-10 text-center mb-6'>Saved Job Postings</h1>

                        <div className='flex justify-center'>
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
                                                <StatusDropDown
                                                    job={bookmark}
                                                    callback={changeJobStatus}
                                                    status={bookmark.status}
                                                />
                                            </TD>
                                            <TD>
                                                <div className='flex flex-row align-middle'>
                                                    <div className='text-right text-sm font-medium'>
                                                        <a
                                                            href={bookmark.redirect_url}
                                                            target='__blank__'
                                                            className='text-indigo-600 hover:text-indigo-900'
                                                        >
                                                            Visit
                                                        </a>
                                                    </div>
                                                    <div className='ml-2'>
                                                        <Dropdown text={<BsThreeDotsVertical />}>
                                                            <DropdownItem
                                                                onClick={() =>
                                                                    setSelectedJob(bookmark)
                                                                }
                                                            >
                                                                Delete
                                                            </DropdownItem>
                                                        </Dropdown>
                                                    </div>
                                                </div>
                                            </TD>
                                        </tr>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </>
                )}
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
