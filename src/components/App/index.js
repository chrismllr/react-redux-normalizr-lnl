import React, { Component } from 'react';
import axios from 'axios';

import { normalize } from 'normalizr';
import { subscriptionsSchema } from '../../schema';

import logo from './logo.svg';
import './style.css';

class App extends Component {

  componentDidMount() {
    this._fetchTodays();
    this._fetchSubscriptions();
  }

  async _fetchTodays() {
    const { dashboardActions, entitiesActions } = this.props;

    const { data } = await axios.get('http://localhost:3001/todaysSubscriptions');
    const { entities, result } = normalize(data, [subscriptionsSchema]);

    entitiesActions.addEntities(entities);
    dashboardActions.setTodaysSubscriptionsIds(result);
  }

  async _fetchSubscriptions() {
    const { subscriptionsTableActions, entitiesActions } = this.props;

    const { data } = await axios.get('http://localhost:3001/subscriptions');
    const { entities, result } = normalize(data, [subscriptionsSchema]);

    entitiesActions.addEntities(entities);
    subscriptionsTableActions.setSubscriptionsIds(result);
  }

  render() {
    const { derived } = this.props;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>

        <h3>Todays Subscriptions</h3>
        {derived.todaysSubscriptions.map((sub, i) => (
          <p key={i}>{sub.subscriber} - {sub.vehicle}</p>
        ))}

        <h3>All Subscriptions</h3>
        {derived.allSubscriptions.map((sub, i) => (
          <p key={i}>{sub.subscriber} - {sub.vehicle}</p>
        ))}
      </div>
    );
  }
}

export default App;
