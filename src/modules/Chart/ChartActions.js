import { buildCumulativeCustomerUsage, buildCustomerUsage } from '../../util/chartDataBuilder';

export const UPDATE_CHART = 'UPDATE_CHART';

export function updateChartAction(chart) {
  return {
    type: UPDATE_CHART,
    chart,
  };
}

export const showCumulativeChart = (usage, range) => {
  return dispatch =>  dispatch(updateChartAction(buildCumulativeCustomerUsage(usage, range)));
};

export const showCustomerChart = (customer, usageData, range) => {
  return dispatch =>  dispatch(updateChartAction(buildCustomerUsage(customer, usageData, range)));
};