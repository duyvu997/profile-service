import { houseRepository } from "./repo";

export class HouseService {
    public async getHouses(offset: number, limit: number){
        return houseRepository.getHouses(offset, limit);
    }
}
export const houseService =  new HouseService()