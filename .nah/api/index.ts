import { Router } from "express";

// Routes

import AlphaApiV1 from "./alpha/v1";

let api = Router();
api.use("/alpha/v1",AlphaApiV1);

export default api;