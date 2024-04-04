import { firestoreDb } from '@/firebase';
import {
  collection,
  getDocs,
  query,
  doc,
  setDoc,
  getDoc,
} from 'firebase/firestore';

import type { Post, PostData } from './types';

const GPX_COLLECTION_ID = 'gpx';
const USERS_CONTENT_COLLECTION_ID = 'usersContent';

export const postFactory = (): Post => {
  return {
    id: '',
    type: '',
    authorId: '',
    author: '',
    authorAvatar: '',
    visibility: '',
    title: '',
    details: '',
    gpxData: null,
    gpxId: null,
    gpxFileName: null,
  };
};

export const fetchCollection = async (collectionId: string) => {
  const eventsCollection = collection(firestoreDb, collectionId);
  const q = query(eventsCollection);
  const response = await getDocs(q);
  return response.docs.map(document => ({
    ...document.data(),
    id: document.id,
  }));
};
export const docRef = (id: string | null, postType: string) =>
  id ? doc(firestoreDb, postType, id) : doc(collection(firestoreDb, postType));

export const fetchDocument = async (id: string, postType: string) => {
  const docSnap = await getDoc(docRef(id, postType));
  if (docSnap.exists()) {
    return docSnap.data();
  }
  console.log('No such document!');
  return null;
};

export const setUserContent = async (
  id: string,
  hiddenPosts: string[],
  savedRoutes: string[],
  eventsGoing: string[],
) => {
  await setDoc(docRef(id, USERS_CONTENT_COLLECTION_ID), {
    hiddenPosts,
    savedRoutes,
    eventsGoing,
  });
};

export const setGpx = async (
  gpxData: PostData['gpxData'],
  gpxId: PostData['gpxId'],
  gpxFileName: PostData['gpxFileName'],
) => {
  try {
    await setDoc(docRef(gpxId, GPX_COLLECTION_ID), {
      data: gpxData,
      gpxFileName,
    });
  } catch (error) {
    console.error('Error setting document: ', error);
  }
};
