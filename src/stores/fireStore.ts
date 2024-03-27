import { defineStore } from 'pinia';
import { collection, getDocs, query, doc, setDoc } from 'firebase/firestore';
import firestoreDb from '@/firebase';

import type { LatLngTuple } from 'leaflet';

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
  gpxData?: string;
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

const useFireStore = defineStore('fireStore', {
  state: (): FireStoreState => ({
    events: [],
    routes: [],
  }),
  actions: {
    async fetchEvents() {
      const events = (await fetchCollection('events')) as FireStoreEvent[];
      const users = (await fetchCollection('users')) as FireStoreUser[];
      const gpxTracks = (await fetchCollection('gpx')) as FireStoreGpx[];
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
            } as Post;
          return null;
        })
        .filter((post): post is Post => post !== null);
    },
    async fetchRoutes() {
      const routes = (await fetchCollection('routes')) as FireStoreRoute[];
      const users = (await fetchCollection('users')) as FireStoreUser[];
      const gpxTracks = (await fetchCollection('gpx')) as FireStoreGpx[];
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
    async setPost(post) {
      console.log('setPost: ', post);
      try {
        const docRef = post.id
          ? doc(firestoreDb, 'events', post.id)
          : doc(collection(firestoreDb, 'events'));
        if (post.type === 'event')
          await setDoc(docRef, {
            authorId: post.userId,
            date: post.date,
            details: post.details,
            gpxId: post.gpxId || '',
            location: post.location,
            time: post.time,
            title: post.title,
            visibility: post.visibility,
          });
      } catch (error) {
        console.error('Error setting document: ', error);
      }
      await this.fetchEvents();
      await this.fetchRoutes();
    },
  },
});

export default useFireStore;
