import express from "express";
import { urlController } from "../controllers/url.controller.js";
import { redisMiddlewares } from "../middlewares/redis.middleware.js";

export const urlRoute = express.Router();

urlRoute.post("/create", urlController.createShortURL);
// urlRoute.get(
//   "/:shortURLCode",
//   redisMiddlewares.getShortURLCode,
//   urlController.redirectShortURL
// );
