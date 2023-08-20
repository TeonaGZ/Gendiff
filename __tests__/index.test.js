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

describe('genDiff', () => {
  test('should be work with json', () => {
    const filepath1 = getFixturePath('file1.json');
    const filepath2 = getFixturePath('file2.json');
    expect(genDiff(filepath1, filepath2)).toEqual(expectedStylish);
    expect(genDiff(filepath1, filepath2, 'stylish')).toEqual(expectedStylish);
    expect(genDiff(filepath1, filepath2, 'plain')).toEqual(expectedPlain);
    expect(genDiff(filepath1, filepath2, 'json')).toEqual(expectedJson);
  });
  test('should be work with yml', () => {
    const filepath1 = getFixturePath('file1.yml');
    const filepath2 = getFixturePath('file2.yml');
    expect(genDiff(filepath1, filepath2)).toEqual(expectedStylish);
    expect(genDiff(filepath1, filepath2, 'stylish')).toEqual(expectedStylish);
    expect(genDiff(filepath1, filepath2, 'plain')).toEqual(expectedPlain);
    expect(genDiff(filepath1, filepath2, 'json')).toEqual(expectedJson);
  });
});
