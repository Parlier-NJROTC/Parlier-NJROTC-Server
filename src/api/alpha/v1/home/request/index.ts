// route: /home/request/

import express, { type Request, type Response, type NextFunction } from 'express';
import mongoose from "mongoose";

const Schema = mongoose.Schema;
const router = express.Router()


router.get("/ribbon",(req,res)=>{
    res.status(200).send("this is getting annoying")

})

// ribbons
const RibbonSchema = new Schema({
    name:String
})
const RibbonRequest = mongoose.model("Ribbon_Request",RibbonSchema,"Ribbon_Requests")


router.post("/ribbon/:ribbon",(req,res)=>{
    console.log(`recieved request for: ${req.params.ribbon}`)
    let request = new RibbonRequest({
        name:req.params.ribbon
    })
    request.save()
    res.status(200).send("test done, check database, ye lazy dingus")
})


export default router