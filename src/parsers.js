import path from 'node:path';
import process from 'node:process';
import fs from 'node:fs';
import yaml from 'js-yaml';

const getAbsoluteFilepath = (filepath) => path.resolve(process.cwd(), filepath);
const getData = (filepath) => fs.readFileSync(getAbsoluteFilepath(filepath), 'utf-8');
const getFileFormat = (filepath) => path.extname(filepath).slice(1);

const getParsedData = (filepath) => {
  const format = getFileFormat(filepath);
  const data = getData(filepath);
  switch (format) {
    case 'json':
      return JSON.parse(data);
    case 'yml':
      return yaml.load(data);
    case 'yaml':
      return yaml.load(data);
    default:
      throw new Error(`Unknown file format: ${format}`);
  }
};

export default getParsedData;
