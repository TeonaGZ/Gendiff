import getStylishData from './stylish.js';

const chooseFormat = (tree, format) => {
  if (format === 'stylish') {
    return getStylishData(tree);
  }
  throw new Error(`Unknown file format: ${format}`);
};

export default chooseFormat;
