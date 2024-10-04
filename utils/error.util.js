import { config } from "../config/env.config.js";
import { logger } from "../config/logger.config.js";
import { RESPONSE_MESSAGES } from "../constants/response-messages.constant.js";


export const httpError = (next, error, req, errorStatusCode = 500) => {
  const errorResponse = {
    success: false,
    statusCode: errorStatusCode,
    request: {
      ip: req.ip || null,
      method: req.method,
      url: req.originalUrl,
    },
    message:
      error instanceof Error
        ? error.message || RESPONSE_MESSAGES.SOMETHING_WENT_WRONG
        : RESPONSE_MESSAGES.SOMETHING_WENT_WRONG,
  };

  logger.error("CONTROLLER_ERROR", {
    meta: errorResponse,
  });

  if (config.ENV === "production") {
    delete errorResponse.request.ip;
  }
  return next(errorResponse);
};
