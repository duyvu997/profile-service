import { connectDb } from "../common/aop";
import {
  APIGatewayProxyEvent,
  Context,
  APIGatewayProxyResult
} from "aws-lambda";
import {
  buildApiGatewayOkResponse, buildApiGatewayBadRequest,
} from "aws-lambda-response-builder";
import { houseService } from "./service";
import { GetHousesRequest } from "./handler.model";
import { logger } from "../common/logger";
import { getPaginationParams } from "../common/pagination-utils";
import * as _ from "lodash"
import { houseValidator } from "./validate";
export class HouseHandler {

  @connectDb
  public async getHouses(
    event: APIGatewayProxyEvent,
    context: Context
  ): Promise<APIGatewayProxyResult> {
    // todo: filter houses by params: price, location, distance, amenities, room type, capacity, 
    // sort by:  relatest, newest, price from low => high, high => low.
    // room type: ktx, can ho, cua hang, nha xuong, phong tro, 
    // price: 500k => 1B
    // location: and  distance around location,
    // amenities: using utf8. 
    const { pageIndex, pageSize, filter } = getPaginationParams(event);
    let filterRequest: GetHousesRequest
    try {
      filterRequest = await houseValidator.validateFilterRequest(filter);
    } catch (error) {
      logger.error("False when validate get house request ", error);
      return buildApiGatewayBadRequest({message: error.message});
    }
    console.log("filter: ", filterRequest);
    const result = await houseService.getHouses(pageIndex, pageSize, filterRequest);
    logger.debug("get houses result: ", result);
    return buildApiGatewayOkResponse({ response: result });
  }
}

const houseHandler = new HouseHandler();
export const getHouses = (event: any, context?: any) =>
  houseHandler.getHouses(event, context);
