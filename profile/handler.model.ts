import { IsNotEmpty } from "class-validator";

export class ZaloReDirect {
  @IsNotEmpty()
  public code: string;
}

export class FacebookReDirect {
  @IsNotEmpty()
  public access_token: string;
}
export interface IProfilePayload {
  profileId: string;
}