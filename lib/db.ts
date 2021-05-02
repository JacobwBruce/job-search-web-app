import firebase from './firebaseClient';

const firestore = firebase.firestore();

export const createUser = (uid: string, data: any) => {
    return firestore
        .collection('users')
        .doc(uid)
        .set({ uid, ...data }, { merge: true });
};

export const bookmarkJob = (userId: string, jobId: string, job: any) => {
    return firestore
        .collection('users')
        .doc(userId)
        .collection('bookmarks')
        .doc(jobId)
        .set({ jobId, ...job }, { merge: true });
};
