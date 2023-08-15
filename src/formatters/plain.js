import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (_.isString(value)) {
    return `'${value}'`;
  }
  return value;
};

const getCurrentProperty = (node, property) => {
  if (property !== '') {
    return `${property}.${node.key}`;
  }
  return `${String(node.key)}`;
};

const getPlainData = (diffTree) => {
  const iter = (node, property) => {
    const plainData = node.filter((data) => data.type !== 'unchanged')
      .map((data) => {
        switch (data.type) {
          case 'nested':
            return `${iter(data.children, getCurrentProperty(data, property))}`;
          case 'added':
            return `Property '${getCurrentProperty(data, property)}' was added with value: ${stringify(data.value)}`;
          case 'deleted':
            return `Property '${getCurrentProperty(data, property)}' was removed`;
          case 'changed':
            return `Property '${getCurrentProperty(data, property)}' was updated. From ${stringify(data.oldValue)} to ${stringify(data.newValue)}`;
          default:
            throw new Error(`Unknown type: ${data.type}`);
        }
      });
    return [...plainData].join('\n');
  };
  return iter(diffTree, '');
};

export default getPlainData;
