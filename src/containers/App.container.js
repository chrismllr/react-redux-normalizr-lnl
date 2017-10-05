import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import App from '../components/App';

import {
  actions as entActions
} from '../state/entities.duck';

import {
  STATE_KEY as SUP_TABLE_KEY,
  actions as subscripActions,
  selectors as subscripSelectors
} from '../state/subscriptions-table.duck';

import {
  STATE_KEY as DASH_KEY,
  selectors as dashboardSelectors,
  actions as dashboardActions
} from '../state/dashboard.duck';

function mapStateToProps(state) {
  return {
    subscriptionsTableState: state[SUP_TABLE_KEY],
    dashboardState: state[DASH_KEY],
    derived: {
      todaysSubscriptions: dashboardSelectors.todaysSubscriptions(state),
      allSubscriptions: subscripSelectors.allSubscriptions(state)
    }
  };
}

function mapActionCreators(dispatch) {
  return {
    dashboardActions: bindActionCreators(dashboardActions, dispatch),
    subscriptionsTableActions: bindActionCreators(subscripActions, dispatch),
    entitiesActions: bindActionCreators(entActions, dispatch)
  };
}

export default connect(mapStateToProps, mapActionCreators)(App);
