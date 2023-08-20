import getStylishData from './stylish.js';
import getPlainData from './plain.js';
import getJsonData from './json.js';

const format = (tree, formatName = 'stylish') => {
  if (formatName === 'stylish') {
    return getStylishData(tree);
  }
  if (formatName === 'plain') {
    return getPlainData(tree);
  }
  if (formatName === 'json') {
    return getJsonData(tree);
  }
  throw new Error(`Unknown file format: ${format}`);
};

export default format;
