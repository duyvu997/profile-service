import { prop, Typegoose } from "@hasezoey/typegoose";
import * as mongoose from "mongoose";
import { ProfileType } from "./profile.enum";

export class Profile extends Typegoose {
  @prop()
  public birthday?: string;

  @prop()
  public gender?: string;

  @prop()
  public name: string;

  @prop()
  public profileId: string;

  @prop()
  public pictureUrl?: string;

  @prop({ enum: ProfileType })
  public type?: ProfileType;

  @prop()
  public phoneNumber?: string;

  @prop()
  public zaloCode?: string;

  @prop()
  public zaloScope?: string[];

  @prop()
  public fbAccessToken?: string;

  @prop()
  public fbScope?: string[];

}

export const profileModel = new Profile().getModelForClass(Profile, {
  existingMongoose: mongoose,
  schemaOptions: { collection: "profiles", timestamps: true }
});
