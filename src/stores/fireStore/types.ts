import type { LatLngTuple } from 'leaflet';

export type Post = {
  id: string;
  type: string;
  authorId: string;
  author: string;
  authorAvatar: string;
  visibility: string;
  title: string;
  details: string;
  date?: string;
  time?: string;
  startCoordinates?: LatLngTuple;
  gpxData: string | null;
  gpxId: string | null;
  gpxFileName: string | null;
};

export type PostCommentsData = {
  postId: string;
  avatar: string;
  name: string;
  lastName: string;
  date: string;
  time: string;
  message: string;
};

export type FireStoreEvent = {
  id: string;
  authorId: string;
  date: string;
  details: string;
  location: LatLngTuple;
  time: string;
  title: string;
  visibility: string;
  gpxId: string;
  gpxFileName: string;
};
export type FireStoreRoute = {
  id: string;
  authorId: string;
  details: string;
  title: string;
  visibility: string;
  gpxId: string;
  gpxFileName: string;
};

export type FireStoreUser = {
  id: string;
  name: string;
  lastName: string;
  avatar: string;
};

export type FireStoreGpx = {
  id: string;
  data: string;
  gpxFileName: string;
};

export type FireStoreUserContent = {
  hiddenPosts: [];
  savedRoutes: [];
  eventsGoing: [];
};

export type FireStoreUserDetails = {
  name: string;
  lastName: string;
  avatar: string;
};

export type FireStoreCommentsData = {
  id: string;
  data: {
    message: string;
    userId: string;
    date: string;
    time: string;
  }[];
};

export type FireStoreState = {
  userDetails: { name: string; lastName: string; avatar: string };
  events: Post[];
  routes: Post[];
  eventsFiltered: Post[];
  routesFiltered: Post[];
  postToEdit: Post;
  userHiddenPosts: string[];
  userSavedRoutes: string[];
  userEventsGoing: string[];
  postComments: PostCommentsData[];
};

export type PostData = {
  id: string | null;
  type: string;
  userId: string;
  visibility: string;
  title: string;
  details: string;
  date: string;
  time: string;
  location: LatLngTuple;
  gpxData: string | null;
  gpxId: string | null;
  gpxFileName: string | null;
};
