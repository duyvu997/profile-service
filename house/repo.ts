import { houseModel, House } from "./model";
import { nameof } from "../common/custom.function";

export class HouseRepository {
  public async getHouses(offset: number, limit: number, params: any): Promise<any> {
    const conditions = {
      [nameof<House>("attr_addr_street")]: params.street,
      [nameof<House>("attr_addr_district")]: params.district,
      [nameof<House>("attr_addr_ward")]: params.ward,
      [nameof<House>("attr_addr_city")]: params.city,
      [nameof<House>("attr_position")]: params.position,
      [nameof<House>("attr_release_type")]: params.releaseStateType,
      [nameof<House>("attr_price_min")]: params.area,
      [nameof<House>("attr_price_max")]: params.area,
      [nameof<House>("attr_price_min")]: params.price,
      [nameof<House>("attr_price_max")]: params.price,
      [nameof<House>("attr_interior_floor")]: params.interiorFloor,
      [nameof<House>("attr_interior_room")]: params.interiorRoom,
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
