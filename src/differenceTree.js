import _ from 'lodash';

const getDifferenceTree = (data1, data2) => {
  const sortedKeys = _.sortBy(_.union(Object.keys(data1), Object.keys(data2)));

  const difference = (sortedKeys).map((key) => {
    if (!Object.hasOwn(data1, key)) {
      return { key, value: data2[key], type: 'added' };
    }
    if (!Object.hasOwn(data2, key)) {
      return { key, value: data1[key], type: 'deleted' };
    }
    if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      return { key, children: getDifferenceTree(data1[key], data2[key]), type: 'nested' };
    }
    if (!_.isEqual(data1[key], data2[key])) {
      return {
        key,
        value1: data1[key],
        value2: data2[key],
        type: 'changed',
      };
    }
    return { key, value: data1[key], type: 'unchanged' };
  });
  return difference;
};

export default getDifferenceTree;
