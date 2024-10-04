import { RESPONSE_MESSAGES } from "../constants/response-messages.constant.js";
import { deleteUserById } from "../services/user.service.js";
import { httpError } from "../utils/error.util.js";

export const userController = {
  deleteUser: async (req, res) => {
    try {
      const id = req.user._id;
      const deletedUser = await deleteUserById(id);
      if (!deletedUser) {
        const error = new Error(RESPONSE_MESSAGES.NOT_FOUND("User"));
        httpError(res, error, req, 404);
      }
      httpResponse(req, res, 200, RESPONSE_MESSAGES.SUCCESS);
    } catch (error) {
      httpError(res, error, req, 500);
    }
  },
  
};
