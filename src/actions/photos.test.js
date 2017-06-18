import * as actions from './photos'
import * as types from './actionTypes'

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)
const jobMockData = {
  "jobs": [
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
      "ups": null,
      "downs": null,
      "points": null,
      "score": 27008,
      "is_album": true,
      "vote": null,
      "favorite": null,
      "nsfw": false,
      "section": "aww",
      "comment_count": null,
      "topic": null,
      "topic_id": null,
      "images_count": 16,
      "in_gallery": true,
      "is_ad": false,
      "tags": [],
      "ad_type": 0,
      "ad_url": "",
      "in_most_viral": false
    },
  ]
};

describe('Job Actions', () => {
  it('should create an action to add a todo', () => {
    const loading = true;
    const expectedAction = {
      type: types.JOBS_IS_LOADING,
      isLoading: true
    }

    expect(actions.jobsIsLoading(loading)).toEqual(expectedAction)
  });

  it('creates JOBS_FETCH_DATA_SUCCESS when fetching jobs has been done', () => {
    fetch.mockResponse(JSON.stringify(jobMockData), { status: 200});

    const expectedActions = [
      {type: types.JOBS_IS_LOADING, isLoading: true},
      {type: types.JOBS_FETCH_DATA_SUCCESS, jobs: jobMockData.jobs},
      {type: types.JOBS_IS_LOADING, isLoading: false}
    ];

    const store = mockStore({ jobs: [] })

    return store.dispatch(
      actions.jobsFetchData("https://s3-ap-southeast-2.amazonaws.com/hipgrp-assets/tech-test/jobs.json")
    ).then(() => { // return of async actions
      expect(store.getActions()).toEqual(expectedActions)
    });
  });

});
