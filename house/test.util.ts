import * as mongoUnit from "mongo-unit";

export const setup = async () => {
    await mongoUnit.start()
    process.env.mongoUri = "mongodb://localhost:27018/house"
};
export const cleanup = async () => mongoUnit.stop();