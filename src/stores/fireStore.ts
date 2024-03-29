import { defineStore } from 'pinia';
import { collection, getDocs, query, doc, setDoc } from 'firebase/firestore';
import firestoreDb from '@/firebase';
import { v4 as uuidv4 } from 'uuid';
import type { LatLngTuple } from 'leaflet';

const EVENTS_COLLECTION_ID = 'events';
const ROUTES_COLLECTION_ID = 'routes';
const USERS_COLLECTION_ID = 'users';
const GPX_COLLECTION_ID = 'gpx';

export type Post = {
  id: string;
  type: string;
  author: string;
  authorAvatar: string;
  visibility: string;
  title: string;
  details: string;
  date?: string;
  time?: string;
  startCoordinates?: LatLngTuple;
  gpxData: string | undefined;
  gpxId: string | undefined;
};

type FireStoreEvent = {
  id: string;
  authorId: string;
  date: string;
  details: string;
  location: LatLngTuple;
  time: string;
  title: string;
  visibility: string;
  gpxId: string;
};
type FireStoreRoute = {
  id: string;
  authorId: string;
  details: string;
  title: string;
  visibility: string;
  gpxId: string;
};

type FireStoreUser = {
  id: string;
  name: string;
  lastName: string;
  avatar: string;
};

type FireStoreGpx = {
  id: string;
  data: string;
};

type FireStoreState = {
  events: Post[];
  routes: Post[];
  postToEdit: Post;
};

type PostData = {
  id: string | undefined;
  type: string;
  userId: string;
  visibility: string;
  title: string;
  details: string;
  date: string;
  time: string;
  location: LatLngTuple;
  gpxData: string | undefined;
  gpxId: string | undefined;
};

const postFactory = (): Post => {
  return {
    id: '',
    type: '',
    author: '',
    authorAvatar: '',
    visibility: '',
    title: '',
    details: '',
    gpxData: undefined,
    gpxId: undefined,
  };
};

const fetchCollection = async (collectionId: string) => {
  const eventsCollection = collection(firestoreDb, collectionId);
  const q = query(eventsCollection);
  const response = await getDocs(q);
  return response.docs.map(document => ({
    ...document.data(),
    id: document.id,
  }));
};

const docRef = (id: string | undefined, postType: string) =>
  id ? doc(firestoreDb, postType, id) : doc(collection(firestoreDb, postType));

const setGpx = async (
  gpxData: PostData['gpxData'],
  gpxId: PostData['gpxId'],
) => {
  try {
    await setDoc(docRef(gpxId, GPX_COLLECTION_ID), {
      data: gpxData,
    });
  } catch (error) {
    console.error('Error setting document: ', error);
  }
};

const useFireStore = defineStore('fireStore', {
  state: (): FireStoreState => ({
    events: [],
    routes: [],
    postToEdit: postFactory(),
  }),
  actions: {
    async fetchEvents() {
      const events = (await fetchCollection(
        EVENTS_COLLECTION_ID,
      )) as FireStoreEvent[];
      const users = (await fetchCollection(
        USERS_COLLECTION_ID,
      )) as FireStoreUser[];
      const gpxTracks = (await fetchCollection(
        GPX_COLLECTION_ID,
      )) as FireStoreGpx[];
      this.events = events
        .map(event => {
          const authorData = users.find(user => user.id === event.authorId);
          const gpxData = event.gpxId
            ? gpxTracks.find(track => track.id === event.gpxId)?.data
            : null;
          if (authorData)
            return {
              id: event.id,
              type: 'Event',
              author: `${authorData.name} ${authorData.lastName}`,
              authorAvatar: `./src/assets/avatars/${authorData.avatar}.png`,
              visibility: event.visibility,
              title: event.title,
              details: event.details,
              date: event.date,
              time: event.time,
              startCoordinates: event.location,
              gpxData: gpxData || undefined,
              gpxId: event.gpxId || undefined,
            } as Post;
          return null;
        })
        .filter((post): post is Post => post !== null);
    },
    async fetchRoutes() {
      const routes = (await fetchCollection(
        ROUTES_COLLECTION_ID,
      )) as FireStoreRoute[];
      const users = (await fetchCollection(
        USERS_COLLECTION_ID,
      )) as FireStoreUser[];
      const gpxTracks = (await fetchCollection(
        GPX_COLLECTION_ID,
      )) as FireStoreGpx[];
      this.routes = routes
        .map(route => {
          const authorData = users.find(user => user.id === route.authorId);
          const gpxData = gpxTracks.find(
            track => track.id === route.gpxId,
          )?.data;
          if (authorData)
            return {
              id: route.id,
              type: 'Route',
              author: `${authorData.name} ${authorData.lastName}`,
              authorAvatar: `./src/assets/avatars/${authorData.avatar}.png`,
              visibility: route.visibility,
              title: route.title,
              details: route.details,
              gpxId: route.gpxId,
              gpxData,
            } as Post;
          return null;
        })
        .filter((post): post is Post => post !== null);
    },
    async setPost(postData: PostData) {
      const trackGpxId = postData.gpxData ? postData.gpxId || uuidv4() : '';
      try {
        if (postData.type === 'event')
          await setDoc(docRef(postData.id, EVENTS_COLLECTION_ID), {
            authorId: postData.userId,
            date: postData.date,
            details: postData.details,
            gpxId: trackGpxId,
            location: postData.location,
            time: postData.time,
            title: postData.title,
            visibility: postData.visibility,
          });
        else if (postData.type === 'route')
          await setDoc(docRef(postData.id, ROUTES_COLLECTION_ID), {
            authorId: postData.userId,
            details: postData.details,
            gpxId: trackGpxId,
            title: postData.title,
            visibility: postData.visibility,
          });
        if (postData.gpxData) {
          await setGpx(postData.gpxData, trackGpxId);
        }
      } catch (error) {
        console.error('Error setting document: ', error);
      }
      await this.fetchEvents();
      await this.fetchRoutes();
    },
    setPostToEdit(postToEditId: string) {
      const postToEdit = [...this.events, ...this.routes].find(
        post => post.id === postToEditId,
      );
      if (postToEdit) this.postToEdit = postToEdit;
    },
  },
});

export default useFireStore;
