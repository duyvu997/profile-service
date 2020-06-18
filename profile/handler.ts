import { connectDb } from "../common/aop";
import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context
} from "aws-lambda";
import {
  buildApiGatewayOkResponse,
} from "aws-lambda-response-builder";
import * as _ from "lodash"
import { ZaloReDirect } from "./handler.model";
import { transformAndValidate } from "class-transformer-validator";
export class ProfileHandler {

  @connectDb
  public async socialLoginZalo(
    event: APIGatewayProxyEvent,
    context: Context
  ): Promise<APIGatewayProxyResult> {
    let request: ZaloReDirect;
    request = await transformAndValidate(ZaloReDirect, event.queryStringParameters || {});
    const { uid, code, state, scope } = request;
    console.log(uid, code, state, scope);
    return buildApiGatewayOkResponse();
  }
}

const profileHandler = new ProfileHandler();
export const socialLoginZalo = (event: any, context?: any) =>
  profileHandler.socialLoginZalo(event, context);
