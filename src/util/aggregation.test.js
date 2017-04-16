import { aggregateCumulativeData, addVectors, consolidateData, buildChartData } from './aggregation';

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

it('builds chart plots', () => {
  const userData = [
    {id: 'user1', val1: [1, 2, 3, 4], val2: [4, 3, 2, 1],},
    {id: 'user2', val1: [5, 6, 7, 8], val2: [10, 10, 10, 10]}
  ];

  const range = [
    { month: 'march' },
    { month: 'april' },
    { month: 'may' },
    { month: 'june' }
  ];

  const plots = [
    { id: 'user1', month: 'march', val1: 1, val2: 4 },
    { id: 'user1', month: 'april', val1: 2, val2: 3 },
    { id: 'user1', month: 'may', val1: 3, val2: 2 },
    { id: 'user1', month: 'june', val1: 4, val2: 1 },
    { id: 'user2', month: 'march', val1: 5, val2: 10 },
    { id: 'user2', month: 'april', val1: 6, val2: 10 },
    { id: 'user2', month: 'may', val1: 7, val2: 10 },
    { id: 'user2', month: 'june', val1: 8, val2: 10 }
  ];
  const result = buildChartData(userData, range);
  //console.log(result);
  expect(result).toEqual(plots);
});

it('cumulate collections and build chart plots', () => {
  const data = [
    {id: 'user1', val1: [1, 2, 3, 4], val2: [4, 3, 2, 1],},
    {id: 'user2', val1: [5, 6, 7, 8], val2: [10, 10, 10, 10]}
  ];

  const range = [
    { month: 'march' },
    { month: 'april' },
    { month: 'may' },
    { month: 'june' }
  ];
  const cumulativePlots = [
    {month: 'march', val1: 6, val2: 14},
    {month: 'april', val1: 8, val2: 13},
    {month: 'may', val1: 10, val2: 12},
    {month: 'june', val1: 12, val2: 11},
  ];
  const aggregated = aggregateCumulativeData(['val1', 'val2'], data);
  const result = buildChartData(aggregated, range);
  //console.log(result);
  expect(result).toEqual(cumulativePlots);
});
