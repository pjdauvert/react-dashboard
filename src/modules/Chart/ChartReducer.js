// Import Actions
import { UPDATE_CHART } from './ChartActions';

// Initial State
const initialState = { data: null };

const ChartReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_CHART: return {
      data: action.chart
    };
    default:
      return state;
  }
};

/* Selectors */
export const getChart = (state) => {
  return state.chart.data;
};

// Export Reducer
export default ChartReducer;
