import { houseRepository } from "./repo";

export class HouseService {
  public async getHouses(offset: string, limit: string) {
    return houseRepository.getHouses(Number(offset), Number(limit));
  }
}
export const houseService = new HouseService();
