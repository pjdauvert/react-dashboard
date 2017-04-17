import { buildChartData, aggregateCumulativeData } from './aggregation';


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
        color: '#ff5722'
      },
      {
        field: 'predictedUsage',
        name: 'Predicted usage',
        color: '#03a9f4',
      }
    ],
    // x : plot => new Date(plot.year, plot.month - 1, 1)
    // xScale: 'time',
    x : plot => `${plot.month}/${plot.year}`, // x is a function that returns a comparable value out of the plot data
    xScale: 'ordinal',
  };
};
