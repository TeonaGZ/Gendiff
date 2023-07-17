import _ from 'lodash';
import process from 'node:process';
import path from 'node:path';
import fs from 'node:fs';

const getAbsoluteFilepath = (filepath) => path.resolve(process.cwd(), filepath);

const getJsonObject = (filepath) => JSON.parse(fs.readFileSync(filepath, 'utf-8'));

const getFileKeys = (fileObject) => Object.keys(fileObject);

const getFormat = (filepath) => path.extname(filepath).slice(1);

const genDiff = (file1, file2) => {
  const absoluteFilepath1 = getAbsoluteFilepath(file1);
  const absoluteFilepath2 = getAbsoluteFilepath(file2);

  const data1 = getJsonObject(absoluteFilepath1);
  const data2 = getJsonObject(absoluteFilepath2);

  const file1Keys = getFileKeys(data1);
  const file2Keys = getFileKeys(data2);

  const mergedSortedKeys = _.sortBy(_.union(file1Keys, file2Keys));

  const newValue = '  + ';
  const delValue = '  - ';
  const sameValue = '    ';

  const difference = (mergedSortedKeys).map((key) => {
    if (!Object.hasOwn(data1, key)) {
      return `${newValue}${key}: ${data2[key]}`;
    }
    if (!Object.hasOwn(data2, key)) {
      return `${delValue}${key}: ${data1[key]}`;
    }
    if (data1[key] !== data2[key]) {
      return `${delValue}${key}: ${data1[key]}\n${newValue}${key}: ${data2[key]}`;
    }
    return `${sameValue}${key}: ${data1[key]}`;
  });

  const result = `{\n${difference.join('\n')}\n}`;
  return result;
};

export default genDiff;
