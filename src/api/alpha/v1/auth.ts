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
    let data: LoginSchema = req.body;
    console.log(data);
    let userdata: UserSchema = req.body.userdata;

    if (await Login.findOne({ username: data.username })) {
        res.status(409).json({
            success: false,
            message: "Username Taken"
        });
        return;
    }

    if (!userdata) {
        userdata = {
            primaryLastName: "",
            email: "example@example.com",
            rank: "Seaman Recruit",
            class: 0,
            leadership: false,
            perms: "CADET",
            ribbons: [""],
            name: [data.username]
        };
    }

    if (typeof userdata.class !== 'number' || userdata.class < 1 || userdata.class > 4) {
        res.status(400).json({
            success: false,
            message: "Invalid user class number"
        });
        return;
    }
    
    const emailElement = document.getElementById('email') as HTMLInputElement;
    let email = emailElement ? emailElement.value : null;

    const classElement = document.getElementById('Year3321') as HTMLInputElement;
    let classValue = classElement ? String(classElement.value) : null;

    if (!email) {
        res.status(400).json({
            success: false,
            message: "Email is required"
        });
        return;
    }

    if (classValue) {
        userdata.class = parseInt(classValue);
    } else {
        console.warn("Class value not found");
    }

    const randomObjectId = new ObjectId().toString();

    let user = new User({
        _id: randomObjectId,
        name: [data.username],
        primaryLastName: data.username.split(' ').pop() || '',
        rank: userdata.rank || "Seaman Recruit",
        perms: "CADET",
        ribbons: [""],
        class: userdata.class, 
        email: email
    });

    try {
        await user.save();

        let login = new Login({
            username: data.username,
            password: data.password,
            userId: user._id
        });

        await login.save();

        const token = jwt.sign(
            { username: data.username, id: user._id },
            SECRET_KEY,
            { expiresIn: "1h" }
        );

        res.status(201).json({
            success: true,
            message: "User Created Successfully",
            token: token
        });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
});

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
