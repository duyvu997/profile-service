import { IsNotEmpty } from "class-validator";

export class ZaloReDirect {
  @IsNotEmpty()
  public code: string;
}
export interface IProfilePayload {
  profileId: string;
}