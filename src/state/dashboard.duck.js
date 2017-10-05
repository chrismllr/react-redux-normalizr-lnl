import { STATE_KEY as ENT_KEY } from './entities.duck';
import { createSelector } from 'reselect';

// Initial State
const initialState = {
  todaysSubscriptionsIds: []
};

// Keep consistency whenever this state key is referenced
export const STATE_KEY = 'dashboard';

// Action constants
export const TODAYS_SUCCESS = 'dashboard/TODAYS_SUCCESS';

// Action creators
function setTodaysSubscriptionsIds(result) {
  return {
    type: TODAYS_SUCCESS,
    payload: result
  };
}

// Selectors
const todaysResult = (state) => state[STATE_KEY].todaysSubscriptionsIds;
const entities = (state) => state[ENT_KEY];

export const todaysSubscriptions = createSelector(
  todaysResult,
  entities,
  (res, ent) => res.map((id) => ent.subscriptions[id])
);

// Action Handlers
export const ACTION_HANDLERS = {
  [TODAYS_SUCCESS](state, action) {
    return {
      ...state,
      todaysSubscriptionsIds: action.payload
    };
  }
};

// Export our actions
export const actions = {
  setTodaysSubscriptionsIds
};

// Export our selectors
export const selectors = {
  todaysSubscriptions
};

// Reducer
export default function dashboardReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  if (handler) {
    return handler(state, action);
  }

  return state;
}
