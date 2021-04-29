import Header from '@/components/Header';
import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import InitialSearchPage from '@/components/InitialSearchPage';
import JobResults from '@/components/JobResults';
import axios from 'axios';

export interface SearchFormValues {
    search: string;
    where: string;
    company: string;
}

const Search = ({ search, where, company }) => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState<boolean>(search);

    useEffect(() => {
        if (search) {
            queryJobs();
        }
    }, []);

    const queryJobs = async () => {
        const { data } = await axios.get(
            `https://api.adzuna.com/v1/api/jobs/ca/search/1?app_id=${process.env.NEXT_PUBLIC_ADZUNA_ID}&app_key=${process.env.NEXT_PUBLIC_ADZUNA_KEY}&what=${search}`
        );
        console.log(data);
        setLoading(false);
    };

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

export default Search;
