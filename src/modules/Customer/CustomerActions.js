import { getCustomersFromVariation } from '../../util/aggregation';

export const LOAD_CUSTOMERS = 'LOAD_CUSTOMERS';

export function loadCustomersAction(customers) {
  return {
    type: LOAD_CUSTOMERS,
    customers,
  };
}

export const loadCustomersList = (variation, globals, customers) => {
  return dispatch =>  dispatch(loadCustomersAction(getCustomersFromVariation(variation, globals, customers)));
};
