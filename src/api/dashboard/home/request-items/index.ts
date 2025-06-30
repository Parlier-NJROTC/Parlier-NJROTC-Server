// NOTICE ------------
/*
This route is special because instead of regular JSON data it accepts formData

This is to allow pictures to be uploaded and processed easier
*/

import express, { type Request, type Response, type NextFunction, json } from "express";
import formData from "express-form-data" // dead code
import multiparty from "multiparty"
import busboy from 'busboy';
import formidable from 'formidable';


import { Requests } from "../../../../mongodb/dashboard/requests/request"; //sheesh
import { utils } from "../../../../utils"; // like this is any better
const Router = express.Router();
const formInsanity = new multiparty.Form()



Router.get("/",(req,res)=>{
    res.status(200).send("bozo use the post request")

})

// wtf did I get myself into
//Router.use(formData.stream())


// @ts-ignore Must do or else gives bs error 
Router.post("/",async (req,res,next)=>{
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
    // awasasasa
    // lord looking at the googleapi, im cooked.
    const form = formidable({});

    let data = form.parse(req, (err, fields, files) => {
        if (err) {
            next(err);
            return;
        }
        res.json({ fields, files });
    });
    console.log(data)

    // asasas

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


    if(utils.isObjectEmpty(req.body)){
        //res.status(400).send(`Empty Data, please sumbit something to work with dingus`);
        return;
    }

    // TODO: Add some validation before processin
    let request = new Requests({
        items:{
            ribbons: JSON.parse(req.body.ribbons),
            uniform_items:JSON.parse(req.body.uniform_items)
        },
        submited_data:{
            comment:(req.body.comment)
        }
    })
    request.save()

    //res.status(200).send("request processing")

})



export default Router;
