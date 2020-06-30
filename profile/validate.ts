// import { GetHousesRequest } from "./handler.model";
// import * as _ from "lodash"
// import { transformAndValidate } from "class-transformer-validator";
// import { houseFilterProperty } from "./house.constant";

// export class HouseValidator {
//   public validateFilterRequest = async (filter: object): Promise<GetHousesRequest> => {
//     let request: GetHousesRequest;
//     const receivedKeys = _.keys(filter);
//     receivedKeys.forEach(key => { 
//       if (!houseFilterProperty.includes(key.trim())) {
//         throw new Error(`Don't allow filter by key ${key}.`);
//       }
//     })
//     request = (await transformAndValidate(
//       GetHousesRequest,
//       filter,
//       {
//         validator: {
//           forbidUnknownValues: false
//         }
//       }
//     )) as GetHousesRequest;
//     return request;
//   }
// }
// export const houseValidator = new HouseValidator();