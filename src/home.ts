import express, { type Request, type Response, type NextFunction } from 'express';
import session, {Session} from "express-session";

// function also doubles as casting req.session as User Session
function isAuthed(req:Request,res:Response,next:NextFunction){
    const userSession = req.session as UserSession;
    req.session = userSession;

    if(!userSession.isAuth){
        res.status(401).send("Unauthorized, log in")
        req.session.destroy((err)=>{
            console.log(err)
        })
    }
    next();
}

const router = express.Router()
router.use(express.json());
router.use(isAuthed)

interface UserSession extends Session{
    isAuth:boolean;
    username:string
}

function NewSession(req:Request,username:string){
    const userSession = req.session as UserSession;
    userSession.isAuth = true;
    userSession.username = username;
}


router.get("/",(req,res)=>{
    const userSession = req.session as UserSession;
    res.status(200).send("Logged in, welcome :D, "+userSession.username)
})

export default router

export {
    NewSession
}