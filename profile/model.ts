  // tslint:disable: variable-name
import { prop, Typegoose } from "@hasezoey/typegoose";
import * as mongoose from "mongoose";

export class House extends Typegoose {
  @prop()
  public page: string;

  @prop()
  public link: string;

  @prop()
  public title: string;

  @prop()
  public post_id: string;

  @prop()
  public message: string;

  @prop()
  public post_date: string;

  @prop()
  public crawled_date: string;

  @prop()
  public score: number;

  @prop()
  public attr_addr_number: string;

  @prop()
  public attr_addr_street: string;

  @prop()
  public address_district: number;

  @prop()
  public attr_addr_ward: string;

  @prop()
  public attr_addr_city: string;

  @prop()
  public attr_position: string;

  @prop()
  public attr_transaction_type: string;

  @prop()
  public attr_area: string;

  @prop()
  public attr_price: string;

  @prop()
  public price_rent: string;

  @prop()
  public attr_price_max: string;

  @prop()
  public attr_price_m2: string;

  @prop()
  public attr_interior_floor: string;

  @prop()
  public attr_interior_room: string;

  @prop()
  public realestate_type: number;

  @prop()
  public attr_potential: string;

  @prop()
  public location: string;

  @prop()
  public source: string;
}

export const houseModel = new House().getModelForClass(House, {
  existingMongoose: mongoose,
  schemaOptions: { collection: "houses", timestamps: true }
});
