// default permissions everyone will have

import express, { type Request, type Response, type NextFunction } from 'express';
import session, { type Session } from "express-session";
import cookieParser from "cookie-parser";

import { User, type UserSchema } from '../users';

const router = express.Router()
router.use(cookieParser("ChangeBeforePushingToDevelopment"))
router.use(session({
    secret:"ChangeBeforePushingToDevelopment",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge:9999*99 }
}))
router.use(isAuthed)

interface UserSession extends Session{
    isAuthed:boolean;
    userId:string;
    //data:UserSchema;
}

/* Request Info */

router.get("/",async (req,res)=>{
    const userSession = req.session as UserSession;
    res.status(200).send(userSession.isAuthed)
});
router.get("/Info/General",async (req,res)=>{
    const userSession = req.session as UserSession;
    let userdata = await User.findById(userSession.userId).select(`-_id name primaryLastName rank class leadership`)
    res.status(200).send(userdata)
})
router.get("/Info/:usrValue", async (req,res)=>{
    const userSession = req.session as UserSession;
    let userdata = await User.findById(userSession.userId).select(`-_id ${req.params.usrValue}`)
    res.status(200).send(userdata)
});

/* Request stuff to be added */

router.post("/ribbons/:ribbon", async (req,res)=>{
    const userSession = req.session as UserSession;
    

})



function isAuthed(req:Request,res:Response,next:NextFunction){
    const userSession = req.session as UserSession;
    console.log(req.sessionID)
    console.log(userSession.isAuthed)
    if(!userSession.isAuthed){
        res.status(401).send("Unauthorized, log in")
        req.session.destroy((err)=>{
            if(err){
                console.error(err)
                console.log("err")
            }
        })
    }else{
        next();
    }
}

export default router