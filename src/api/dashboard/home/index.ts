// route: /home
// default permissions everyone will have

import express, { type Request, type Response, type NextFunction } from 'express';
import jwt from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}


import { User } from '../../../mongodb/dashboard/users';

// Routers

import requestItemsRouter from './request-items';
import profileRouter from "./profile"
import infoRouter from "./info"


const Router = express.Router()
const SECRET_KEY = process.env.JWT_SECRET_KEY!

Router.use(isAuthed)

Router.use("/request-items",requestItemsRouter)
Router.use("/profile",profileRouter)
Router.use("/info",infoRouter)


Router.get("/",async (req,res)=>{
    res.status(200).send("welcome to home!")
})


/* Request Info */
Router.get("/info",async (req,res)=>{
    const User_ID = req.userId
    console.log("User id: "+User_ID)
    let userdata = await User.findById(User_ID).select(`-_id name primaryLastName rank class leadership`)
    res.status(200).send(userdata)
    console.log("data sent")
})
Router.get("/info/:usrValue", async (req,res)=>{
    const User_ID = req.userId
    let userdata = await User.findById(User_ID).select(`-_id ${req.params.usrValue}`)
    res.status(200).send(userdata)
    /**
    *  const userSession = req.session as UserSession;
    let userdata = await User.findById(userSession.userId).select(`-_id ${req.params.usrValue}`)
    res.status(200).send(userdata)
    */
});



function isAuthed(req:Request,res:Response,next:NextFunction){
    const AuthHeader = req.headers.authorization

    if (!AuthHeader || !AuthHeader.startsWith('Bearer ')) {
        res.status(401).json({ error: 'No token, login?' });
        return
    }
    console.log("verifiy")
    const Token = AuthHeader.split(' ')[1]

    jwt.verify(Token,SECRET_KEY,(err,decoded)=>{
        if(err){
            res.status(403).json({ error: 'nuh uh, u is no hackin us' });
            return
        }
        req.userId = (decoded as any).id;
    })
    next()
    /*
    const userSession = req.session as UserSession;
    console.log("home request from"+req.sessionID)
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
    }*/
}
console.log("testing")
export default Router;