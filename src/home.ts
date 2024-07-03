import express, { type Request, type Response, type NextFunction } from 'express';
import session, {Session} from "express-session";

import { User, type UserI } from './users';

// function also doubles as casting req.session as User Session
function isAuthed(req:Request,res:Response,next:NextFunction){
    const userSession = req.session as UserSession;
    // itss undefined
    console.log(userSession.isAuth)
    console.log(req.sessionID);
    console.log("testing")
    if(!userSession.isAuth){
        res.status(401).send("Unauthorized, log in")
        req.session.destroy((err)=>{
            console.log("testing err")
            console.log(err)
        })
    }else{
        next();
    }
}

const router = express.Router()
router.use(express.json());
router.use(isAuthed)

interface UserSession extends Session{
    isAuth:boolean;
    user:UserI;
}

async function NewSession(req:Request,res:Response,next:NextFunction){
    //req.session as UserSession
    //const userSession = req.session as UserSession;
    //@ts-ignore
    //req.session.isAuth = true;
    //@ts-ignore
    //req.session.user = (await User.findById(res.locals.objectId))!;
    res.status(200).send("Logged In!");
    //@ts-ignore
    //console.log(req.session.isAuth);

}


router.get("/",async (req,res)=>{
    const userSession = req.session as UserSession;
    res.status(200).send(userSession.user)
    console.log("welcome")
});

export default router

export {
    NewSession
}