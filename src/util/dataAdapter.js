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
    const range = [];
    const start = moment(domain.from, 'MM-YYYY');
    const end = moment(domain.to, 'MM-YYYY');
    range.push(getRangeMoment(start));
    while (start.isBefore(end)) {
      start.add(1, 'months');
      range.push(getRangeMoment(start));
    }
    return range;
  }
}

export default (sample) => {
  return {
    app: sample.categoriesY,
    ordinate: {
      label: sample.categoriesY,
      data: sample.domainY
    },
    axis: {
      range: getRange(sample.domainX),
      data: sample.data,
    },
    globals: sample.globals
  };
}
