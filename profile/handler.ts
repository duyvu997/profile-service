import { connectDb } from "../common/aop";
import {
  APIGatewayProxyEvent,
  Context,
  APIGatewayProxyResult
} from "aws-lambda";
import {
  buildApiGatewayOkResponse,
  buildApiGatewayBadRequest
} from "aws-lambda-response-builder";
import { profileService } from "./service";
import { transformAndValidate } from "class-transformer-validator";
import { CreateProfileRequest } from "./handler.model";
import { logger } from "../common/logger";
import { Profile } from "./model";

export class ProfileHandler {
  @connectDb
  public async createProfile(
    event: APIGatewayProxyEvent,
    context: Context
  ): Promise<APIGatewayProxyResult> {
    let request: CreateProfileRequest;
    try {
      request = (await transformAndValidate(
        CreateProfileRequest,
        event.body || "{}"
      )) as CreateProfileRequest;
    } catch (error) {
      logger.error(JSON.stringify(error));
      return buildApiGatewayBadRequest();
    }
    const { name, username, password, avatarUrl } = request;

    const doesProfileExisted =  await profileService.doesUsernameExist(username);

    if(doesProfileExisted){
      return buildApiGatewayBadRequest({response: "username already exist"});
    }
    const encryptedPassword = await profileService.encryptPassword(password);

    const profileToBeCreated = {
      name,
      username,
      password: encryptedPassword,
      avatarUrl
    } as Profile;

    const result = await profileService.createProfile(profileToBeCreated);
    logger.debug("create profile result: ", result);

    const token =  await profileService.generateToken(result._id.toString());
    
    return buildApiGatewayOkResponse({ response: token });
  }

  @connectDb
  public async login(
    event: APIGatewayProxyEvent,
    context: Context
  ): Promise<APIGatewayProxyResult> {
    const id = String(event.pathParameters && event.pathParameters.id);
    const result = await profileService.getHouseById(id);
    logger.debug("get house by id result: ", result);
    return buildApiGatewayOkResponse({ response: result });
  }
}

const profileHanlder = new ProfileHandler();
export const createProfile = (event: any, context?: any) =>
  profileHanlder.createProfile(event, context);

export const login = (event: any, context?: any) =>
  profileHanlder.login(event, context);
