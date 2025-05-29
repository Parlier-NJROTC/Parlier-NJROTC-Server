// NOTICE ------------
/*
This route is special because instead of regular JSON data it accepts formData

This is to allow pictures to be uploaded and processed easier
*/

import express, { type Request, type Response, type NextFunction, json } from "express";
import multer, { type FileFilterCallback } from "multer";

import { Requests } from "../../../../mongodb/dashboard/requests/request"; //sheesh
import path from "path";


const Router = express.Router();



const fileFilter = ( file: Express.Multer.File, cb: (error: Error | null, acceptFile: boolean) => void) => {
    const allowedTypes = ['.pdf', '.jpg', '.jpeg', '.png', '.doc', '.docx'];
    const extname = path.extname(file.originalname).toLowerCase();
    
    if (allowedTypes.includes(extname)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type'), false);
    }
};
const uploads = multer({
    fileFilter,
    limits: {
        fileSize: 12 * 1024 * 1024 // 12MB limit
    },
    dest:"./temp/uploads/"
} );



Router.get("/",(req,res)=>{
    res.status(200).send("bozo use the post request")

})
// @ts-ignore Must do or else gives bs error 
Router.post("/",uploads.single("uploaded_file"),async (req,res)=>{
    
    console.log("aw hell")
    // heck ton of safeguards, the path shouldn't explode the server
    if(req.headers['content-type']==undefined){
        res.status(400).send("Invalid format, please send in data")
        return;
    }
    const contentType = req.headers['content-type'].split("/")[1].split(";")[0];
    // werid ahh
    console.log(`Type: |${contentType}|`)
    if(contentType!="form-data"){
        res.status(400).send(`Invalid format, ${contentType} is not allowed in this path. Please use formData`);
        return;
    }

    

    // why is it undefined?????

    // ok so I sent basic form:
    /**
     * Key: Banana | Value: Bornanana | Description: rhyme
     */

    // and I got this in the console:
    /**
     * [Object: null prototype] {
     *  banana: "bornanana",
     * }
     */
    // also if u send wrong type of input then the server crashes.
    
    console.log(req.body);

    let request = new Requests()
    request.save()

    res.status(200).send("request processing")

})



export default Router;
