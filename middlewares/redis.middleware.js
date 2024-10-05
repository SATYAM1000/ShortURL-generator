import { httpError } from "../utils/error.util.js";
import { redisClient } from "../index.js";

export const redisMiddlewares = {
  getShortURLCode: async (req, res, next) => {
    try {
      const shortURLCode = req.params.shortURLCode;
      if (!shortURLCode) {
        const error = new Error(RESPONSE_MESSAGES.NOT_FOUND("URL"));
        httpError(next, error, req, 404);
      }

      const originalURL = await redisClient.get(shortURLCode);
      if (originalURL) {
        return res.redirect(originalURL);
      }
      next();
    } catch (error) {
      httpError(next, error, req, 500);
    }
  },
  
};
