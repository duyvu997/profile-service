import { houseRepository } from "./repo";

export class HouseService {
  public async getHouses(offset: string, limit: string, params: any) {
    return houseRepository.getHouses(Number(offset), Number(limit), params);
  }
}
export const houseService = new HouseService();
