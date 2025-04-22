// route: /home/admin
import express, { type Request, type Response, type NextFunction } from 'express';
import session, { type Session } from "express-session";
import {User} from "../../users"
//import {RibbonRequest} from "."


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
router.get("/users/:id",async (req,res)=>{
    const userSession = req.session as UserSession;
    let userdata = await User.findById(userSession.userId).select(`-_id ${req.params.id}`)
    res.status(200).send(userdata)
})

// get requests from one date or another
// url format: http:// api/alpha/v1/home/admin/requests/ribbons/?start_time=2023-01-01T14:00:00Z&end_time=2023-01-01T17:00:00Z
router.get("/requests/ribbons/", async (req,res)=>{
    const userSession = req.session as UserSession;
    const { start_time, end_time }  = req.query;

    const startTime = new Date(start_time as string).toISOString();
    const endTime = new Date(end_time as string).toISOString();
    //const ribbons = await RibbonRequest.find({
    //    date_requested: { $gte: new Date(startTime), $lte: new Date(endTime) }
    //}).sort({ createdAt: -1 });
    //console.log(ribbons)
})

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

export default router
