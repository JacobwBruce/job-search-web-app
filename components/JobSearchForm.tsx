import { SearchFormValues } from 'pages/search';
import React from 'react';
import { useForm } from 'react-hook-form';
import { BsSearch, BsFillBriefcaseFill } from 'react-icons/bs';
import { ImLocation } from 'react-icons/im';

const JobSearchForm = () => {
    const { register } = useForm<SearchFormValues>();
    return (
        <div className='flex flex-col items-center mt-5 w-full'>
            <div className='bg-white py-6  max-w-5xl px-6 shadow-sm rounded-lg sm:px-10 ml-0 sm:ml-5'>
                <form className='mb-0 flex justify-evenly items-center space-x-12'>
                    <div>
                        <div className='mt-1 flex flex-row items-center'>
                            <BsSearch className='text-gray-400 text-xl' />
                            <input
                                className='w-full px-3 py-2 focus:border-b-2 focus:outline-none focus:border-indigo-500'
                                autoComplete='off'
                                type='text'
                                placeholder='Search'
                                required
                                {...register('search')}
                            />
                        </div>
                    </div>

                    <div className='w-1 rounded bg-gray-100 h-12'></div>

                    <div>
                        <div className='mt-1 flex flex-row items-center'>
                            <BsFillBriefcaseFill className='text-gray-400 text-xl' />
                            <input
                                className='w-full px-3 py-2 focus:border-b-2 focus:outline-none focus:border-indigo-500 '
                                autoComplete='off'
                                type='text'
                                placeholder='Company'
                                {...register('company')}
                            />
                        </div>
                    </div>

                    <div className='w-1 rounded bg-gray-100 h-12'></div>

                    <div>
                        <div className='mt-1 flex flex-row items-center'>
                            <ImLocation className='text-gray-400 text-2xl' />
                            <input
                                className='w-full px-3 py-2 focus:border-b-2 focus:outline-none focus:border-indigo-500 '
                                autoComplete='off'
                                type='text'
                                placeholder='Where'
                                {...register('where')}
                            />
                        </div>
                    </div>

                    <div className='mt-2'>
                        <button
                            className=' bg-indigo-500 text-white rounded-lg px-8 py-3 focus:ring
                                 focus:ring-indigo-500 focus:ring-offset-2'
                            style={{ outline: 'none' }}
                            type='submit'
                        >
                            Search
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default JobSearchForm;
