import { houseRepository } from "./repo";

export class HouseService {
  public async getHouses(offset: number, limit: number, filter: any) {
    return houseRepository.getHouses(offset, limit, filter);
  }
}
export const houseService = new HouseService();
