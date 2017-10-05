import merge from 'lodash.merge';

// Initial state
const initialState = {};

// Keep consistency whenever this state key is referenced
export const STATE_KEY = 'entities';

// Action constants
export const ADD_ENTITIES = 'entities/ADD_ENTITIES';

// Action creators
function addEntities(entities) {
  return {
    type: ADD_ENTITIES,
    payload: entities
  };
}

// Action Handlers
export const ACTION_HANDLERS = {
  [ADD_ENTITIES](state, action) {
    return merge(state, action.payload);
  }
};

// Export our actions
export const actions = {
  addEntities
};

// Reducer
export default function entitiesReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  if (handler) {
    return handler(state, action);
  }

  return state;
}
