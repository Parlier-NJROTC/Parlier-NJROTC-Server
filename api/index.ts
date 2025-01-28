import express from "express";

// Routes
import ChainOfCommand from "./public/ChainOfCommand"

const Router = express.Router();

Router.use("/public",ChainOfCommand)

export default Router;
