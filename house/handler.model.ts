import { IsNumberString, IsOptional, Validate } from "class-validator";
import {
    IsIntergerNumber,
    IsPositiveNumberString
  } from "../common/custom.validator"
  
export class GetHouseRequest {
    @IsOptional()
    @IsNumberString()
    @Validate(IsIntergerNumber, {
      message: "offset must be a integer number"
    })
    @Validate(IsPositiveNumberString, {
      message: "offset must be a positive number"
    })
    public offset: string;
  
    @IsOptional()
    @IsNumberString()
    @Validate(IsIntergerNumber, {
      message: "limit must be a integer number"
    })
    @Validate(IsPositiveNumberString, {
      message: "limit must be a positive number"
    })
    public limit: string;
  }