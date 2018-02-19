import _ from 'lodash';

const keyTypes = [
  {
    type: 'nested',
    check: (first, second, key) =>
      first[key] instanceof Object && second[key] instanceof Object,
    process: (first, second, f) => ({ curValue: f(first, second) }),
  },
  {
    type: 'removed',
    check: (first, second, key) =>
      !_.has(second, key),
    process: first => ({ curValue: first }),
  },
  {
    type: 'added',
    check: (first, second, key) =>
      !_.has(first, key),
    process: (first, second) => ({ curValue: second }),
  },
  {
    type: 'updated',
    check: (first, second, key) =>
      first[key] !== second[key],
    process: (first, second) => ({ curValue: second, oldValue: first }),
  },
  {
    type: 'equal',
    check: (first, second, key) =>
      first[key] === second[key],
    process: first => ({ curValue: first }),
  },
];

const iterAst = (parsedData1, parsedData2) => {
  const uniqueItems = _.union(Object.keys(parsedData1), Object.keys(parsedData2));
  return uniqueItems.map((key) => {
    const { type, process } = _.find(keyTypes, item => item.check(parsedData1, parsedData2, key));
    const value = process(parsedData1[key], parsedData2[key], iterAst);
    return { type, key, ...value };
  });
};

export default iterAst;
