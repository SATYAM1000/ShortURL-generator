import { config } from "./env.config.js";
import mongoose from "mongoose";

export const connectToDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(config.DATABASE_URL);
  } catch (error) {
    process.exit(1);
  }
};
