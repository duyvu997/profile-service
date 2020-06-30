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
import { profileService } from "./service";
export class ProfileHandler {

  @connectDb
  public async socialLoginZalo(
    event: APIGatewayProxyEvent,
    context: Context
  ): Promise<APIGatewayProxyResult> {
    let request: ZaloReDirect;
    
    request = await transformAndValidate(ZaloReDirect, event.queryStringParameters || {});

    const { code } = request;

    let { profileId = '' } = await profileService.getByZaloCode(code) || {};

    if (profileId.length == 0) {
      profileId = (await profileService.create(code)).profileId;
    };

    let accessToken: string = await profileService.generateToken(profileId);

    return buildApiGatewayOkResponse({ profileId: profileId, accessToken });
  }
}

const profileHandler = new ProfileHandler();
export const socialLoginZalo = (event: any, context?: any) =>
  profileHandler.socialLoginZalo(event, context);
