// NOTICE ------------
/*
This route is special because of regular JSON data it accepts formData

This is to allow pictures to be uploaded and processed easier
*/

import express, { type Request, type Response, type NextFunction } from "express";
import multer from "multer";


const Router = express.Router();

const uploads = multer({ dest: './temp/uploads/' });




// @ts-ignore Must do or else gives bs error 
Router.post("/",uploads.single("banana"),async (req,res)=>{
    console.log(req.file);
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

    res.status(200).send("request processing")

})



export default Router;
