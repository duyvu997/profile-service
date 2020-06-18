// import { houseModel } from "./model";
// import { IHouseFilterProperties } from "./handler.model";
// import { DistrictEnum, ReleaseTypeEnum } from "./house.enum";
// const DEFAULT_RADIUS = Number(process.env.DefaultRadius) | 20000;

// export class HouseRepository {
//   public async getHouses(offset: number, limit: number, filterObject: IHouseFilterProperties): Promise<any> {
//     const { lat, lgn } = filterObject;
//     const query = lat && lgn ? this.buildQueryByLocation(filterObject) : this.buildNormalQuery(filterObject);
//     return houseModel.aggregate([
//       query,
//       { $skip: limit * (offset) },
//       { $limit: limit }
//     ]);
//   }
//   private buildQueryByLocation(filterObject: IHouseFilterProperties) {
//     const { lat, lgn, radius = DEFAULT_RADIUS } = filterObject;
//     return {
//       $geoNear: {
//         near: { type: "Point", coordinates: [lat, lgn] },
//         distanceField: "dist.calculated",
//         maxDistance: radius,
//         query: this.buildQuery(filterObject),
//         includeLocs: "dist.location",
//         spherical: true
//       }
//     }
//   }

//   private buildNormalQuery(filterObject: IHouseFilterProperties) {
//     return { $match: this.buildQuery(filterObject) }
//   }

//   private buildQuery(filterObject: IHouseFilterProperties): Object {
//     const { maxPrice, minPrice, releaseType, district } = filterObject;
//     const result = {
//       ...this.buildQueryByDistrict(district),
//       ...this.buildQueryByPrice(minPrice, maxPrice),
//       ...this.buildQueryByReleaseType(releaseType)
//     };
//     console.log('build query: ', result);
//     return result;
//   }

//   private buildQueryByDistrict(district?: string) {
//     return district ? { address_district: DistrictEnum[district] } : undefined;
//   };

//   private buildQueryByPrice(minPrice?: number, maxPrice?: number) {
//     if (!maxPrice && !minPrice) {
//       return;
//     }
//     let queryByMax = {};
//     let queryByMin = {};

//     minPrice ? queryByMin = { $gte: Number(minPrice) } : undefined;
//     maxPrice ? queryByMax = { $lte: Number(maxPrice) } : undefined;

//     return { price_rent: { ...queryByMin, ...queryByMax } }
//   };

//   private buildQueryByReleaseType(releaseType?: ReleaseTypeEnum) {
//     return releaseType ? { realestate_type: ReleaseTypeEnum[releaseType] } : undefined
//   }
// }

// export const houseRepository = new HouseRepository();


