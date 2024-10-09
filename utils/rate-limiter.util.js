import { RESPONSE_MESSAGES } from "../constants/response-messages.constant.js";
import rateLimit from "express-rate-limit";
import { httpError } from "./error.util.js";

export const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50000,
  handler: (req, _res, next) => {
    try {
      throw new Error(RESPONSE_MESSAGES.TOO_MANY_REQUESTS("Resource"));
    } catch (error) {
      httpError(next, error, req, 429);
    }
  },
});
