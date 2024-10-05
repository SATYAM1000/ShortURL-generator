import { config } from "../config/env.config.js";

const allowedOrigins = config.ALLOWED_ORIGINS.split(",");
export const corsOptions = {
  origin: allowedOrigins,
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  credentials: true,
};
