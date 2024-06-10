// any shenanigans you want goes in here

import express from "express";
const router = express.Router()
let TeasBrewed:number = 0

router.get("/coffee",async (req,res)=>{
    if(Math.random() > 0.5){
        res.status(418).send("Im a teapot, not a coffee pot.")
    }else{
        res.status(418).send("You can brew your self a coffee, im a teapot.")

    }
})
router.get("/tea",async (eh,res)=>{
    res.status(418).send("+1 teas brewed")
    TeasBrewed++
})
router.get("/teas-brewed",(whatdoIputHereInsteadQuestionMarkSignThing,res)=>{
    res.status(418).send("brewed"+TeasBrewed)
})

export default router