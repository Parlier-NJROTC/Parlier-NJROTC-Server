// Dashboard/login
import express, { type NextFunction } from "express";
import mongoose from "mongoose";
import * as jose from 'jose'; // hey look its me :D

import { User,type UserI} from "./users.ts"


function isValidString(input: string | undefined | null): boolean {
    // this is pain
    return input!== null && input!== undefined && input.trim()!== "" && input !== "undefined" && input !== "null";
}

const Schema = mongoose.Schema;
const SecrectKey = "JaTqDy1HzjL5EHM9Q21u18Kdp2F6MqbS" // will be moved to a .env file
const router = express.Router();
router.use(express.json());

const LoginSchema = new Schema({
    username:Array<String>,
    password:String,
    userId: mongoose.Schema.Types.ObjectId
})
const Login = mongoose.model("Login",LoginSchema,"Logins")

interface loginBody{
    username:string
    password:string
}

router.post("/login",async (req,res)=>{
    let data:loginBody = req.body
    if(!data.username){
        res.status(400).send("No username specified")
        return 0;
    }
    if(data.username == "Coffee"){
        res.status(418).send("I'm a teapot")
        return 0;
    }
    let login = await Login.findOne({username:data.username})
    if(!login){
        res.status(404).send("Error: User not found")
        return 0;
    }

    if(login.password === data.password ){
        let payload = {
            username:"aopjeigoebngioe"
        }


        const encoder = new TextEncoder();
        const secretKeyBytes = encoder.encode(SecrectKey);
        const jwt = await new jose.SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
        .sign(secretKeyBytes);

        res.status(200).send(jwt);
        return 0;
    }
})


router.post("/signup", async (req,res)=>{
    let data:loginBody = req.body
    let userdata:UserI = req.body.userData
    if(await Login.findOne({username:data.username})){
        res.status(409).send("Error: User already exists")
    }
    console.log(userdata.name[userdata.name.length-1])
    console.log(typeof String(userdata.primaryLastName))
    if(!isValidString(String(userdata.primaryLastName))){
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
        perms:"CADET",
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