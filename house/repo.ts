import { houseModel, House } from "./model";
import { nameof } from "../common/custom.function";

export class HouseRepository {
  public async getHouses(offset: number, limit: number, params: any): Promise<any> {
    const conditions = {
      [nameof<House>("attr_addr_street")]: params.street,
      [nameof<House>("attr_addr_district")]: params.district,
      [nameof<House>("attr_addr_ward")]: params.ward,
      [nameof<House>("attr_addr_city")]: params.city,
      [nameof<House>("position")]: params.position,
      [nameof<House>("releaseStateType")]: params.releaseStateType,
      [nameof<House>("minArea")]: params.area,
      [nameof<House>("minArea")]: params.area,
      [nameof<House>("minPrice")]: params.price,
      [nameof<House>("maxPrice")]: params.price,
      [nameof<House>("interiorFloor")]: params.interiorFloor,
      [nameof<House>("interiorRoom")]: params.interiorRoom,
    }
    return houseModel.find(
      conditions,
      {},
      {
        skip: (offset - 1) * limit,
        limit
      }
    );
  }
}
export const houseRepository = new HouseRepository();
