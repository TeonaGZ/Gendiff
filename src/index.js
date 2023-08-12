import getParsedData from './parsers.js';
import getDifferenceTree from './differenceTree.js';
import chooseFormat from './formatters/index.js';

const genDiff = (file1, file2, format = 'stylish') => {
  const data1 = getParsedData(file1);
  const data2 = getParsedData(file2);

  const diff = getDifferenceTree(data1, data2);

  return chooseFormat(diff, format);
};

export default genDiff;
