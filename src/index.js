import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import App from './modules/App/App';
import './index.css';
import reducers from './reducers';

// Initial data
import sample from './sophia-test.json';
import getInitialState from './util/dataAdapter';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const store  = createStore(reducers, getInitialState(sample));
const mountApp = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  mountApp
);
