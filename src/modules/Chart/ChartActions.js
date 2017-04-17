import { buildCumulativeCustomerUsage, buildCustomerUsage } from '../../util/chartDataBuilder';
import { getCustomerUsageDelta } from '../../util/aggregation';

export const UPDATE_CHART = 'UPDATE_CHART';
export const UPDATE_CUSTOMER = 'UPDATE_CUSTOMER';

export function updateChartAction(chart) {
  return {
    type: UPDATE_CHART,
    chart,
  };
}

export function updateCustomerAction(customer) {
  return {
    type: UPDATE_CUSTOMER,
    customer,
  };
}

export const showCumulativeChart = (usage, range) => {
  return dispatch =>  {
    dispatch(updateChartAction(buildCumulativeCustomerUsage(usage, range)));
    dispatch(updateCustomerAction(null));
  }
};

export const showCustomerChart = (customer, usageData, range) => {
  return dispatch =>  dispatch(updateChartAction(buildCustomerUsage(customer, usageData, range)));
};

export const showCustomerStats = (customer, globals) => {
  return dispatch =>  dispatch(updateCustomerAction(getCustomerUsageDelta(customer, globals)));
};