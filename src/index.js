import getParsedData from './parsers.js';
import getDifferenceTree from './differenceTree.js';
import format from './formatters/index.js';

const genDiff = (file1, file2, formatName = 'stylish') => {
  const data1 = getParsedData(file1);
  const data2 = getParsedData(file2);

  const diff = getDifferenceTree(data1, data2);

  return format(diff, formatName);
};

export default genDiff;
