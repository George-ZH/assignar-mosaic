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
  //console.log('[Actions] photosFetchDataSuccess');
  return {
    type: Types.PHOTOS_IS_UPLOADED,
    isUploaded: bool,
  };
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

export function photoUploading(url) {
  console.log('uploading: ' + url );
  return (dispatch) => {
    dispatch(photoIsUploading(true));

    let request = new Request(url, {
      headers: new Headers({
        authorization: 'Client-ID dce0603b7f16623'
      })
    });

    dispatch(photoIsUploaded(true));

    // api call
    // return fetch(request)
    //   .then((response) => {
    //     if (!response.ok) {
    //       throw new Error(response.statusText);
    //     }
    //     return response;
    //   })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     dispatch(photoIsUploading(false));
    //     dispatch(photoIsUploaded(true));
    //   })
    //   .catch(() => {
    //     dispatch(photosUploadErrored(true));
    //   });
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
      .catch(() => {
        dispatch(photosHasErrored(true));
      });
  };
}
