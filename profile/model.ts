import { prop, Typegoose } from "@hasezoey/typegoose";
import * as mongoose from "mongoose";

export class Profile extends Typegoose {

  @prop()
  public name: string;

  @prop()
  public username: string;

  @prop()
  public password: string;

  @prop()
  public avatarUrl: string;
}

export const profileModel = new Profile().getModelForClass(Profile, {
  existingMongoose: mongoose,
  schemaOptions: { collection: "profiles", timestamps: true }
});
