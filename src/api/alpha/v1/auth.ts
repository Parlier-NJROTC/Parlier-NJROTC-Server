import express from "express";
import jwt from "jsonwebtoken"

import { Login, type LoginSchema } from "./users";
import { password } from "bun";

const Router = express.Router()
const SECRET_KEY = "Emergenecy"


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
        message:"successfully logged in",
        token:Token
    })
    return
})

export default Router