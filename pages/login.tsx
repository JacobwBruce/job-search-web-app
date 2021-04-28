import React, { FC } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/lib/auth';

interface FormValues {
    email: string;
    password: string;
}

const login: FC = () => {
    const { user } = useAuth();

    if (user) {
        window.location.href = '/';
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>();

    return (
        <div className='h-full flex justify-center items-center'>
            <div>
                <div className='mb-6 space-y-5'>
                    <h1 className='text-4xl text-center font-bold'>Login</h1>
                    <p className='text-center'>
                        Don't have an account?{' '}
                        <Link href='/register' passHref>
                            <a className='text-indigo-600'>Sign up</a>
                        </Link>{' '}
                    </p>
                </div>
                <div className='bg-white py-8 px-6 shadow rounded-lg sm:px-10 sm:w-96'>
                    <form
                        className='mb-0 space-y-6'
                        onSubmit={handleSubmit(async ({ email, password }) => {
                            await firebase
                                .auth()
                                .signInWithEmailAndPassword(email, password)
                                .then(() => (window.location.href = '/'))
                                .catch((error) => {
                                    const message = error.message;
                                    alert(message);
                                });
                        })}
                    >
                        <div>
                            <label
                                htmlFor='email'
                                className='block text-sm font-medium text-gray-700'
                            >
                                Email Address
                            </label>
                            <div className='mt-1'>
                                <input
                                    className='w-full border border-gray-300 px-3 py-2 rounded-lg shadow-sm 
                                    focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 
                                    '
                                    type='email'
                                    autoComplete='email'
                                    {...register('email', { required: true })}
                                />
                            </div>
                            {errors.email && <p className='text-red-600'>Email is required</p>}
                        </div>
                        <div>
                            <label
                                htmlFor='password'
                                className='block text-sm font-medium text-gray-700'
                            >
                                Password
                            </label>
                            <div className='mt-1'>
                                <input
                                    className='w-full border border-gray-300 px-3 py-2 rounded-lg shadow-sm 
                                    focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 
                                    '
                                    type='password'
                                    autoComplete='password'
                                    {...register('password', { required: true })}
                                />
                            </div>
                            {errors.password && (
                                <p className='text-red-600'>Password is required</p>
                            )}
                        </div>

                        <div className='mt-2'>
                            <button
                                className=' bg-indigo-500 text-white rounded-lg w-full py-2 focus:ring
                                 focus:ring-indigo-500 focus:ring-offset-2'
                                style={{ outline: 'none' }}
                                type='submit'
                            >
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default login;
