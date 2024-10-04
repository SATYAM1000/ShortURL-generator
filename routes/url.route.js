import express from "express";
import { urlController } from "../controllers/url.controller.js";

export const urlRoute = express.Router();

urlRoute.post("/create", urlController.createShortURL);
urlRoute.get("/:shortURLCode", urlController.redirectShortURL);
