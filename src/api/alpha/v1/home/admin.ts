// route for admin
import express, { type Request, type Response, type NextFunction } from 'express';
import session, { type Session } from "express-session";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import {User} from "../users"


const router = express.Router()
router.use(checkIfAdmin)

interface UserSession extends Session{
    isAuthed:boolean;
    userId:string;
    //data:UserSchema;
}

router.get("/")
router.get("/users/:id",async (req,res)=>{
    const userSession = req.session as UserSession;
    let userdata = await User.findById(userSession.userId).select(`-_id ${req.params.id}`)
    res.status(200).send(userdata)
})
router.post("/user")
router.delete("/user/:id")

router.get("/ribbons/:id")
router.post("/ribbons/:id")



async function checkIfAdmin(req:Request,res:Response,next:NextFunction){
    const userSession = req.session as UserSession;
    let user = (await User.findById(userSession.userId).select("perms"))! // the ()! is typescript shennanigans because its paranoid that it doesn't exists, brueh
    if(user.perms != "admin"){
        res.status(401).json({error:`Unauthorized User, only admin(s) are allowed access to this part, not ${user.perms}`})
        return
    }else{
        res.status(200)
        next();
    }
}