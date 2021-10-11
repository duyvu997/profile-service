import { connectDb } from "../common/aop";
import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
} from "aws-lambda";
import {
  buildApiGatewayOkResponse,
  buildApiGatewayUnauthorized,
} from "aws-lambda-response-builder";
import * as _ from "lodash";
import {
  ZaloReDirect,
  IProfilePayload,
  FacebookReDirect,
} from "./handler.model";
import { transformAndValidate } from "class-transformer-validator";
import { profileService } from "./service";
import { ERROR_CODE } from "../common/error";
import { getAuthPayload } from "../common/authenticate.utils";
export class ProfileHandler {
  @connectDb
  public async socialLoginZalo(
    event: APIGatewayProxyEvent,
    context: Context
  ): Promise<APIGatewayProxyResult> {
    const { code } = await transformAndValidate(
      ZaloReDirect,
      event.queryStringParameters || {}
    );

    let { profileId = "" } = (await profileService.getByZaloCode(code)) || {};

    if (profileId.length == 0) {
      profileId = (await profileService.createZaloUser(code)).profileId;
    }

    let accessToken: string = await profileService.generateToken(profileId);

    return buildApiGatewayOkResponse({ profileId: profileId, accessToken });
  }

  @connectDb
  public async socialLoginFacebook(
    event: APIGatewayProxyEvent,
    context: Context
  ): Promise<APIGatewayProxyResult> {
    const { access_token: fbAccessToken } = await transformAndValidate(
      FacebookReDirect,
      event.queryStringParameters || {}
    );

    let { profileId = "" } =
      (await profileService.getByFBAccessToken(fbAccessToken)) || {};

    if (profileId.length == 0) {
      profileId = (await profileService.createFacebookUser(fbAccessToken))
        .profileId;
    }

    let accessToken: string = await profileService.generateToken(profileId);

    return buildApiGatewayOkResponse({ profileId: profileId, accessToken });
  }

  @connectDb
  public async getProfileInformation(
    event: APIGatewayProxyEvent,
    context: Context
  ): Promise<APIGatewayProxyResult> {
    let authPayload = {} as IProfilePayload;
    try {
      authPayload = getAuthPayload(event) as IProfilePayload;
    } catch (error) {
      if (error.message === ERROR_CODE.UNAUTHORIZED) {
        return buildApiGatewayUnauthorized({
          error: { message: "Missing Authentication" },
        });
      }
    }
    const { profileId } = authPayload;
    const response = await profileService.getProfileInformation(profileId);
    return buildApiGatewayOkResponse({ response });
  }
}

const profileHandler = new ProfileHandler();
export const socialLoginZalo = (event: any, context?: any) =>
  profileHandler.socialLoginZalo(event, context);
export const getProfileInformation = (event: any, context?: any) =>
  profileHandler.getProfileInformation(event, context);
export const socialLoginFacebook = (event: any, context?: any) =>
  profileHandler.socialLoginFacebook(event, context);
