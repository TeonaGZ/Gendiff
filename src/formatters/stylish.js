import _ from 'lodash';

const replacer = ' ';
const spacesCount = 4;

const getIndent = (depth) => replacer.repeat((spacesCount * depth) - 2);
const getBracketIndent = (depth) => replacer.repeat(spacesCount * (depth - 1));

const stringify = (data, depth) => {
  if (!_.isObject(data)) {
    return String(data);
  }
  const arrayData = Object.entries(data);
  const lines = arrayData.map(([key, value]) => `${getIndent(depth)}  ${key}: ${stringify(value, depth + 1)}`);
  return ['{', ...lines, `${getBracketIndent(depth)}}`].join('\n');
};

const getStylishData = (diffTree) => {
  const iter = (node, depth) => {
    const indent = getIndent(depth);
    const newValue = '+ ';
    const oldValue = '- ';
    const sameValue = '  ';

    const stylishData = node.map((data) => {
      switch (data.type) {
        case 'nested':
          return `${indent}${sameValue}${data.key}: ${iter(data.children, depth + 1)}`;
        case 'added':
          return `${indent}${newValue}${data.key}: ${stringify(data.value, depth + 1)}`;
        case 'deleted':
          return `${indent}${oldValue}${data.key}: ${stringify(data.value, depth + 1)}`;
        case 'changed':
          return `${indent}${oldValue}${data.key}: ${stringify(data.oldValue, depth + 1)}\n${indent}${newValue}${data.key}: ${stringify(data.newValue, depth + 1)}`;
        case 'unchanged':
          return `${indent}${sameValue}${data.key}: ${stringify(data.value, depth + 1)}`;
        default:
          throw new Error(`Unknown type: ${data.type}`);
      }
    });
    return `{\n${stylishData.join('\n')}\n${getBracketIndent(depth)}}`;
  };
  return iter(diffTree, 1);
};

export default getStylishData;
