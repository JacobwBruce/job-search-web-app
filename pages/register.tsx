import React, { FC, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/lib/auth';
import { FcGoogle } from 'react-icons/fc';
import { AiFillGithub } from 'react-icons/ai';
import Head from 'next/head';
import { ErrorType } from 'types/ErrorType';
import Alert from '@/components/Alert';

interface FormValues {
    email: string;
    password: string;
    confirmPassword: string;
}

const login: FC = () => {
    const { user } = useAuth();
    const [error, setError] = useState<ErrorType | null>();

    if (user) {
        window.location.href = '/';
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>();

    return (
        <>
            <Head>
                <title>Register</title>
            </Head>
            {error && (
                <Alert title={error.title} color={error.color}>
                    {error.message}
                </Alert>
            )}
            <div className='h-full flex justify-center items-center'>
                <div>
                    <div className='mb-6 space-y-5'>
                        <h1 className='text-4xl text-center font-bold'>Create an Account</h1>
                        <p className='text-center'>
                            Already have an account?{' '}
                            <Link href='/login' passHref>
                                <a className='text-indigo-600'>Sign in</a>
                            </Link>{' '}
                        </p>
                    </div>
                    <div className='bg-white py-8 px-6 shadow rounded-lg sm:px-10 sm:w-96'>
                        <form
                            className='mb-0 space-y-6'
                            onSubmit={handleSubmit(async ({ email, password, confirmPassword }) => {
                                if (confirmPassword !== password) {
                                    setError({
                                        title: 'Error signing up',
                                        message: 'Passwords do not match',
                                        color: 'red',
                                    });
                                } else {
                                    await firebase
                                        .auth()
                                        .createUserWithEmailAndPassword(email, password)
                                        .then(() => (window.location.href = '/'))
                                        .catch((error) => {
                                            const message = error.message;
                                            setError({
                                                title: 'Error signing up',
                                                message,
                                                color: 'red',
                                            });
                                        });
                                }
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
                                        {...register('password', { required: true })}
                                    />
                                </div>
                                {errors.password && (
                                    <p className='text-red-600'>
                                        This field is required is required
                                    </p>
                                )}
                            </div>
                            <div>
                                <label
                                    htmlFor='confirmPassword'
                                    className='block text-sm font-medium text-gray-700'
                                >
                                    Confirm Password
                                </label>
                                <div className='mt-1'>
                                    <input
                                        className='w-full border border-gray-300 px-3 py-2 rounded-lg shadow-sm 
                                    focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 
                                    '
                                        type='password'
                                        {...register('confirmPassword', { required: true })}
                                    />
                                </div>
                                {errors.confirmPassword && (
                                    <p className='text-red-600'>
                                        This field is required is required
                                    </p>
                                )}
                            </div>

                            <div className='mt-2'>
                                <button
                                    className=' bg-indigo-500 text-white rounded-lg w-full py-2 focus:ring
                                 focus:ring-indigo-500 focus:ring-offset-2 hover:bg-indigo-600 hover:shadow-lg transition-all'
                                    style={{ outline: 'none' }}
                                    type='submit'
                                >
                                    Create Account
                                </button>
                            </div>
                        </form>
                        <div className='mt-4'>
                            <div className='flex items-center'>
                                <div className=' h-0.5 rounded w-full bg-gray-300'></div>
                                <p className='text-gray-300 mx-3'>OR</p>
                                <div className=' h-0.5 rounded w-full bg-gray-300'></div>
                            </div>
                            <div className='flex items-center justify-center space-x-10 mt-3'>
                                <button
                                    onClick={async () => {
                                        await firebase
                                            .auth()
                                            .signInWithPopup(new firebase.auth.GoogleAuthProvider())
                                            .then(() => (window.location.href = '/'))
                                            .catch((error) =>
                                                setError({
                                                    title: 'Error signing in with Google',
                                                    message: error.message,
                                                    color: 'red',
                                                })
                                            );
                                    }}
                                    className=' border border-gray-300 b-1 rounded-lg px-5 py-1 hover:shadow-lg hover:border-indigo-500 transition-all'
                                    style={{ outline: 'none' }}
                                >
                                    <FcGoogle className='text-4xl' />
                                </button>
                                <button
                                    onClick={async () => {
                                        await firebase
                                            .auth()
                                            .signInWithPopup(new firebase.auth.GithubAuthProvider())
                                            .then(() => (window.location.href = '/'))
                                            .catch((error) => {
                                                setError({
                                                    title: 'Error signing in with GitHub',
                                                    message: error.message,
                                                    color: 'red',
                                                });
                                            });
                                    }}
                                    className='border border-gray-300 b-1 rounded-lg px-5 py-1 hover:shadow-lg hover:border-indigo-500 transition-all'
                                    style={{ outline: 'none' }}
                                >
                                    <AiFillGithub className='text-4xl' />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default login;
