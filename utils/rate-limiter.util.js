import { RESPONSE_MESSAGES } from "../constants/response-messages.constant.js";
import rateLimit from "express-rate-limit";
import { httpError } from "./error.util.js";

export const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  handler: (req, res, next) => {
    try {
      throw new Error(RESPONSE_MESSAGES.TOO_MANY_REQUESTS("Resource"));
    } catch (error) {
      httpError(next, error, req, 429);
    }
  },
});
