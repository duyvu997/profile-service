import { IsNumberString, IsOptional, Validate, ValidateIf, IsNumber, IsNotEmpty, IsEnum } from "class-validator";
import {
  IsIntergerNumber,
  IsPositiveNumberString
} from "../common/custom.validator"
import { Type } from "class-transformer";
import { ReleaseTypeEnum } from "./house.enum";
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
export interface IHouseFilterProperties {
  lat?: number;
  lgn?: number;
  radius?:number;
  minPrice?: number;
  maxPrice?: number;
  releaseType?: ReleaseTypeEnum;
  district?: string;
  city?: string;
  amenities?: string;
}
export class GetHousesRequest implements IHouseFilterProperties {
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
  

  @IsOptional()
  public radius: number;

  @IsOptional()
  public minPrice: number;

  @IsOptional()
  public maxPrice: number;

  @IsOptional()
  @IsEnum(ReleaseTypeEnum)
  public releaseType: ReleaseTypeEnum;

  @IsOptional()
  public district: string;// todo: DistrictEnum;
  
  @IsOptional()
  public city: string; // todo: CityEnum;
  
  @IsOptional()
  public amenities: string// todo: AmenitiesEnum;

}