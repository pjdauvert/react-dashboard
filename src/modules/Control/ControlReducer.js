// Import Actions
import { CUSTOMER_CONTROL_UPDATE } from './ControlActions';

// Initial State
const initialState = { data: { customer: null } };

const ControlReducer = (state = initialState, action) => {
  switch (action.type) {
    case CUSTOMER_CONTROL_UPDATE: return {
      data: { customer: action.customer }
    };
    default:
      return state;
  }
};

/* Selectors */
export const getControls = (state) => {
  return state.controls.data;
};

// Export Reducer
export default ControlReducer;
