// Import Actions
import { UPDATE_CHART, UPDATE_CUSTOMER } from './ChartActions';

// Initial State
const initialState = { data: null, customer: null };

const ChartReducer = (state = initialState, action) => {
  const { customer, data } = state;
  switch (action.type) {
    case UPDATE_CHART: return {
      data: action.chart,
      customer
    };
    case UPDATE_CUSTOMER: return {
      customer: action.customer,
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

export const getCustomer = (state) => {
  return state.chart.customer;
};

// Export Reducer
export default ChartReducer;
