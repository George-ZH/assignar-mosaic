import * as Types from "../actions/actionTypes";

export function photosHasErrored(state = false, action) {
  //console.log(`[Reducers] photosHasErrored: ${action.type}`);

  switch (action.type) {
    case Types.PHOTOS_HAS_ERRORED:
      return action.hasErrored;

    default:
      return state;
  }
}

export function photosIsFetching(state = false, action) {
  //console.log(`[Reducers] photosIsLoading: ${action.type}`);

  switch (action.type) {
    case Types.PHOTOS_IS_FETCHING:
      return action.isFetching;

    default:
      return state;
  }
}

export function photos(state = [], action) {
  //console.log(`[Reducers] photos: ${action.type}`);
  switch (action.type) {
    case Types.PHOTOS_FETCH_DATA_SUCCESS:
      return action.photos;

    default:
      return state;
  }
}

export function photosUploadErrored(state = false, action) {
  switch (action.type) {
    case Types.PHOTOS_UPLOAD_ERRORED:
      return action.uploadErrored;

    default:
      return state;
  }
}

export function photosChangePage(page = 1, action){
  switch (action.type) {
    case Types.PHOTOS_CHANGE_PAGE:
      return action.currentPage;

    default:
      return page;
  }
}

export function photoModalIsOpen(state = {key: 0, open: false}, action) {
  switch (action.type) {
    case Types.PHOTOS_MODAL_IS_OPEN:
      return action.isOpen;

    default:
      return state;
  }
}
