// route: /home/request/

import express, { type Request, type Response, type NextFunction } from 'express';
import mongoose, { now } from "mongoose";

//import ribbon types
import ribbonsList from "./ribbons.json"


console.log(ribbonsList)
const Schema = mongoose.Schema;
const router = express.Router()


router.get("/ribbon",(req,res)=>{
    res.status(200).send("this is getting annoying")

})

// I hate this reapeating
interface RibbonRequestSchema{
    name:string,
    date_requested:string,
    viewed_byAdmin:Boolean,
    date_viewed:string|undefined,
    cadet_comment:string,
    admin_comment:string,
    granted:boolean|undefined, 
}
// ribbons
const RibbonRequestSchema = new Schema({
    name:String,
    //dates viwed
    date_requested:{ type:Date, default:new Date().toISOString()},
    viewed_byAdmin:{ type:Boolean, default:false},
    date_viewed:{ type:Date||undefined, default:undefined},
    //comments
    cadet_comment:{ type:String, default:""},
    admin_comment:{ type:String, default:""},
    // undefiened = review, true and false are self explanitory
    granted:{ type:Boolean||undefined, default:undefined},
})
const RibbonRequest = mongoose.model("Ribbon_Request",RibbonRequestSchema,"Ribbon_Requests")


router.post("/ribbon/:ribbon",(req,res)=>{
    console.log(`recieved request for: ${req.params.ribbon}`)
    if(ribbonsList[req.params.ribbon as keyof object]==undefined){
        res.status(404).send(false)
    }
    let request = new RibbonRequest({
        name:req.params.ribbon
    })
    request.save()
    res.status(200).send(true)
})


export default router
export { RibbonRequest, type RibbonRequestSchema }