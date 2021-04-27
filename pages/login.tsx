import React, { FC, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import firebaseClient from '@/lib/firebaseClient';

const login: FC = () => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    return (
        <div>
            <h1>Login</h1>
            <input type='text' placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
            <input
                type='password'
                name='password'
                placeholder='Password'
                onChange={(e) => setPass(e.target.value)}
            />

            <button
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

            <button
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
            </button>
        </div>
    );
};

export default login;
