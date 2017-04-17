export const CUSTOMER_CONTROL_UPDATE = 'CUSTOMER_CONTROL_UPDATE';

export function updateCustomerAction(customer) {
  return {
    type: CUSTOMER_CONTROL_UPDATE,
    customer,
  };
}