import { combineReducers } from 'redux';
import {
  photos,
  photosHasErrored,
  photosIsFetching,
  photosUploadErrored,
  photosChangePage,
  photoModalIsOpen,
  photoDidChangeURL
} from './photos';

export default combineReducers({
    photos,
    photosHasErrored,
    photosIsFetching,
    photosUploadErrored,
    photosChangePage,
    photoModalIsOpen,
    photoDidChangeURL
});
