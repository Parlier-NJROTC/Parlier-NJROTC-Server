import express from "express";

import authRouter from "./auth"
import homeRouter from "./home"


const Router = express.Router();

Router.use("/auth",authRouter)
Router.use("/home",homeRouter)





export default Router;
