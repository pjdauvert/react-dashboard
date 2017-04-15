import { combineReducers } from 'redux';

import app from './modules/App/AppReducer';
import chart from './modules/Chart/ChartReducer'

export default combineReducers({
  app,
  chart,
});
