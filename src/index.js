
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';

import AppContainer from './containers/App.container';
import registerServiceWorker from './registerServiceWorker';

import {
  STATE_KEY as DASHBOARD_STATE_KEY,
  default as dashboardReducer
} from './state/dashboard.duck';
import {
  STATE_KEY as SUB_STATE_KEY,
  default as subscriptionsTableReducer
} from './state/subscriptions-table.duck';
import {
  STATE_KEY as ENT_STATE_KEY,
  default as entitiesReducer
} from './state/entities.duck';

import './index.css';

// Build store with all reducers
const store = createStore(
  combineReducers({
    [ENT_STATE_KEY]: entitiesReducer,
    [SUB_STATE_KEY]: subscriptionsTableReducer,
    [DASHBOARD_STATE_KEY]: dashboardReducer
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// Go!
ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById('root')
);

// Register service worker in prod env
registerServiceWorker();
