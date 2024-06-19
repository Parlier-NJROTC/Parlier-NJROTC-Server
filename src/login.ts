// Dashboard/login
import express, { type Request, type Response, type NextFunction } from "express";
import session from 'express-session';
import mongoose from "mongoose";

import { User, type UserI} from "./users.ts"
import Home, {NewSession} from "./home.ts"

const Schema = mongoose.Schema;
const SecrectKey = "JaTqDy1HzjL5EHM9Q21u18Kdp2F6MqbS" // will be moved to a .env file
const router = express.Router();
router.use(express.json());

const LoginSchema = new Schema({
    username:String,
    password:String,
    userId: mongoose.Schema.Types.ObjectId
})
const Login = mongoose.model("Login",LoginSchema,"Logins")

interface loginBody{
    username:string
    password:string
}


function isValidString(input: String | undefined | null): boolean {
    // this is pain
    return input!== null && input!== undefined && input.trim()!== "" && input !== "undefined" && input !== "null";
}

function ValidateLogin(req:Request,res:Response,next:NextFunction){
    let login:loginBody = req.body

    //these console.log are for debugging purposeses
    console.log("-----------------------------")
    console.log(login)
    console.log(req.path)
    console.log("-----------------------------")

    if(!login.username || login.username.trim() == ""){
        res.status(400).send("No username specified")
        return
    }
    if(!login.password || login.password.trim() == ""){
        res.status(400).send("No password specified")
        return
    }
    if(login.username.toLowerCase() == "coffee"){
        res.status(418).send("Coffee can't be brewed in a teapot")
        return
    }
    next()
}



router.post("/login",ValidateLogin,async (req,res,next)=>{
    let data:loginBody = req.body
    console.log(data)
    let login = await Login.findOne({username:data.username})
    if(!login){
        res.status(404).send("Error: User not found")
        return 0;
    }

    if(login.password === data.password ){
        NewSession(req,data.username)
        res.status(200).send("logged in");
        return 0;
    }
})


router.post("/signup",ValidateLogin,async (req,res)=>{
    let data:loginBody = req.body
    let userdata:UserI = req.body.userData
    if(await Login.findOne({username:data.username})){
        res.status(409).send("Error: User already exists")
        return
    }
    if(!userdata.name){
        res.status(400).send("No name specified")
        //return // do I need to add return phind to stop the function or am I good?
    }
    if(!isValidString(userdata.primaryLastName)){
        // TYPESCRIPT CAN GO AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA \/ The error line ends here
        // I fixed it now
        userdata.primaryLastName = userdata.name[userdata.name.length-1]
    }

    /* This is just incase someone tries to be funni and
    sends in perms:"IT" to gain full access. Don't allow funni or
    else it gets ugli
    */
    let user = new User({
        name:userdata.name,
        primaryLastName: String(userdata.primaryLastName),
        perms:"CADET", // cuz if we jsut passed userdata as the pure variable, someone could just make a admin user
        ribbons:[]
    })

    user.save()
    let login = new Login(
        {
            username:data.username,
            password:data.password,
            userId:user._id
        }
    )
    login.save()

    res.status(201).send("User Created")
})




export default router