import yaml from 'js-yaml';

const parse = (format, data) => {
  let parsedData;
  if (format === 'json') {
    parsedData = JSON.parse(data);
  } else if (format === 'yml' || format === 'yaml') {
    parsedData = yaml.load(data);
  } else {
    throw new Error('invalid format');
  }
  return parsedData;
};

export default parse;
