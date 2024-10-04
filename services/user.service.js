import { User } from "../models/user.model.js";

export const getUserById = (id) => {
  return User.findById(id);
};

export const deleteUserById = (id) => {
  return User.findByIdAndDelete(id);
};
