import { Context } from "aws-lambda";
import { db } from "./db";

export const connectDb = (
  target: any,
  key: string,
  descriptor: PropertyDescriptor
) => {
  const originalMethod = descriptor.value;
  descriptor.value = async function() {
    // Make sure to add this so you can re-use `conn` between function calls.
    // See https://www.mongodb.com/blog/post/serverless-development-with-nodejs-aws-lambda-mongodb-atlas
    (arguments[1] as Context).callbackWaitsForEmptyEventLoop = false;
    await db.connect();
    return originalMethod.apply(this, arguments);
  };
  return descriptor;
};
