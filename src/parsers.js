import yaml from 'js-yaml';

const parse = (data, nameFormat) => {
  switch (nameFormat) {
    case 'json':
      return JSON.parse(data);
    case 'yml':
      return yaml.load(data);
    case 'yaml':
      return yaml.load(data);
    default:
      throw new Error(`Unknown file format: ${nameFormat}`);
  }
};

export default parse;
