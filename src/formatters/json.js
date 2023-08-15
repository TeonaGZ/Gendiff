// import _ from 'lodash';

// const stringify = (value) => {
//   if (_.isObject(value)) {
//     return '[complex value]';
//   }
//   if (_.isString(value)) {
//     return `'${value}'`;
//   }
//   return value;
// };

// const getCurrentProperty = (node, property) => {
//   if (property !== '') {
//     return `${property}.${node.key}`;
//   }
//   return `${String(node.key)}`;
// };

const getJsonData = (diffTree) => {
  const jsonData = JSON.stringify(diffTree);
  return jsonData;
};

export default getJsonData;
