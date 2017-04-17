export const CUSTOMER_CONTROL_UPDATE = 'CUSTOMER_CONTROL_UPDATE';
export const VARIATION_CONTROL_UPDATE = 'VARIATION_CONTROL_UPDATE';

export function updateCustomerAction(customer) {
  return {
    type: CUSTOMER_CONTROL_UPDATE,
    customer,
  };
}

export function updateVariationAction(variation) {
  return {
    type: VARIATION_CONTROL_UPDATE,
    variation,
  };
}

