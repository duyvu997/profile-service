import { getHouses } from "../handler";
import { expect } from "chai";
import { setup, cleanup } from "../test.util";
const context = {};

describe("#getHouses", () => {
  before(setup);
  after(cleanup);
  it("==> good-case: should return empty data", async () => {
    const { statusCode, body } = await getHouses(
      {
        queryStringParameters: { limit: "1", offset: "1" }
      },
      context
    );

    const responseData = JSON.parse(body).response;
    expect(statusCode).to.eq(200);
    expect(responseData.length).to.eq(Number(0));
  });
});
