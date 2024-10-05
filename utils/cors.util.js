import { config } from "../config/env.config.js";

const allowedOrigins = config.ALLOWED_ORIGINS.split(",");
export const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) {
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      callback(null, true); 
    } else {
      callback(new Error("Not allowed by CORS")); 
    }
  },
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  credentials: true, 
  optionsSuccessStatus: 200, 
};
