import { connectDb } from "../common/aop";
import {
  APIGatewayProxyEvent,
  Context,
  APIGatewayProxyResult
} from "aws-lambda";
import { buildApiGatewayOkResponse } from "aws-lambda-response-builder";
import { cardDesignModel } from "./model";

export class HouseHandler {
  @connectDb
  public async getHouses(
    event: APIGatewayProxyEvent,
    context: Context
  ): Promise<APIGatewayProxyResult> {
    const a= await cardDesignModel.create({
      cardDesignId: "123456"
    })
    console.log(a);
    return buildApiGatewayOkResponse({ response: "ok123" });
  }
}

const houseHandler = new HouseHandler();
export const getHouses = (event: any, context?: any) =>
  houseHandler.getHouses(event, context);
