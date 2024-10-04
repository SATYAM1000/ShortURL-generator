import Joi from "joi";

export const createShortURLSchema = Joi.object({
  originalURL: Joi.string().required(),
});

export const validateSchema = (schema, body) => {
  const { value, error } = schema.validate(body);
  return { value, error };
};
