import moment from 'moment';

// Months are zero indexed, so January is month 0. cf moment.js
const getRangeMoment = (period) => ({ month: period.month() + 1, year: period.year() });

/*
 adapt range of from/to periods to array of month & year objects
*/
const getRange = (domain) => {
  if(!domain.from || !domain.to) {
    console.error("Adapter cannot load initial axis range");
    return [];
  } else {
    // init vars
    const dateFormat = 'MM-YYYY';
    const start = moment(domain.from, dateFormat);
    const end = moment(domain.to, dateFormat);
    // insert first element
    const range = [];
    range.push(getRangeMoment(start));
    // loop over date until end is reached
    while (start.isBefore(end)) {
      start.add(1, 'months');
      range.push(getRangeMoment(start));
    }
    return range;
  }
}

// generate initial state from data sample.
export default (sample) => {
  return {
    app: {
      title: sample.categoriesY,
      customers: sample.domainY,
      range: getRange(sample.domainX),
      usage: sample.data,
      globals: sample.globals
    }
  };
}
