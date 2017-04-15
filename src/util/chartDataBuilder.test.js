import { buildChartData } from './chartDataBuilder';

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

const cumulativePlots = [
  { month: 'march', val1: 6, val2: 14 },
  { month: 'april', val1: 8, val2: 13 },
  { month: 'may', val1: 10, val2: 12 },
  { month: 'june', val1: 12, val2: 11 },
];

it('builds chart plots', () => {
  const result = buildChartData(userData, range);
  //console.log(result);
  expect(result).toEqual(plots);
});