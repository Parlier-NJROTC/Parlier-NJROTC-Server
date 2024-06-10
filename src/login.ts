// Dashboard/login
import express from "express";
import mongoose from "mongoose";
import * as jose from 'jose'; // hey look its me :D

import users from "./users.ts"

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

router.post("/",async (req,res)=>{
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

    res.status(500).send("Error: We should have not gotten to this point, tell the cyberpatriot to look into it and ur steps that u took")
    console.error("!ERROR! There was an error in the authentication system")
    console.log("Here is the data from req.body: "+data)
    return -1;

})




export default router