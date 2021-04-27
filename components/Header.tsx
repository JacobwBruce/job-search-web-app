import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth';
import Dropdown from './Dropdown';
import DropdownItem from './DropdownItem';
import firebase from 'firebase/app';
import 'firebase/auth';

const Header = () => {
    const { user } = useAuth();

    return (
        <nav className='bg-white h-36 shadow sm:h-16'>
            <div className='flex justify-between items-center mx-auto max-w-8xl px-8 h-full flex-col sm:flex-row'>
                <div>
                    <h4 className='font-bold text-3xl'>
                        Job<span className='text-indigo-600'>Search</span>
                    </h4>
                </div>
                <div className='flex sm:h-full items-center'>
                    <div className='mx-4 flex items-center border-indigo-600 border-b-4 h-full'>
                        <Link href='/search'>Search Jobs</Link>
                    </div>
                    <div className='mx-4 flex items-center border-indigo-600 border-b-4 h-full'>
                        <Link href='/dashboard'>Dashboard</Link>
                    </div>
                </div>
                <div>
                    {user ? (
                        <Dropdown text={user.email}>
                            <DropdownItem onClick={async () => firebase.auth().signOut()}>
                                Sign Out
                            </DropdownItem>
                        </Dropdown>
                    ) : (
                        <button>Sign In</button>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Header;
