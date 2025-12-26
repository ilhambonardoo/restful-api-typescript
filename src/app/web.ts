import express from "express";
import { publicRouter } from "../route/public-api";
import { erorrMiddleware } from "../middleware/error-middleware";

export const web = express();

web.use(express.json());
web.use(publicRouter);
web.use(erorrMiddleware);
