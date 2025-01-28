import express from "express";

const Router = express.Router();

import data from "../../../data/ChainOfCommand.jsonc"
console.log(data.current.ComanderInCheif)

Router.get("/full/ChainOfCommand",(req,res,next)=>{
    res.status(200).json(data)
})
Router.get("/full/current/ChainOfCommand",(req,res,next)=>{
    res.status(200).json(data.current)
})
Router.get("/full/acting/ChainOfCommand",(req,res,next)=>{
    res.status(200).json(data.acting)
})
export default Router;
