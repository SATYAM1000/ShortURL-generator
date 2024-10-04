import { config } from "../config/env.config.js";
import { logger } from "../config/logger.config.js";

export const httpResponse = (
  req,
  res,
  responseStatusCode,
  responseMessage,
  data = null
) => {
  const response = {
    success: true,
    statusCode: responseStatusCode,
    request: {
      ip: req.ip || null,
      method: req.method,
      url: req.originalUrl,
    },
    message: responseMessage,
    data: data,
  };

  logger.info("CONTROLLER_RESPONSE", {
    meta: response,
  });

  if (config.ENV === "production") {
    delete response.request.ip;
  }

  res.status(responseStatusCode).json(response);
};
