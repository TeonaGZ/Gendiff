import getStylishData from './stylish.js';
import getPlainData from './plain.js';

const format = (tree, formatName = 'stylish') => {
  switch (formatName) {
    case 'stylish':
      return getStylishData(tree);
    case 'plain':
      return getPlainData(tree);
    case 'json':
      return JSON.stringify(tree);
    default:
      throw new Error(`Unknown file format: ${formatName}`);
  }
};

export default format;
