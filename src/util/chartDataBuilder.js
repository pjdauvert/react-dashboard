import { aggregateCumulativeData } from './aggregation';


const unwindRange = (element, range) => {
  const plots = [];
  // loop over range, axisValue owns axis attributes, index is matchable in element's indexed values
  range.forEach((attributes, index) => {
    const plot = Object.assign({}, attributes);
    // find unwindable keys over element'a attributes
    Object.keys(element).forEach(key => {
      if (Array.isArray(element[key])) plot[key] = element[key][index]; //assign indexed attribute to plot with the same key
      else plot[key] = element[key]; // copy element attribute directly if not indexed
    });
    plots.push(plot);
  });
  return plots;
};

// function unwinds the arrays from the data of the 2 axis to generate an array of plots, usable by d3-library
export const buildChartData = (data, range) => {
  const chartPlots = [];
  // loop over each data elements to unwind on range
  data.forEach(element => {
    Array.prototype.push.apply(chartPlots, unwindRange(element, range)); // merge trick
  });
  return chartPlots;
};

// return flattened chart plots representing aggregated cumulative usage of customers
export const buildCumulativeCustomerUsage = (usageData, range) => {
  const aggregatedData = aggregateCumulativeData( ['actualUsage', 'predictedUsage'], usageData);
  return buildChartData(aggregatedData, range);
};
