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
import { GetHouseRequest } from "./handler.model";
import { logger } from "../common/logger";

export class HouseHandler {
  @connectDb
  public async getHouses(
    event: APIGatewayProxyEvent,
    context: Context
  ): Promise<APIGatewayProxyResult> {
    let request: GetHouseRequest;
    try {
      request = await transformAndValidate(
        GetHouseRequest,
        event.queryStringParameters || {}
      );
    } catch (error) {
      logger.error(JSON.stringify(error));
      return buildApiGatewayServerFailure();
    }
    const { limit = "10", offset = "1" } = request;
    const result = await houseService.getHouses(offset, limit);
    logger.debug("get houses result: ", result);
    return buildApiGatewayOkResponse({ response: result });
  }
}

const houseHandler = new HouseHandler();
export const getHouses = (event: any, context?: any) =>
  houseHandler.getHouses(event, context);
