import { buildChartData, aggregateCumulativeData } from './aggregation';


// return flattened chart plots representing aggregated cumulative usage of customers
export const buildCumulativeCustomerUsage = (usageData, range) => {
  const aggregatedData = aggregateCumulativeData( ['actualUsage', 'predictedUsage'], usageData);
  return {
    title: 'Users cumulative usage',
    chartData: buildChartData(aggregatedData, range),
    chartSeries: [
      {
        field: 'actualUsage',
        name: 'Actual usage',
        color: '#ff5722',
        style: {
          "stroke-width": 2,
          "stroke-opacity": .2,
          "fill-opacity": .2
        }
      },
      {
        field: 'predictedUsage',
        name: 'Predicted usage',
        color: '#03a9f4',
        style: {
          "stroke-width": 2,
          "stroke-opacity": .2,
          "fill-opacity": .2
        }
      }
    ],
    x : plot => new Date(plot.year, plot.month - 1, 1) // x is a function that returns a comparable value out of the plot data
  };
};
