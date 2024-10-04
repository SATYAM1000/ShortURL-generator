import { nanoid } from "nanoid";
import { httpError } from "../utils/error.util.js";
import { createShortURLSchema } from "../validations/url.validation.js";
import { validateSchema } from "../validations/url.validation.js";
import { URLServices } from "../services/url.service.js";
import { httpResponse } from "../utils/response.util.js";
import { RESPONSE_MESSAGES } from "../constants/response-messages.constant.js";

export const urlController = {
  createShortURL: async (req, res, next) => {
    try {
      const body = req.body;
      const { error, value } = validateSchema(createShortURLSchema, body);
      if (error) {
        httpError(next, error, req, 400);
      }

      const payload = {
        originalURL: value.originalURL,
        shortURLCode: nanoid(8),
        //TODO: add user id
      };

      const url = await URLServices.createURL(payload);
      httpResponse(req, res, 201, RESPONSE_MESSAGES.SUCCESS, url.shortURLCode);
    } catch (error) {
      httpError(next, error, req, 500);
    }
  },

  redirectShortURL: async (req, res, next) => {
    try {
      const shortURLCode = req.params.shortURLCode;
      const url = await URLServices.getOriginalURLByCode(shortURLCode);
      if (!url) {
        const error = new Error(RESPONSE_MESSAGES.NOT_FOUND("URL"));
        httpError(next, error, req, 404);
      }

      if (!url.isActive) {
        const error = new Error(RESPONSE_MESSAGES.URL_EXPIRED);
        httpError(next, error, req, 404);
      }

      await URLServices.updateViewCount(url._id);

      res.redirect(url.originalURL);
    } catch (error) {
      httpError(next, error, req, 500);
    }
  },
};
