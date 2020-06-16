import { houseRepository } from "./repo";
import { IHouseFilterProperties } from "./handler.model";

export class HouseService {
  public async getHouses(offset: number, limit: number, filter: IHouseFilterProperties) {
    return houseRepository.getHouses(offset, limit, filter);
  }
}
export const houseService = new HouseService();
