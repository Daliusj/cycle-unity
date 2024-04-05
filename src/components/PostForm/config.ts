import type { LatLngTuple } from 'leaflet';

export const MAX_TITLE_LENGTH = 40;
export const EDIT_MODE_ID = 'edit';
export const DEFAULT_COORDS: LatLngTuple = [54.8985, 23.9036];
export const DEFAULT_GPX_FILE_NAME = 'track.gpx';
export const ALERT_MESSAGES = {
  noTitle: 'Enter the title',
  tooLongTitle: `Maximum Title length is ${MAX_TITLE_LENGTH} characters`,
  uploadGpx: 'Upload GPX file',
  selectDate: 'Select the date',
  invalidDate: 'Selected Date is in the past',
  selectLocation: 'Tap on the map to select the event location',
};
export const TEXTS = {
  event: { new: 'New Event', edit: 'Edit Event' },
  route: { new: 'New Route', edit: 'Edit Route' },
  title: 'Title',
  details: 'Details',
  datePick: 'Pick a time',
  visibilityPick: 'Select visibility',
  buttonLabel: 'Submit',
  mapPick: 'Pick an event location',
  uploadGpx: 'Upload track GPX file',
  titlePlaceholder: 'My title',
  detailsPlacholder: 'My details',
};
export const LINKS = {
  event: '/events/all',
  route: '/routes/all',
};
