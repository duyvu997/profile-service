import { houseModel } from "./model";

export class HouseRepository {
  public async getHouses(offset: number, limit: number): Promise<any> {
    return houseModel.find(
      {},
      {},
      {
        skip: (offset - 1) * limit,
        limit
      }
    );
  }
}
export const houseRepository = new HouseRepository();
