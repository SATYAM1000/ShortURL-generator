import { RESPONSE_MESSAGES } from "../constants/response-messages.constant.js";
import { getUserById } from "../services/user.service.js";
import { httpError } from "../utils/error.util.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token) {
      httpError(next, new Error(RESPONSE_MESSAGES.UNAUTHORIZED), req, 401);
    }

    const jwtToken = token.split(" ")[1];
    if (!jwtToken) {
      httpError(next, new Error(RESPONSE_MESSAGES.UNAUTHORIZED), req, 401);
    }

    const decodedToken = await decodeJWT(jwtToken);
    if (!decodedToken) {
      httpError(next, new Error(RESPONSE_MESSAGES.UNAUTHORIZED), req, 401);
    }

    const user = await getUserById(decodedToken?.sub);
    if (!user) {
      httpError(next, new Error(RESPONSE_MESSAGES.NOT_FOUND("User")), req, 401);
    }
    req.user = user;
    next();
  } catch (error) {
    httpError(next, error, req, 500);
  }
};
