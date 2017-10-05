import { createSelector } from 'reselect';
import { STATE_KEY as ENT_KEY } from './entities.duck';

// Initial State
const initialState = {
  subscriptionsIds: []
};

// Keep consistency whenever this state key is referenced
export const STATE_KEY = 'subscriptionsTable';

// Action constants
export const SUB_SUCCESS = 'subscriptionsTable/SUB_SUCCESS';

// Action creators
function setSubscriptionsIds(result) {
  return {
    type: SUB_SUCCESS,
    payload: result
  };
}

// Action Handlers
export const ACTION_HANDLERS = {
  [SUB_SUCCESS](state, action) {
    return {
      ...state,
      subscriptionsIds: action.payload
    };
  }
};

// Selectors
const subResult = (state) => state[STATE_KEY].subscriptionsIds;
const entities = (state) => state[ENT_KEY];

export const allSubscriptions = createSelector(
  subResult,
  entities,
  (res, ent) => res.map((id) => ent.subscriptions[id])
);


// Export our actions
export const actions = {
  setSubscriptionsIds
};

// Export our selectors
export const selectors = {
  allSubscriptions
};

// Reducer
export default function subscriptionsTableReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  if (handler) {
    return handler(state, action);
  }

  return state;
}
