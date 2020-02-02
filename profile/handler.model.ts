import { Length, IsOptional, IsString } from "class-validator";

export class CreateProfileRequest {
  @IsString()
  @Length(3, 12)
  public name: string;

  @IsString()
  @Length(3, 20)
  public username: string;

  @IsString()
  @Length(8, 50)
  public password: string;

  @IsOptional()
  @IsString()
  public avatarUrl: string;
}
