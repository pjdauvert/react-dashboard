// This function merges 2 vectors by adding their components
export const addVectors = (vector1, vector2) => {
  if(Array.isArray(vector1) && Array.isArray(vector2)){
    const vector = [];
    let vectorLength;
    if ( vector1.length >= vector2.length ) vectorLength = vector1.length;
    else vectorLength = vector2.length;
    for( let i = 0 ; i < vectorLength; i++ ) {
      vector.push((vector1[i] || 0) + (vector2[i] || 0));
    }
    return vector;
  } else {
    console.error("Vectors should be arrays");
    return null;
  }

};

// This function adds all vectors of given keys from the elements of the given data array.
export const aggregateCumulativeData = (keys, data) => {
  // prepare agregator to recieve data
  const aggregator = {};
  keys.forEach( key => aggregator[key] = []);
  data.forEach(fragment => {
    keys.forEach(key => {
      aggregator[key] = addVectors(aggregator[key], fragment[key]);
    });
  });
  return aggregator;
};

// Given two collections, the result is an array of merged elements corresponding to the given key.
export const consolidateData = (key1, collection1, key2, collection2) => {
  if(Array.isArray(collection1) && Array.isArray(collection2)) {
    const result = [];
    collection1.forEach(element => {
      const matchValue = element[key1];
      collection2
        .filter(match => match[key2] === matchValue)
        .forEach( matched => result.push(Object.assign({}, matched, element)));
    });
    return result;
  } else {
    console.error("Collections should be arrays");
    return null;
  }
};

// unwind range will generate  an array of plots with as many elements as range length,
// with the value of the indexed attributes corresponding to the range index.
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
  let chartData = data;
  if(!Array.isArray(data)) chartData = [chartData];
  const chartPlots = [];
  // loop over each data elements to unwind on range
  chartData.forEach(element => {
    Array.prototype.push.apply(chartPlots, unwindRange(element, range)); // merge trick
  });
  return chartPlots;
};

export const getCustomerUsageDelta = (customer, globals) => {
  const consolidatedCustomer = Object.assign({}, customer, { usage : {} });
  Object.keys(globals).forEach(key => {
    const usage = globals[key].find(usage => usage.salesforceId === customer.salesforceId);
    if(usage) {
      const delta = usage.predictedUsage === 0 ? 0 : (usage.actualUsage / usage.predictedUsage) - 1;
      consolidatedCustomer.usage[key] = { actualUsage: usage.actualUsage, predictedUsage: usage.predictedUsage, delta };
    }
  });
  return consolidatedCustomer;
};

export const getCustomersUsageDelta = (customers, globals) => {
  return customers.map(customer => getCustomerUsageDelta(customer, globals));
};