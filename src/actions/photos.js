import * as Types from "./actionTypes";
import API_URL from "../App.config";

export function photosHasErrored(bool) {
  return {
    type: Types.PHOTOS_HAS_ERRORED,
    hasErrored: bool
  };
}

export function photosIsFetching(bool) {
  return {
    type: Types.PHOTOS_IS_FETCHING,
    isFetching: bool
  };
}

export function photosFetchDataSuccess(photos) {
  return {
    type: Types.PHOTOS_FETCH_DATA_SUCCESS,
    photos,
  };
}

export function photoIsUploading(bool) {
  return {
    type: Types.PHOTOS_IS_UPLOADING,
    isUploading: bool,
  };
}

export function photoIsUploaded(bool) {
  return (dispatch) => {
    dispatch(photoModalIsOpen(false));
  }
}

export function photosUploadErrored(bool) {
  return {
    type: Types.PHOTOS_UPLOAD_ERRORED,
    uploadErrored: bool,
  };
}

export function photosChangePage(pageNo) {
  return {
    type: Types.PHOTOS_CHANGE_PAGE,
    currentPage: pageNo || 0,
  };
}

export function photoModalIsOpen(bool, id) {
  return {
    type: Types.PHOTOS_MODAL_IS_OPEN,
    isOpen: {key: id, open: bool},
  };
}

export function closePhotoModal(id) {
  return (dispatch) => {
    dispatch(photoModalIsOpen(false));
  }
}

export function openPhotoModal(id) {
  return (dispatch) => {
    dispatch(photoModalIsOpen(true, id));
  }
}

export function photoChangeURL(newURL) {
  return {
    type: Types.PHOTO_DID_CHANGE_URL,
    photoURL: newURL,
  };
}

export function photoUploading(data) {
  return (dispatch) => {
    dispatch(photoIsUploading(true));

    let postData = new FormData();
    postData.append('image', data.link.split(',')[1]);

    let request = new Request(API_URL.UPLOAD, {
      method: "POST",
      headers: new Headers({
         Accept: 'application/json',
        authorization: `Client-ID ${API_URL.AUTH_ID}`
      }),
      body: postData,
    });

    return fetch(request)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Uploaded Error");
        } else {
          dispatch(photoIsUploaded(true));
          dispatch(photoChangeURL(null));
        }
    });
  };
}

export function photosFetchData() {
  return (dispatch) => {
    dispatch(photosIsFetching(true));

    let request = new Request(API_URL.GALLERY, {
      headers: new Headers({
        authorization: `Client-ID ${API_URL.AUTH_ID}`
      })
    });

    // api call
    return fetch(request)
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response;
      })
      .then((response) => response.json())
      .then((data) => {
        dispatch(photosFetchDataSuccess(data.data));
        dispatch(photosIsFetching(false));
      })
      .catch(() => {
        dispatch(photosHasErrored(true));
      });
  };
}
