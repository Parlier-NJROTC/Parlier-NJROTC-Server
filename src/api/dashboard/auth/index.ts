import express, { type Request, type Response, type NextFunction } from "express";

import { type LoginSchema } from "../../../mongodb/dashboard/users";

import LoginRouter from "./login"
import SignUpRouter from "./signup"


const Router = express.Router();


Router.get("/",(req,res)=>{
    res.send(`Welcome to the auth API!
Paths Availible:
/signup
/login
    `)
})

Router.use(ValidateLogin);
Router.use("/login",LoginRouter)
Router.use("/signup",SignUpRouter)


function ValidateLogin(req: Request, res: Response, next: NextFunction) {

    if(req.method!="POST"){
        res.send("Wrong type, use POST request")
        return;
    }
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
