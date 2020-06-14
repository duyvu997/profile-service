import { connectDb } from "../common/aop";
import {
  APIGatewayProxyEvent,
  Context,
  APIGatewayProxyResult
} from "aws-lambda";
import {
  buildApiGatewayOkResponse,
  buildApiGatewayServerFailure
} from "aws-lambda-response-builder";
import { houseService } from "./service";
import { transformAndValidate } from "class-transformer-validator";
import { GetHouseFilterRequest } from "./handler.model";
import { logger } from "../common/logger";
import { getPaginationParams } from "../common/pagination-utils";

export class HouseHandler {

  @connectDb
  public async getHouses(
    event: APIGatewayProxyEvent,
    context: Context
  ): Promise<APIGatewayProxyResult> {
    let request: GetHouseFilterRequest;
    // todo: filter houses by params: price, location, distance, amenities, room type, capacity, 
    // sort by:  relatest, newest, price from low => high, high => low.
    // room type: ktx, can ho, cua hang, nha xuong, phong tro, 
    // price: 500k => 1B
    // location: and  distance around location,
    // amenities: using utf8. 
    const { pageIndex, pageSize, filter } = getPaginationParams(event);
    console.log("filter object: ", filter);
    try {
      request = await transformAndValidate(
        GetHouseFilterRequest,
        filter
      );
    } catch (error) {
      logger.error(JSON.stringify(error));
      return buildApiGatewayServerFailure();
    }

    try {

    } catch (error) {

    }
    const result = await houseService.getHouses(pageIndex, pageSize, filter);
    logger.debug("get houses result: ", result);
    return buildApiGatewayOkResponse({ response: result });
  }
}

const houseHandler = new HouseHandler();
export const getHouses = (event: any, context?: any) =>
  houseHandler.getHouses(event, context);
