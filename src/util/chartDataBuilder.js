import { buildChartData, aggregateCumulativeData, getCustomerUsageDelta } from './aggregation';
import * as theming from '../modules/App/theming';

// return flattened chart plots representing aggregated cumulative usage of customers
export const buildCumulativeCustomerUsage = (usageData, range) => {
  const aggregatedData = aggregateCumulativeData( ['actualUsage', 'predictedUsage'], usageData);
  return {
    title: 'Cumulative customers usage',
    subtitle: 'Amount per month',
    description: `This chart shows cumulative amounts of ${usageData.length} customers for actual usage and predicted usage`,
    chartData: buildChartData(aggregatedData, range),
    chartSeries: [
      {
        field: 'actualUsage',
        name: 'Actual usage',
        color: theming.primaryColor
      },
      {
        field: 'predictedUsage',
        name: 'Predicted usage',
        color: theming.secondaryColor
      }
    ],
    x : plot => `${plot.month}/${plot.year}`, // x is a function that returns a comparable value out of the plot data
    xScale: 'ordinal',
  };
};

export const buildCustomerUsage = (customer, usageData, range) => {
  const customerData = usageData.filter(data => data.salesforceId === customer.salesforceId);
  return {
    title: `${customer.name} usage`,
    subtitle: 'Amount per month',
    description: `This chart shows trend for ${customer.name} with actual usage and predicted usage. Manager is ${customer.manager}. Owner is ${customer.owner}. Country: ${customer.country}`,
    chartData: buildChartData(customerData, range),
    chartSeries: [
      {
        field: 'actualUsage',
        name: 'Actual usage',
        color: theming.primaryColor
      },
      {
        field: 'predictedUsage',
        name: 'Predicted usage',
        color: theming.secondaryColor
      }
    ],
    x : plot => `${plot.month}/${plot.year}`, // x is a function that returns a comparable value out of the plot data
    xScale: 'ordinal',
  };
};
