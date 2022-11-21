import { getHotel } from "./api.js";

describe("GET /hotel", () => {
    test('this should return JSON', async () => {
      // arrange and act
      const result = await getHotel();
    
      // assert
      expect(result).toStrictEqual({ message: "Looks like there was a problem." });
    });
   })