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

import {
  GPX_COLLECTION_ID,
  USERS_CONTENT_COLLECTION_ID,
  POST_VISIBILITY_ID_PRIVATE,
  POST_VISIBILITY_ID_PUBLIC,
} from './fireStoreConfig';

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

export const filterNullPosts = (postData: (Post | null)[]) =>
  postData.filter((post: Post | null): post is Post => post !== null);

export const filterHiddenPosts = (postData: Post[], hiddenPostsIds: string[]) =>
  postData?.filter(
    (post: Post) =>
      !hiddenPostsIds.some((hiddenPostId: string) => hiddenPostId === post.id),
  );
export const filterPrivatePosts = (postData: Post[], userId: string) =>
  postData?.filter(
    post =>
      post.visibility === POST_VISIBILITY_ID_PUBLIC ||
      (post.visibility === POST_VISIBILITY_ID_PRIVATE &&
        post.authorId === userId),
  );

export const filterSavedPosts = (postData: Post[], postsIdsArr: string[]) =>
  postData.filter(post => postsIdsArr.includes(post.id));

export const filterCreatedPosts = (postData: Post[], userId: string) =>
  postData.filter(post => post.authorId === userId);
