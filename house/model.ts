import { prop, Typegoose } from "@hasezoey/typegoose";
import * as mongoose from "mongoose";

export class CardDesign extends Typegoose {
  public _id?: mongoose.Types.ObjectId;

  @prop()
  public cardDesignId: string;
}

export const cardDesignModel = new CardDesign().getModelForClass(CardDesign, {
  existingMongoose: mongoose,
  schemaOptions: { collection: "card_designs", timestamps: true }
});
