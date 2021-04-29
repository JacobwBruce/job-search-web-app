import Header from '@/components/Header';
import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import InitialSearchPage from '@/components/InitialSearchPage';
import JobResults from '@/components/JobResults';

export interface SearchFormValues {
    search: string;
    where: string;
    company: string;
}

const search = ({ search, where, company }) => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState<boolean>(search);

    useEffect(() => {
        //make a request to API

        setLoading(false);
    }, []);

    return (
        <>
            <Header />
            {!search && <InitialSearchPage />}
            {loading && <div>loading</div>}
            {!loading && search && <JobResults />}
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

export default search;
