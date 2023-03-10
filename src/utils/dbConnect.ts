import mongoose from "mongoose";
import config from "config";
import Log from "./logger";

async function connect() {
  const dbUri = config.get<string>("dbUri");
  try {
    await mongoose.connect(dbUri);
    Log.info("Database Connected Successully");
  } catch (error) {
    Log.error("Database is not connect");
    process.exit(1);
  }
}

export default connect;
