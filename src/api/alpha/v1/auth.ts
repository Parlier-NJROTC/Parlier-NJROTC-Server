import express, { type Request, type Response, type NextFunction } from "express";
import jwt from "jsonwebtoken"

import { Login, type LoginSchema, User, type UserSchema } from "./users";

const Router = express.Router()
const SECRET_KEY = process.env.JWT_SECRET_KEY!

Router.use(ValidateLogin)

Router.post("/login",async (req,res)=>{
    console.log("recived login request"+req.body)

    let data:LoginSchema = req.body
    let login = await Login.findOne({username:data.username})

    if(!login){
        console.log("failed, no user found")
        res.status(404).json({
            success:false,
            message:"No Username Found",
            token:""
        });
        return
    }

    if(login.password != data.password ){
        console.log("failed, wrong password")
        res.status(401).json({
            success:false,
            message:"Incorrect Password",
            token:""
        });
        return
    }

    const Token = jwt.sign(
        {username:data.username,id:login.userId},
        SECRET_KEY,
        {expiresIn: "1h"}
    )
    res.status(200).json({
        success:true,
        message:"Successfully Logged In",
        token:Token
    })
    return
})

// Temporary path to allow people to sign up, will be moved later to admin path
Router.post("/signup",async (req,res)=>{
    let data:LoginSchema = req.body
    console.log(data)
    let userdata:UserSchema = req.body.userData
    if(await Login.findOne({username:data.username})){
        res.status(409).json({
            success:false,
            message:"Username Taken"
        })
        return
    }
    if(!userdata){
        userdata = {
            primaryLastName:"",
            rank:"Seaman Recruit",
            class:0,
            leadership:false,
            perms:"CADET",
            ribbons:[""],
            name:[data.username]
        }
    }
    if(!userdata.primaryLastName && userdata.primaryLastName.trim() != ""){
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
        ribbons:[""]
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

function ValidateLogin(req:Request,res:Response,next:NextFunction){
    let login:LoginSchema = req.body
    console.log(req.method)
    console.log(login)
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




export default Router