import { IsNumberString, IsOptional, Validate, ValidateIf, IsNumber, IsNotEmpty } from "class-validator";
import {
  IsIntergerNumber,
  IsPositiveNumberString
} from "../common/custom.validator"
import { Type } from "class-transformer";
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
export class GetHouseFilterRequest {
  @ValidateIf(o => o.lgn !== undefined)
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  public lat: number;

  @ValidateIf(o => o.lat !== undefined)
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  public lgn: number;
  

  public radius: number;
  public minPrice: number;
  public maxPrice: number;
  public releaseType: string; // todo: ReleaseTypeEnum;
  public district: string;// todo: DistrictEnum;
  public city: string; // todo: CityEnum;
  public amenities: string// todo: AmenitiesEnum;
}