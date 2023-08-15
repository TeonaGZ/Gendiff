import getStylishData from './stylish.js';
import getPlainData from './plain.js';
import getJsonData from './json.js';

const chooseFormat = (tree, format = 'stylish') => {
  if (format === 'stylish') {
    return getStylishData(tree);
  }
  if (format === 'plain') {
    return getPlainData(tree);
  }
  if (format === 'json') {
    return getJsonData(tree);
  }
  throw new Error(`Unknown file format: ${format}`);
};

export default chooseFormat;
