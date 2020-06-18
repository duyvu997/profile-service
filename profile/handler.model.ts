import { IsNotEmpty } from "class-validator";

export class ZaloReDirect {
  @IsNotEmpty()
  public uid: string;

  @IsNotEmpty()
  public code: string;

  @IsNotEmpty()
  public state: string;
  
  @IsNotEmpty()
  public scope: any;
}