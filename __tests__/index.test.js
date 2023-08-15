import path from 'node:path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const expectedStylishRes = readFile('stylish.txt');
const expectedPlainRes = readFile('plain.txt');

describe('genDiff', () => {
  test('genDiff', () => {
    const file1 = getFixturePath('file1.json');
    const file2 = getFixturePath('file2.json');
    expect(genDiff(file1, file2)).toEqual(expectedStylishRes);
  });
  test('genDiff', () => {
    const file1 = getFixturePath('file1.yml');
    const file2 = getFixturePath('file2.yml');
    expect(genDiff(file1, file2)).toEqual(expectedStylishRes);
  });
  test('genDiff', () => {
    const file1 = getFixturePath('file1.yml');
    const file2 = getFixturePath('file2.json');
    expect(genDiff(file1, file2, 'plain')).toEqual(expectedPlainRes);
  });
});
