import { combineReducers } from 'redux';
import {
  photos,
  photosHasErrored,
  photosIsFetching,
  photosIsUploaded,
  photosUploadErrored,
  photosChangePage
} from './photos';

export default combineReducers({
    photos,
    photosHasErrored,
    photosIsFetching,
    photosIsUploaded,
    photosUploadErrored,
    photosChangePage
});
