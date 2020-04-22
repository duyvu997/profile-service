import * as mongoose from "mongoose";

export class Db {
  private conn: mongoose.Mongoose;
  private listenersRegistered: boolean = false;
  public async connect(): Promise<mongoose.Mongoose> {
    // Because `conn` is in the global scope, Lambda may retain it between function calls
    // This means your Lambda function doesn't have to go through the
    // potentially expensive process of connecting to MongoDB every time.
    if (!this.conn || mongoose.connection.readyState !== 1) {
      if (!this.listenersRegistered) {
        this.listenersRegistered = true;
      }
      mongoose.set("debug", true);
      this.conn = await this.getConn();
    }
    return this.conn;
  }

  public async getConn(): Promise<mongoose.Mongoose> {
    return mongoose
      .connect(String(process.env.mongoUri), {
        // Buffering means mongoose will queue up operations if it gets
        // disconnected from MongoDB and send them when it reconnects.
        // With serverless, better to fail fast if not connected.
        bufferCommands: false, // Disable mongoose buffering
        // Set this option to 0 and set bufferCommands to false on your schemas if you want your database operations to
        // fail immediately when the driver is not connected, as opposed to waiting for reconnection
        bufferMaxEntries: 0, // and MongoDB driver buffering
        minSize: Number(process.env.mongoMinSize) || 5,
        poolSize: Number(process.env.mongoPoolSize) || 5,
        useCreateIndex: true,
        useFindAndModify: false,
        useNewUrlParser: true,
        // To opt in to using the new topology engine
        useUnifiedTopology: true,
      } as mongoose.ConnectionOptions)
      .catch((e: any) => {
        throw e;
      });
  }
}

export const db = new Db();
