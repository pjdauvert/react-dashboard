import { buildCumulativeCustomerUsage, buildCustomerUsage } from '../../util/chartDataBuilder';
import { getCustomerUsageDelta } from '../../util/aggregation';

export const UPDATE_CHART = 'UPDATE_CHART';
export const UPDATE_STAT = 'UPDATE_STAT';

export function updateChartAction(chart) {
  return {
    type: UPDATE_CHART,
    chart,
  };
}

export function updateStatAction(customer) {
  return {
    type: UPDATE_STAT,
    customer,
  };
}

export const showCumulativeChart = (usage, range) => {
  return dispatch =>  {
    dispatch(updateChartAction(buildCumulativeCustomerUsage(usage, range)));
    dispatch(updateStatAction(null));
  }
};

export const showCustomerChart = (customer, usageData, range) => {
  return dispatch =>  dispatch(updateChartAction(buildCustomerUsage(customer, usageData, range)));
};

export const showCustomerStats = (customer, globals) => {
  return dispatch =>  dispatch(updateStatAction(getCustomerUsageDelta(customer, globals)));
};