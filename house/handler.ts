import { connectDb } from "../common/aop";
import {
  APIGatewayProxyEvent,
  Context,
  APIGatewayProxyResult
} from "aws-lambda";
import { buildApiGatewayOkResponse } from "aws-lambda-response-builder";
import { cardDesignModel } from "./model";
import { houseService } from "./service";

export class HouseHandler {
  @connectDb
  public async getHouses(
    event: APIGatewayProxyEvent,
    context: Context
  ): Promise<APIGatewayProxyResult> {
    const a = await cardDesignModel.create({
      cardDesignId: "123456"
    });
    const result =  await houseService.getHouses(1, 3);
    console.log(a);
    console.log(result);
    return buildApiGatewayOkResponse({ response: result });
  }
}

const houseHandler = new HouseHandler();
export const getHouses = (event: any, context?: any) =>
  houseHandler.getHouses(event, context);
