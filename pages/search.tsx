import Header from '@/components/Header';
import React from 'react';
import { useForm } from 'react-hook-form';

interface FormValues {
    search: string;
}

const search = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>();

    return (
        <>
            <Header />
            <div className='flex justify-center items-center h-3/4 flex-wrap'>
                <h1 className='text-4xl mt-10 font-bold px-6 sm:px-0'>
                    Find the most <br />
                    <span className='text-indigo-600'>relevent</span> job postings
                </h1>
                <div className='bg-white py-8 px-6 shadow rounded-lg sm:px-10 sm:w-96 ml-0 sm:ml-5'>
                    <form
                        className='mb-0 space-y-6'
                        onSubmit={(data) => {
                            console.log(data);
                        }}
                    >
                        <div>
                            <label
                                htmlFor='email'
                                className='block text-sm font-medium text-gray-700'
                            >
                                Search
                            </label>
                            <div className='mt-1'>
                                <input
                                    className='w-full border border-gray-300 px-3 py-2 rounded-lg shadow-sm 
                                    focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 
                                    '
                                    autoComplete='off'
                                    type='text'
                                    {...register('search', { required: true })}
                                />
                            </div>
                            {errors.search && (
                                <p className='text-red-600'>Search term is required</p>
                            )}
                        </div>

                        <div className='mt-2'>
                            <button
                                className=' bg-indigo-500 text-white rounded-lg w-full py-2 focus:ring
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
        </>
    );
};

export default search;
