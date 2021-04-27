import { useAuth } from '@/lib/auth';
import React from 'react';
import Link from 'next/link';
import firebase from 'firebase/app';
import 'firebase/auth';

export default function Home() {
    const { user } = useAuth();
    console.log(user);
    return (
        <div>
            <h1>Home page</h1>
            <p>{`User ID: ${user ? user.uid : 'no user signed in'} `}</p>
            <div>
                <Link href='/login'>Go Login</Link>
            </div>
            <div>
                <Link href='/authenticated'>Authenticated route</Link>
            </div>
            <button onClick={async () => firebase.auth().signOut()}>Sign Out</button>
        </div>
    );
}
