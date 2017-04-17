// Import Actions
import { CUSTOMER_CONTROL_UPDATE, VARIATION_CONTROL_UPDATE } from './ControlActions';

// Initial State
const initialState = { customer: null, variation: null };

const ControlReducer = (state = initialState, action) => {
  const { customer, variation } = state;
  switch (action.type) {
    case CUSTOMER_CONTROL_UPDATE: return {
      customer: action.customer,
      variation
    };
    case VARIATION_CONTROL_UPDATE: return {
      customer,
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
