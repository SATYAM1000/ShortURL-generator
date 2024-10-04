import express from "express";
import { httpResponse } from "../utils/response.util.js";
import { httpError } from "../utils/error.util.js";

export const userRoute = express.Router();

userRoute.get("/test", async (req, res) => {
  try {
    httpResponse(req, res, 200, "Hello World");
  } catch (error) {
    httpError(res, error, req, 500);
  }
});
