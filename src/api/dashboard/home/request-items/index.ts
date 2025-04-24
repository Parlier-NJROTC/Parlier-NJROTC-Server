// NOTICE ------------
/*
This route is special because of regular JSON data it accepts formData

This is to allow pictures to be uploaded and processed easier
*/

import express, { type Request, type Response, type NextFunction } from "express";
import multer from "multer";


const Router = express.Router();

const multerUploads = multer({ dest: '/temp/uploads/' });

Router.post("/", async (req:Request,res:Response)=>{
    if(req.file){
        console.log("there be file")
    }else{
        console.log("nothin")
    }

})



export default Router;
