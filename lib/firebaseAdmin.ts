import admin from 'firebase-admin';

export const verifyIdToken = (token: string) => {
    if (!admin.apps.length) {
        admin.initializeApp({
            credential: admin.credential.cert({
                //@ts-ignore
                client_email: process.env.FIREBASE_CLIENT_EMAIL,
                private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
                project_id: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
            }),
            databaseURL: '',
        });
    }

    return admin
        .auth()
        .verifyIdToken(token)
        .catch((error) => {
            throw error;
        });
};
