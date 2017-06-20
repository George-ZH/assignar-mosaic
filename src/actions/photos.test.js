import * as actions from './photos'
import * as types from './actionTypes'

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)
const photosMockData = {
  "data": [
    {
      "id": "Jy4Yo",
      "title": "these are so cute omg",
      "description": null,
      "datetime": 1497597602,
      "cover": "3xAR3LR",
      "cover_width": 500,
      "cover_height": 500,
      "account_url": null,
      "account_id": null,
      "privacy": null,
      "layout": null,
      "views": 27020,
      "link": "http://imgur.com/a/Jy4Yo",
    },
  ]
};

describe('Photos Actions', () => {
  it('should create an action when fetching ready', () => {
    const loading = true;
    const expectedAction = {
      type: types.PHOTOS_IS_FETCHING,
      isFetching: true
    }

    expect(actions.photosIsFetching(loading)).toEqual(expectedAction)
  });

  it('creates PHOTOS_FETCH_DATA_SUCCESS when fetching photos has been done', () => {
    fetch.mockResponse(JSON.stringify(photosMockData), { status: 200});

    const expectedActions = [
      {type: types.PHOTOS_IS_FETCHING, isFetching: true},
      {type: types.PHOTOS_FETCH_DATA_SUCCESS, photos: photosMockData.data},
      {type: types.PHOTOS_IS_FETCHING, isFetching: false}
    ];

    const store = mockStore({ photos: [] })

    return store.dispatch(
      actions.photosFetchData()
    ).then(() => { // return of async actions
      expect(store.getActions()).toEqual(expectedActions)
    });
  });

});
