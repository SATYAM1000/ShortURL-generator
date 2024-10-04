import { Url } from "../models/url.model.js";

export const URLServices = {
  createURL: (payload) => {
    return Url.create(payload);
  },
  getOriginalURLByCode: (shortURLCode) => {
    return Url.findOne({ shortURLCode });
  },
};
