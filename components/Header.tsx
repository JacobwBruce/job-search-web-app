import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth';
import Dropdown from './Dropdown';
import DropdownItem from './DropdownItem';
import firebase from 'firebase/app';
import 'firebase/auth';
import { useRouter } from 'next/router';

const Header = () => {
    const { user } = useAuth();
    const router = useRouter();

    const drawBorder = (tabName: string) => {
        if (tabName === router.pathname) {
            return 'border-indigo-600 border-b-4';
        }
    };

    return (
        <nav className='bg-white h-36 shadow sm:h-16'>
            <div className='flex justify-between items-center mx-auto max-w-screen-2xl px-8 h-full flex-col sm:flex-row'>
                <div>
                    <h4 className='font-bold text-3xl'>
                        Job<span className='text-indigo-600'>Search</span>
                    </h4>
                </div>
                <div className='flex sm:h-full flex-col-reverse sm:flex-row'>
                    <div className='flex sm:h-full items-center'>
                        <div className={`mx-4 flex items-center h-full ${drawBorder('/')}`}>
                            <Link href='/'>Home</Link>
                        </div>
                        <div className={`mx-4 flex items-center h-full ${drawBorder('/search')}`}>
                            <Link href='/search'>Search Jobs</Link>
                        </div>
                        <div
                            className={`mx-4 flex items-center h-full ${drawBorder('/dashboard')}`}
                        >
                            <Link href='/dashboard'>Dashboard</Link>
                        </div>
                    </div>
                    <div className='flex items-center'>
                        {user ? (
                            <Dropdown text={user.name || user.email}>
                                <DropdownItem onClick={() => alert('TODO')}>Profile</DropdownItem>
                                <DropdownItem onClick={async () => firebase.auth().signOut()}>
                                    Sign Out
                                </DropdownItem>
                            </Dropdown>
                        ) : (
                            <Link href='/login'>Sign In</Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;
