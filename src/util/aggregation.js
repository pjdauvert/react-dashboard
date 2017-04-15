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