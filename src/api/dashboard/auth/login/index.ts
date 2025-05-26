import express, { type Request, type Response, type NextFunction } from "express";
import jwt from "jsonwebtoken";

import { Login, type LoginSchema } from "../../../../mongodb/dashboard/users";

const Router = express.Router();
const SECRET_KEY = process.env.JWT_SECRET_KEY!;



Router.post("/", async (req: Request, res: Response) => {
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

export default Router;
