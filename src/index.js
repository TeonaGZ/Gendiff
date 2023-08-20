import path from 'node:path';
import process from 'node:process';
import fs from 'node:fs';
import parse from './parsers.js';
import getDifferenceTree from './differenceTree.js';
import format from './formatters/index.js';

const readFile = (filepath) => {
  const absoluteFilepath = path.resolve(process.cwd(), filepath);
  const data = fs.readFileSync(absoluteFilepath, 'utf-8');
  const fileFormat = path.extname(filepath).slice(1);
  return parse(data, fileFormat);
};

const genDiff = (file1, file2, formatName = 'stylish') => {
  const data1 = readFile(file1);
  const data2 = readFile(file2);

  const diff = getDifferenceTree(data1, data2);

  return format(diff, formatName);
};

export default genDiff;
