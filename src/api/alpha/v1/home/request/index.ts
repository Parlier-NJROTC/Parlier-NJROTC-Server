// route: /home/request/

import express, { type Request, type Response, type NextFunction } from 'express';
import mongoose, { now } from "mongoose";

//import ribbon types
import ribbonsList from "./ribbons.json"

const Schema = mongoose.Schema;
const router = express.Router()


router.post("/",(req,res)=>{
    //res.status(200).send("this is getting annoying")
    if(req.body.ribbons as Array<String>){
        if(Request_Ribbons(req.body.ribbons as Array<String>) == 1){
            res.status(400).send("Wrong whoomp whoomp")
            return
        }
        res.status(200).send("good ribbon request")
        return
    }
    res.status(200).send("very gud")

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
    //cadet info
    cadet:String,
    cadet_ID:String,
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
const RequestRibbon = mongoose.model("Ribbon_Request",RibbonRequestSchema,"Ribbon_Requests")


interface IncommingRibbonRequest{
    ribbons:Array<String>
}

function Request_Ribbons(Request_Array:Array<String>){
    for(let i=0;i<Request_Array.length;i++){
        if(ribbonsList[Request_Array[i] as keyof object]){
            console.log("valid ribbon: "+Request_Array[i])
        }else{
            console.log("invalid ribbon: "+Request_Array[i])
            return 1;
        }
        let request = new RequestRibbon({
            name:Request_Array[i],
        })
        request.save()
    }
    return 0;
}
/*
router.post("/ribbon",(req,res)=>{
    let Requested_Ribbons:IncommingRibbonRequest = req.body;
    console.log(Requested_Ribbons)
    res.status(200).send("bananar")
    /*
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
*/
export default router
export { RequestRibbon, type RibbonRequestSchema }