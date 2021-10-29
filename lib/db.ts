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

export const updateJobStatus = (userId: string, job: JobType, status: string) => {
    return firestore
        .collection('users')
        .doc(userId)
        .collection('bookmarks')
        .doc(job.id)
        .set({ ...job, status }, { merge: true });
};

export const getUserBookmarks = async (userId: string) => {
    const snapshot = await firestore.collection('users').doc(userId).collection('bookmarks').get();
    return snapshot.docs.map((doc) => doc.data());
};

export const deleteJobBookmark = (userId: string, jobId: string) => {
    return firestore.collection('users').doc(userId).collection('bookmarks').doc(jobId).delete();
};

const cleanJobData = (job: JobType) => {
    const newJob = job;

    newJob.status = 'No Status';
    delete newJob.__CLASS__;
    delete newJob.location.__CLASS__;
    delete newJob.category.__CLASS__;
    delete newJob.company.__CLASS__;

    return newJob;
};
