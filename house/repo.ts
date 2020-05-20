import { houseModel } from "./model";
const DEFAULT_RADIUS = Number(process.env.DefaultRadius) | 20000;

export class HouseRepository {
  public async getHouses(offset: number, limit: number, filterObject: any): Promise<any> {
    const { lat, lgn } = filterObject || {};
    const query = lat && lgn ? this.buildQueryByLocation(filterObject) : this.buildNormalQuery(filterObject);
    return houseModel.aggregate([
      query,
      { $skip: limit * (offset) },
      { $limit: limit }
    ]);
  }
  private buildQueryByLocation(filterObject: any) {
    const { lat, lgn, radius = DEFAULT_RADIUS } = filterObject;
    return {
      $geoNear: {
        near: { type: "Point", coordinates: [lat, lgn] },
        distanceField: "dist.calculated",
        maxDistance: radius,
        query: { category: "Parks" },
        includeLocs: "dist.location",
        spherical: true
      }
    }
  }

  private buildNormalQuery(filterObject: any) {
    return { $match: {} }
  }
}

export const houseRepository = new HouseRepository();


