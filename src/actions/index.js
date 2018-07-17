import axios from 'axios';

export const FETCH_POSTS = 'FETCH_POSTS';

const ROOT_URL = 'http://reduxblog.herokuapp.com/api';
const API_KEY = '?key=UNIQUE1234';

export function fetchPosts() {
  const request = axios.get(`${ROOT_URL}/posts${API_KEY}`);

  return {
    type: FETCH_POSTS,
    payload: request
  };
}

/*Need to make network requests inside action creator so we have to install
axios to make the actual request and we have to install redux promise to
handle the asynchronous nature of the request itself


Before we make use of either of those modules inside of here let's
make sure that we wire up redux promise
as a middleware inside of our application.

 top level index start js file.
 */