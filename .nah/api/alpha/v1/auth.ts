import express, { type Request, type Response, type NextFunction } from "express";
import jwt from "jsonwebtoken";

import { ObjectId } from 'mongodb';

import { Login, type LoginSchema, User, type UserSchema } from "./users";

const Router = express.Router();
const SECRET_KEY = process.env.JWT_SECRET_KEY!;

Router.use(ValidateLogin);

Router.post("/login", async (req: Request, res: Response) => {
    console.log("received login request" + req.body);

    let data: LoginSchema = req.body;
    let login = await Login.findOne({ username: data.username });

    if (!login) {
        console.log("failed, no user found");
        res.status(404).json({
            success: false,
            message: "Incorrect Password Or Username",
            token: ""
        });
        return;
    }

    if (login.password !== data.password) {
        console.log("failed, wrong password");
        res.status(401).json({
            success: false,
            message: "Incorrect Password Or Username",
            token: ""
        });
        return;
    }

    const Token = jwt.sign(
        { username: data.username, id: login.userId },
        SECRET_KEY,
        { expiresIn: "1h" }
    );
    res.status(200).json({
        success: true,
        message: "Successfully Logged In",
        token: Token
    });
    return;
});

Router.post("/signup", async (req: Request, res: Response) => {
    // what ever, my code is dog water
})

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
