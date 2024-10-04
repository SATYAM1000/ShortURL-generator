import dotenv from "dotenv";
dotenv.config();

export const config = {
  PORT: process.env.PORT,
  ENV: process.env.ENV,
  DATABASE_URL: process.env.DATABASE_URL,
  ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS,
};
