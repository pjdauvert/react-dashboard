// Import Actions
import { CUSTOMER_CONTROL_UPDATE, VARIATION_CONTROL_UPDATE } from './ControlActions';

// Initial State
const initialState = { customer: null, variation: null };

const ControlReducer = (state = initialState, action) => {
  switch (action.type) {
    case CUSTOMER_CONTROL_UPDATE: return {
      customer: action.customer,
      variation: null
    };
    case VARIATION_CONTROL_UPDATE: return {
      customer: null,
      variation: action.variation
    };
    default:
      return state;
  }
};

/* Selectors */
export const getControlsCustomer = (state) => {
  return state.controls.customer;
};

export const getControlsVariation = (state) => {
  return state.controls.variation;
};

// Export Reducer
export default ControlReducer;
