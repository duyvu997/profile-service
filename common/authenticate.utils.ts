import { APIGatewayProxyEvent } from "aws-lambda";
import { jwtUtil } from "./jwt.utils";
import { ERROR_CODE } from "./error";

export const getAuthPayload = (event: APIGatewayProxyEvent) => {
  if (!event.headers.Authorization) {
    throw new Error(ERROR_CODE.UNAUTHORIZED)
  }
  return jwtUtil.decode(event.headers.Authorization)
}