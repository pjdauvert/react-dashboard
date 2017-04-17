// Import Actions
import { UPDATE_CHART, UPDATE_STAT } from './ChartActions';

// Initial State
const initialState = { data: null, stat: null };

const ChartReducer = (state = initialState, action) => {
  const { stat, data } = state;
  switch (action.type) {
    case UPDATE_CHART: return {
      data: action.chart,
      stat
    };
    case UPDATE_STAT: return {
      stat: action.customer,
      data
    };
    default:
      return state;
  }
};

/* Selectors */
export const getChart = (state) => {
  return state.chart.data;
};

export const getStat = (state) => {
  return state.chart.stat;
};

// Export Reducer
export default ChartReducer;
