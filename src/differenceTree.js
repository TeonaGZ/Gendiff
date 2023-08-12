import _ from 'lodash';

const getFileKeys = (fileObject) => Object.keys(fileObject);

const getDifferenceTree = (obj1, obj2) => {
  const keys1 = getFileKeys(obj1);
  const keys2 = getFileKeys(obj2);
  const mergedSortedKeys = _.sortBy(_.union(keys1, keys2));

  const difference = (mergedSortedKeys).map((key) => {
    if (_.isPlainObject(obj1[key]) && _.isPlainObject(obj2[key])) {
      return { key, children: getDifferenceTree(obj1[key], obj2[key]), type: 'nested' };
    }
    if (!Object.hasOwn(obj1, key)) {
      return { key, value: obj2[key], type: 'added' };
    }
    if (!Object.hasOwn(obj2, key)) {
      return { key, value: obj1[key], type: 'deleted' };
    }
    if (obj1[key] !== obj2[key]) {
      return {
        key,
        oldValue: obj1[key],
        newValue: obj2[key],
        type: 'changed',
      };
    }
    return { key, value: obj1[key], type: 'unchanged' };
  });
  return difference;
};

export default getDifferenceTree;
