import * as Types from "./actionTypes";

export function photosHasErrored(bool) {
  //console.log('[Actions] photosHasErrored : ' + bool);
  return {
    type: Types.PHOTOS_HAS_ERRORED,
    hasErrored: bool
  };
}

export function photosIsFetching(bool) {
  //console.log('[Actions] photosIsLoading : ' + bool);
  return {
    type: Types.PHOTOS_IS_FETCHING,
    isFetching: bool
  };
}

export function photosFetchDataSuccess(photos) {
  //console.log('[Actions] photosFetchDataSuccess');
  return {
    type: Types.PHOTOS_FETCH_DATA_SUCCESS,
    photos,
  };
}

export function photoIsUploading(bool) {
  //console.log('[Actions] photosFetchDataSuccess');
  return {
    type: Types.PHOTOS_IS_UPLOADING,
    isUploading: bool,
  };
}

export function photoIsUploaded(bool) {
  // then close photo modal

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
    url: newURL,
  };
}

export function photoUploading(data) {
  console.log(data);
  return (dispatch) => {
    dispatch(photoIsUploading(true));

    let postData = new FormData();
    postData.append('image', data.split(',')[1]);

    let request = new Request("https://api.imgur.com/3/image", {
      method: "POST",
      headers: new Headers({
         Accept: 'application/json',
        authorization: 'Client-ID dce0603b7f16623'
      }),
      body: postData,
    });

    //

    // api call
    return fetch(request)
      .then((response) => {
        console.log(response);
        if (!response.ok) {
          throw new Error("Uploaded Error");
        } else {
          dispatch(photoIsUploaded(true));
        }
    });
  };
}

export function photosFetchData(url) {
  return (dispatch) => {
    dispatch(photosIsFetching(true));

    let request = new Request(url, {
      headers: new Headers({
        authorization: 'Client-ID dce0603b7f16623'
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
      // .catch(() => {
      //   dispatch(photosHasErrored(true));
      // });
  };
}
