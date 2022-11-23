import { HotelAPI } from './hotelApi.js';

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

// // This is the section where we mock `fetch`
// const unmockedFetch = global.fetch

// beforeAll(() => {
//   global.fetch = () =>
//     Promise.resolve({
//       json: () => Promise.resolve([]),
//     })
// });

// afterAll(() => {
//     global.fetch = unmockedFetch
// });

describe('GET /hotel', () => {
  test('this should return JSON', async () => {
    const result = await HotelAPI.getHotel();
    expect(hasJsonStructure(JSON.stringify(result))).toBe(true);
  });
});
