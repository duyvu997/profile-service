import * as jsonwebtoken from "jsonwebtoken";
interface RedemptionPayload {
  campaignId: string;
  redemptionCode: string;
}
const jwtSecret = process.env.jwtSecret || "sXajUtUX9LbYe6X";
const EXPIRESIN = "1h";

class JwtUtil {
  public sign(payload: RedemptionPayload): string {
    return jsonwebtoken.sign(payload, jwtSecret, { expiresIn: EXPIRESIN });
  }

  public verify(token: string): object | string {
    return jsonwebtoken.verify(token, jwtSecret);
  }

  public decode(token: string): null | { [key: string]: any } | string {
    const bearer = token && token.split(' ');
    const bearerToken = bearer && bearer[1];
    return jsonwebtoken.decode(bearerToken);
  }
}

export const jwtUtil = new JwtUtil();
