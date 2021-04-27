import React, { FC, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import firebaseClient from '@/lib/firebaseClient';
import Link from 'next/link';

const login: FC = () => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

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
                    <div className='mb-0 space-y-6'>
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
                                    id='email'
                                    name='email'
                                    type='email'
                                    autoComplete='email'
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
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
                                    id='password'
                                    name='password'
                                    type='password'
                                    autoComplete='password'
                                    onChange={(e) => setPass(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className='mt-2'>
                            <button
                                className=' bg-indigo-500 text-white rounded-lg w-full py-2 focus:ring
                                 focus:ring-indigo-500 focus:ring-offset-2'
                                style={{ outline: 'none' }}
                                onClick={async () => {
                                    await firebase
                                        .auth()
                                        .signInWithEmailAndPassword(email, pass)
                                        .then(() => (window.location.href = '/'))
                                        .catch((error) => {
                                            const message = error.message;
                                            alert(message);
                                        });
                                }}
                            >
                                Login
                            </button>
                        </div>

                        {/* <button
                onClick={async () => {
                    await firebase
                        .auth()
                        .createUserWithEmailAndPassword(email, pass)
                        .then(() => (window.location.href = '/'))
                        .catch((error) => {
                            const message = error.message;
                            alert(message);
                        });
                }}
            >
                Register
            </button> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default login;
