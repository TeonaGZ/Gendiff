import _ from 'lodash';

const replacer = ' ';
const spacesCount = 4;
const addSign = '+ ';
const deleteSign = '- ';
const unchangedSign = '  ';

const getIndent = (depth) => replacer.repeat(spacesCount * depth - 2);

const stringify = (data, depth) => {
  if (!_.isObject(data)) {
    return String(data);
  }
  const entriesData = Object.entries(data);
  const lines = entriesData.map(([key, value]) => `${getIndent(depth + 1)}  ${key}: ${stringify(value, depth + 1)}`);
  return `{\n${lines.join('\n')}\n${getIndent(depth)}  }`;
};

const iter = (node, depth) => node.map((data) => {
  switch (data.type) {
    case 'nested': {
      const lines = iter(data.children, depth + 1).join('');
      return `${getIndent(depth)}${unchangedSign}${data.key}: {\n${lines}${getIndent(depth)}${unchangedSign}}\n`;
    }
    case 'added':
      return `${getIndent(depth)}${addSign}${data.key}: ${stringify(data.value, depth)}\n`;
    case 'deleted':
      return `${getIndent(depth)}${deleteSign}${data.key}: ${stringify(data.value, depth)}\n`;
    case 'changed': {
      const line1 = `${getIndent(depth)}${deleteSign}${data.key}: ${stringify(data.value1, depth)}`;
      const line2 = `${getIndent(depth)}${addSign}${data.key}: ${stringify(data.value2, depth)}`;
      return `${line1}\n${line2}\n`;
    }
    case 'unchanged':
      return `${getIndent(depth)}${unchangedSign}${data.key}: ${stringify(data.value, depth)}\n`;
    default:
      throw new Error(`Unknown type: ${data.type}`);
  }
});

const getStylishData = (diffTree) => `{\n${iter(diffTree, 1).join('')}}`;

export default getStylishData;
