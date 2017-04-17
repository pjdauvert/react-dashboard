import { combineReducers } from 'redux';

import app from './modules/App/AppReducer';
import chart from './modules/Chart/ChartReducer'
import controls from './modules/Control/ControlReducer'
import customers from './modules/Customer/CustomerReducer'

export default combineReducers({
  app,
  chart,
  controls,
  customers
});
