import { config } from "../config/env.config.js";
import { decode } from "next-auth/jwt";

export const decodeJWT = async (token) => {
  try {
    const SALT_KEY = config.SALT_KEY;
    const JWT_SECRET = config.JWT_SECRET;
    const decodedToken = await decode({
      token: token,
      salt: SALT_KEY,
      secret: JWT_SECRET,
    });

    return decodedToken;
  } catch (error) {
    return null;
  }
};
