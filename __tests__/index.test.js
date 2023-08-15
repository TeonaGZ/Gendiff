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
const expectedJsonRes = readFile('json.json');

const jsonFile1 = getFixturePath('file1.json');
const jsonFile2 = getFixturePath('file2.json');
const ymlFile1 = getFixturePath('file1.yml');
const ymlFile2 = getFixturePath('file2.yml');

describe('genDiff', () => {
  test('genDiff', () => {
    expect(genDiff(jsonFile1, jsonFile2)).toEqual(expectedStylishRes);
  });
  test('genDiff', () => {
    expect(genDiff(ymlFile1, ymlFile2)).toEqual(expectedStylishRes);
  });
  test('genDiff', () => {
    expect(genDiff(jsonFile1, ymlFile2, 'plain')).toEqual(expectedPlainRes);
  });
  test('genDiff', () => {
    expect(genDiff(ymlFile1, jsonFile2, 'json')).toEqual(expectedJsonRes);
  });
});
