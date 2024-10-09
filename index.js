import express from "express";
import helmet from "helmet";
import compress from "compression";
import hpp from "hpp";
import cors from "cors";

import mongoSanitize from "express-mongo-sanitize";
import { config } from "./config/env.config.js";
import { userRoute } from "./routes/user.route.js";
import { urlRoute } from "./routes/url.route.js";
import { corsOptions } from "./utils/cors.util.js";
import { limiter } from "./utils/rate-limiter.util.js";
import { RESPONSE_MESSAGES } from "./constants/response-messages.constant.js";
import { httpError } from "./utils/error.util.js";
import { globalErrorHandler } from "./middlewares/global-error.middleware.js";
import { connectToDB } from "./config/db.config.js";
import { initializeRedisClient } from "./config/redis.js";
import { redisMiddlewares } from "./middlewares/redis.middleware.js";
import { urlController } from "./controllers/url.controller.js";

const app = express();

export const redisClient = await initializeRedisClient();

app.set("trust proxy", 1);
app.use(cors(corsOptions));
app.use(helmet());
app.use(express.json());
app.use(hpp());
app.use(compress());
app.use(mongoSanitize());
app.use(limiter);

app.get("/", async (req, res) => {
  try {
    res.send("Hello World 😊");
  } catch (error) {
    httpError(res, error, req, 500);
  }
});

app.use("/api/v1/user", userRoute);
app.use("/api/v1/url", urlRoute);
app.get(
  "/:shortURLCode",
  redisMiddlewares.getShortURLCode,
  urlController.redirectShortURL
);

// 404 error handler

app.use((req, res, next) => {
  try {
    throw new Error(RESPONSE_MESSAGES.NOT_FOUND("Route"));
  } catch (error) {
    httpError(next, error, req, 404);
  }
});

app.use(globalErrorHandler);

connectToDB()
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((error) => {
    console.log(error);
  });

app.listen(config.PORT, () => {
  console.log(`Server is up and running on the PORT ${config.PORT}`);
});

//--------------- features to be implemented----

// 1. custom short url
// 2. url expiration time
// 3. click analytics
// 4. user authentication
// 5. protect shorturl with password
// 6. link preview
// 7. qr code generation
// 8. custom domain support
// 9. link activation and deactivation
// 10. email notifications
