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
    @IsOptional()
    public limit: string;
    @IsOptional()
    public street: string;
    @IsOptional()
    public district: string;
    @IsOptional()
    public ward: string;
    @IsOptional()
    public city: string;
    @IsOptional()
    public position: string; // todo:  define enum for this type
    @IsOptional()
    public releaseStateType: string; // todo: define enum for this type
    @IsOptional()
    public minArea: number;
    @IsOptional()
    public maxArea: number;
    @IsOptional()
    public minPrice: number;
    @IsOptional()
    public maxPrice: number;
    @IsOptional()
    public interiorFloor: number;
    @IsOptional()
    public interiorRoom: number;
  }