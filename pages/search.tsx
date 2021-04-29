import Header from '@/components/Header';
import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import InitialSearchPage from '@/components/InitialSearchPage';
import JobResults from '@/components/JobResults';
import axios from 'axios';
import { JobType } from 'types/JobType';

export interface SearchFormValues {
    search: string;
    where: string;
    company: string;
}

const Search = ({ search, where, company }) => {
    const [jobs, setJobs] = useState<Array<JobType>>([]);
    const [loading, setLoading] = useState<boolean>(search);

    useEffect(() => {
        if (search) {
            queryJobs();
        }
    }, []);

    const formatJobData = (s: string): string => {
        return s.replaceAll('<strong>', '').replaceAll('</strong>', '');
    };

    const queryJobs = async () => {
        try {
            let queryOptions = `&what=${search}`;

            if (where) queryOptions += `&where=${where}`;
            if (company) queryOptions += `&company=${company}`;

            const { data } = await axios.get(
                `https://api.adzuna.com/v1/api/jobs/ca/search/1?app_id=${process.env.NEXT_PUBLIC_ADZUNA_ID}&app_key=${process.env.NEXT_PUBLIC_ADZUNA_KEY}${queryOptions}`
            );

            for (let i = 0; i < data.results.length; i++) {
                data.results[i].title = formatJobData(data.results[i].title);
                data.results[i].description = formatJobData(data.results[i].description);
            }

            setJobs(data.results);
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    };

    return (
        <>
            <Header />
            {!search && <InitialSearchPage />}
            {loading && <div>loading</div>}
            {!loading && search && <JobResults jobs={jobs} />}
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
