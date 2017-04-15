import { aggregateCumulativeData, addVectors, consolidateData } from './aggregation';

it('adds vectors', () => {
  const vectorA = [1, 2, 3, 4, 5];
  const vectorB = [1, 1, 1, 1, 1];
  const resultAB = [2, 3, 4, 5, 6];
  const result = addVectors(vectorA, vectorB);
  expect(result).toEqual(resultAB);
});

it('adds different length vectors', () => {
  const vectorA = [1, 2, 3, 4, 5];
  const vectorB = [1, 1, 1, 1, 1, 1, 1];
  const resultAB = [2, 3, 4, 5, 6, 1, 1];
  const result = addVectors(vectorA, vectorB);
  expect(result).toEqual(resultAB);
});

it('cumulate keyed vectors values', () => {
  const data = [
    { val1: [1, 2, 3, 4, 5, 6], val2: [6, 7, 8, 9] },
    { val1: [1, 1, 1, 1, 1], val2: [1, 1, 1, 1, 1] },
  ];
  const expected = { val1: [2, 3, 4, 5, 6, 6], val2: [7, 8, 9, 10, 1] };
  const result = aggregateCumulativeData(['val1', 'val2'], data);
  expect(result).toEqual(expected);
});

it('consolidate data with keys', () => {
  const collection1 = [
    { userId: 1, val1: [1, 2, 3, 4, 5, 6], val2: [6, 7, 8, 9] },
    { userId: 2, val1: [1, 1, 1, 1, 1], val2: [1, 1, 1, 1, 1] },
  ];
  const collection2 = [
    { id: 1, name: 'test1', location: 'here' },
    { id: 2, name: 'test2', location: 'there' },
  ];
  const expected =  [
    { userId: 1, val1: [1, 2, 3, 4, 5, 6], val2: [6, 7, 8, 9], id: 1, name: 'test1', location: 'here' },
    { userId: 2, val1: [1, 1, 1, 1, 1], val2: [1, 1, 1, 1, 1], id: 2, name: 'test2', location: 'there' }
    ];
  const result = consolidateData('userId', collection1, 'id', collection2);
  expect(result).toEqual(expected);
});