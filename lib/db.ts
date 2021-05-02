import { JobType } from 'types/JobType';
import firebase from './firebaseClient';

const firestore = firebase.firestore();

export const createUser = (uid: string, data: any) => {
    return firestore
        .collection('users')
        .doc(uid)
        .set({ uid, ...data }, { merge: true });
};

export const bookmarkJob = (userId: string, job: JobType) => {
    return firestore
        .collection('users')
        .doc(userId)
        .collection('bookmarks')
        .doc(job.id)
        .set(cleanJobData(job), { merge: true });
};

const cleanJobData = (job: JobType) => {
    const newJob = job;

    delete newJob.__CLASS__;
    delete newJob.location.__CLASS__;
    delete newJob.category.__CLASS__;
    delete newJob.company.__CLASS__;

    return newJob;
};
