import path from 'node:path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const expectedStylish = readFile('stylish.txt');
const expectedPlain = readFile('plain.txt');
const expectedJson = readFile('json.txt');

const jsonFile1 = getFixturePath('file1.json');
const jsonFile2 = getFixturePath('file2.json');
const ymlFile1 = getFixturePath('file1.yml');
const ymlFile2 = getFixturePath('file2.yml');

describe('genDiff', () => {
  test('stylish genDiff for json', () => {
    expect(genDiff(jsonFile1, jsonFile2)).toEqual(expectedStylish);
  });
  test('stylish genDiff for yml', () => {
    expect(genDiff(ymlFile1, ymlFile2)).toEqual(expectedStylish);
  });
  test('plain genDiff', () => {
    expect(genDiff(jsonFile1, ymlFile2, 'plain')).toEqual(expectedPlain);
  });
  test('json genDiff', () => {
    expect(genDiff(ymlFile1, jsonFile2, 'json')).toEqual(expectedJson);
  });
});
