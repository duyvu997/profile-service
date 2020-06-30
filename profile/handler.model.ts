import { IsNotEmpty } from "class-validator";

export class ZaloReDirect {
  @IsNotEmpty()
  public code: string;
}