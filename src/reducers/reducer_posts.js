import { FETCH_POSTS, FETCH_POST, DELETE_POST } from '../actions';
import _ from 'lodash';

export default function(state = {}, action) {
  switch (action.type) {
    //returns new state object with that post id not present anymore
    case DELETE_POST:
      return _.omit(state, action.pauload);
    case FETCH_POST:
      return { ...state, [action.payload.data.id]: action.payload.data};
    case FETCH_POSTS:
      return _.mapKeys(action.payload.data, 'id');
    default:
      return state;
  }
}
