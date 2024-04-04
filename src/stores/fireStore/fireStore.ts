import { defineStore } from 'pinia';
import { setDoc, deleteDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import useUserStore from '../userStore';
import type {
  Post,
  PostCommentsData,
  FireStoreEvent,
  FireStoreRoute,
  FireStoreUser,
  FireStoreGpx,
  FireStoreUserContent,
  FireStoreUserDetails,
  FireStoreCommentsData,
  FireStoreState,
  PostData,
} from './types';
import {
  postFactory,
  fetchCollection,
  docRef,
  fetchDocument,
  setUserContent,
  setGpx,
  filterNullPosts,
  filterHiddenPosts,
  filterPrivatePosts,
  filterSavedPosts,
  filterCreatedPosts,
} from './fireStoreHelpers';
import {
  EVENTS_COLLECTION_ID,
  ROUTES_COLLECTION_ID,
  USERS_COLLECTION_ID,
  GPX_COLLECTION_ID,
  USERS_CONTENT_COLLECTION_ID,
  COMMENTS_COLLECTION_ID,
  ROUTE_ID,
  EVENT_ID,
  POST_FILTER_ALL_ID,
  POST_FILTER_GOING_ID,
  POST_FILTER_HOSTED_ID,
  POST_FILTER_FAVORITES,
  POST_FILTER_CREATED,
  POST_DATA_TYPE_EVENT_ID,
  POST_DATA_TYPE_ROUTE_ID,
} from './fireStoreConfig';

const useFireStore = defineStore('fireStore', {
  state: (): FireStoreState => ({
    userDetails: { name: '', lastName: '', avatar: '' },
    events: [],
    routes: [],
    eventsFiltered: [],
    routesFiltered: [],
    postToEdit: postFactory(),
    userHiddenPosts: [],
    userSavedRoutes: [],
    userEventsGoing: [],
    postComments: [],
  }),
  actions: {
    async fetchUserDetails() {
      const useUser = useUserStore();
      if (useUser.userId) {
        try {
          const user = (await fetchDocument(
            useUser.userId,
            USERS_COLLECTION_ID,
          )) as FireStoreUserDetails;
          this.userDetails.name = user.name;
          this.userDetails.lastName = user.lastName;
          this.userDetails.avatar = user.avatar;
        } catch (error) {
          console.error('Error fetching document: ', error);
        }
      }
    },

    async fetchEvents() {
      const useUser = useUserStore();
      try {
        const events = (await fetchCollection(
          EVENTS_COLLECTION_ID,
        )) as FireStoreEvent[];
        const users = (await fetchCollection(
          USERS_COLLECTION_ID,
        )) as FireStoreUser[];
        const gpxTracks = (await fetchCollection(
          GPX_COLLECTION_ID,
        )) as FireStoreGpx[];
        const eventsData = events.map(event => {
          const authorData = users.find(user => user.id === event.authorId);
          const gpxData = event.gpxId
            ? gpxTracks.find(track => track.id === event.gpxId)?.data
            : null;
          const gpxFileName = event.gpxId
            ? gpxTracks.find(track => track.id === event.gpxId)?.gpxFileName
            : null;
          if (authorData)
            return {
              id: event.id,
              type: EVENT_ID,
              authorId: event.authorId,
              author: `${authorData.name} ${authorData.lastName}`,
              authorAvatar: authorData.avatar,
              visibility: event.visibility,
              title: event.title,
              details: event.details,
              date: event.date,
              time: event.time,
              startCoordinates: event.location,
              gpxData: gpxData || null,
              gpxId: event.gpxId || null,
              gpxFileName: gpxFileName || null,
            } as Post;
          return null;
        });
        const eventsDataFilteredNull = filterNullPosts(eventsData);
        const eventDataFilteredHidden = filterHiddenPosts(
          eventsDataFilteredNull,
          this.userHiddenPosts,
        );
        if (useUser.userId)
          this.events = filterPrivatePosts(
            eventDataFilteredHidden,
            useUser.userId,
          );
      } catch (error) {
        console.error('Error fetching document: ', error);
      }
      this.getFilteredEvents(POST_FILTER_ALL_ID);
    },

    async fetchRoutes() {
      const useUser = useUserStore();
      try {
        const routes = (await fetchCollection(
          ROUTES_COLLECTION_ID,
        )) as FireStoreRoute[];
        const users = (await fetchCollection(
          USERS_COLLECTION_ID,
        )) as FireStoreUser[];
        const gpxTracks = (await fetchCollection(
          GPX_COLLECTION_ID,
        )) as FireStoreGpx[];
        const routesData = routes.map(route => {
          const authorData = users.find(user => user.id === route.authorId);
          const gpxData = gpxTracks.find(
            track => track.id === route.gpxId,
          )?.data;
          const gpxFileName = gpxTracks.find(
            track => track.id === route.gpxId,
          )?.gpxFileName;
          if (authorData)
            return {
              id: route.id,
              type: ROUTE_ID,
              authorId: route.authorId,
              author: `${authorData.name} ${authorData.lastName}`,
              authorAvatar: authorData.avatar,
              visibility: route.visibility,
              title: route.title,
              details: route.details,
              gpxId: route.gpxId,
              gpxData,
              gpxFileName: gpxFileName || null,
            } as Post;
          return null;
        });
        const routesDataFilteredNull = filterNullPosts(routesData);
        const routesDataFilteredHidden = filterHiddenPosts(
          routesDataFilteredNull,
          this.userHiddenPosts,
        );
        if (useUser.userId)
          this.routes = filterPrivatePosts(
            routesDataFilteredHidden,
            useUser.userId,
          );
      } catch (error) {
        console.error('Error fetching document: ', error);
      }
      this.getFilteredRoutes(POST_FILTER_ALL_ID);
    },

    async fetchUserContent() {
      const useUser = useUserStore();
      try {
        if (useUser.userId) {
          const fetchedUserContent = (await fetchDocument(
            useUser.userId,
            USERS_CONTENT_COLLECTION_ID,
          )) as FireStoreUserContent;
          this.userHiddenPosts = fetchedUserContent.hiddenPosts;
          this.userSavedRoutes = fetchedUserContent.savedRoutes;
          this.userEventsGoing = fetchedUserContent.eventsGoing;
        }
      } catch (error) {
        console.error('Error fetching document: ', error);
      }
    },
    async setPost(postData: PostData) {
      const trackGpxId = postData.gpxData ? postData.gpxId || uuidv4() : '';
      const postId = postData.id ? postData.id : uuidv4();
      try {
        if (postData.type === POST_DATA_TYPE_EVENT_ID)
          await setDoc(docRef(postId, EVENTS_COLLECTION_ID), {
            authorId: postData.userId,
            date: postData.date,
            details: postData.details,
            gpxId: trackGpxId,
            location: postData.location,
            time: postData.time,
            title: postData.title,
            visibility: postData.visibility,
          });
        else if (postData.type === POST_DATA_TYPE_ROUTE_ID)
          await setDoc(docRef(postId, ROUTES_COLLECTION_ID), {
            authorId: postData.userId,
            details: postData.details,
            gpxId: trackGpxId,
            title: postData.title,
            visibility: postData.visibility,
          });
        if (postData.gpxData) {
          await setGpx(postData.gpxData, trackGpxId, postData.gpxFileName);
        }
        if (!postData.id) {
          await setDoc(docRef(postId, COMMENTS_COLLECTION_ID), {
            data: [],
          });
        }
      } catch (error) {
        console.error('Error setting document: ', error);
      }
      this.cleanPostToEdit();
      await this.fetchEvents();
      await this.fetchRoutes();
    },

    setPostToEdit(postToEditId: string) {
      const postToEdit = [...this.events, ...this.routes].find(
        post => post.id === postToEditId,
      );
      if (postToEdit) this.postToEdit = postToEdit;
    },

    cleanPostToEdit() {
      this.postToEdit = postFactory();
    },

    async deletePost(postId: string, postType: string, gpxId: string | null) {
      try {
        await deleteDoc(
          docRef(
            postId,
            postType === EVENT_ID ? EVENTS_COLLECTION_ID : ROUTES_COLLECTION_ID,
          ),
        );
        if (gpxId) {
          await deleteDoc(docRef(gpxId, GPX_COLLECTION_ID));
        }
        await deleteDoc(docRef(postId, COMMENTS_COLLECTION_ID));
      } catch (error) {
        console.error('Error delete document: ', error);
      }
      await this.fetchEvents();
      await this.fetchRoutes();
    },

    async setPostToHidden(postId: string) {
      this.userHiddenPosts = [...new Set([...this.userHiddenPosts, postId])];
      await this.setUserContent();
      await this.fetchEvents();
      await this.fetchRoutes();
    },

    async setRouteToSaved(postId: string) {
      this.userSavedRoutes = [...new Set([...this.userSavedRoutes, postId])];
      await this.setUserContent();
    },

    async removeRouteFromSaved(postId: string) {
      this.userSavedRoutes = this.userSavedRoutes.filter(
        routeId => routeId !== postId,
      );
      await this.setUserContent();
    },

    async setEventToGoing(postId: string) {
      this.userEventsGoing = [...new Set([...this.userEventsGoing, postId])];
      await this.setUserContent();
    },

    async removeEventFromGoing(postId: string) {
      this.userEventsGoing = this.userEventsGoing.filter(
        eventId => eventId !== postId,
      );
      await this.setUserContent();
    },

    getFilteredEvents(option: string) {
      const useUser = useUserStore();
      if (option === POST_FILTER_ALL_ID) this.eventsFiltered = this.events;
      if (option === POST_FILTER_GOING_ID)
        this.eventsFiltered = filterSavedPosts(
          this.events,
          this.userEventsGoing,
        );
      if (option === POST_FILTER_HOSTED_ID && useUser.userId)
        this.eventsFiltered = filterCreatedPosts(this.events, useUser.userId);
    },

    getFilteredRoutes(option: string) {
      const useUser = useUserStore();
      if (option === POST_FILTER_ALL_ID) this.routesFiltered = this.routes;
      if (option === POST_FILTER_FAVORITES)
        this.routesFiltered = filterSavedPosts(
          this.routes,
          this.userSavedRoutes,
        );
      if (option === POST_FILTER_CREATED && useUser.userId)
        this.routesFiltered = filterCreatedPosts(this.routes, useUser.userId);
    },

    async setUserContent(id?: string) {
      const useUser = useUserStore();
      const userId = id || useUser.userId;
      try {
        if (userId)
          await setUserContent(
            userId,
            this.userHiddenPosts,
            this.userSavedRoutes,
            this.userEventsGoing,
          );
      } catch (error) {
        console.error('Error set document: ', error);
      }
    },

    async setUserDetails(
      id: string,
      avatar: string,
      name: string,
      lastName: string,
    ) {
      this.userDetails.name = name;
      this.userDetails.lastName = lastName;
      this.userDetails.avatar = avatar;
      try {
        await setDoc(docRef(id, USERS_COLLECTION_ID), {
          avatar,
          name,
          lastName,
        });
      } catch (error) {
        console.error('Error set document: ', error);
      }
    },

    async fetchComments() {
      try {
        const commentsCollection = (await fetchCollection(
          COMMENTS_COLLECTION_ID,
        )) as FireStoreCommentsData[];
        const users = (await fetchCollection(
          USERS_COLLECTION_ID,
        )) as FireStoreUser[];

        this.postComments = commentsCollection
          .flatMap(commentsData => {
            return commentsData.data.map(commentData => {
              const authorData = users.find(
                user => user.id === commentData.userId,
              );
              return {
                postId: commentsData.id,
                avatar: authorData?.avatar || '',
                name: authorData?.name || '',
                lastName: authorData?.lastName || '',
                date: commentData.date,
                time: commentData.time,
                message: commentData.message,
              } as PostCommentsData;
            });
          })
          .filter(comment => comment !== null);
      } catch (error) {
        console.error('Error fetch collection: ', error);
      }
    },

    async setComment(
      id: string,
      userId: string,
      date: string,
      time: string,
      message: string,
    ) {
      try {
        updateDoc(docRef(id, COMMENTS_COLLECTION_ID), {
          data: arrayUnion({
            userId,
            date,
            time,
            message,
          }),
        });
      } catch (error) {
        console.error('Error set document: ', error);
      }
      await this.fetchComments();
    },
  },
});

export default useFireStore;
