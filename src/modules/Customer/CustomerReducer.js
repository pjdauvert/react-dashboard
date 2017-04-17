import { LOAD_CUSTOMERS } from './CustomerActions';

// Initial State
const initialState = { data: [] };

const ControlReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_CUSTOMERS: return { data: action.customers };
    default:
      return state;
  }
};

/* Selectors */
export const getCustomers = (state) => {
  return state.customers.data;
};

// Export Reducer
export default ControlReducer;
