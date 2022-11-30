import { FnbAPI } from './fnbApi.js';

function hasJsonStructure(str) {
  if (typeof str !== 'string') return false;
  try {
    const result = JSON.parse(str);
    const type = Object.prototype.toString.call(result);
    return type === '[object Object]' || type === '[object Array]';
  } catch (err) {
    return false;
  }
}

describe('GET /fnb', () => {
  test('this should return JSON', async () => {
    const result = await FnbAPI.getFnb();
    expect(hasJsonStructure(JSON.stringify(result))).toBe(true);
  });
});
