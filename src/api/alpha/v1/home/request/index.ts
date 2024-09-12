// route: /home/request/

import express, { type Request, type Response, type NextFunction } from 'express';

const router = express.Router()

router.post("/ribbon/:ribbon",(req,res)=>{
    console.log(`recieved request for: ${req.params.ribbon}`)

})
router.post("/ribbon",()=>{
    console.log("requesedt")
})


export default router