import express, { type Request, type Response, type NextFunction } from "express";

import { type LoginSchema } from "../users";

import LoginRouter from "./login"
import SignUpRouter from "./signup"


const Router = express.Router();

Router.use(ValidateLogin);
Router.use("/login",LoginRouter)
Router.use("/signup",SignUpRouter)


function ValidateLogin(req: Request, res: Response, next: NextFunction) {
    let login: LoginSchema = req.body;
    console.log(req.method);
    console.log(login);

    if (!login.username || login.username.trim() === "") {
        res.status(400).send("No username specified");
        return;
    }

    if (!login.password || login.password.trim() === "") {
        res.status(400).send("No password specified");
        return;
    }

    if (login.username.toLowerCase() === "coffee") {
        res.status(418).send("Coffee can't be brewed in a teapot");
        return;
    }

    next();
}

export default Router;
