import { RoomAPI } from './roomApi.js';

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

describe('GET /room', () => {
  test('this should return JSON', async () => {
    const result = await RoomAPI.getRoom();
    expect(hasJsonStructure(JSON.stringify(result))).toBe(true);
  });
});
