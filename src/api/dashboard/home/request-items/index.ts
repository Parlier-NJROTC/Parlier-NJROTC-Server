// NOTICE ------------
/*
This route is special because instead of regular JSON data it accepts formData

This is to allow pictures to be uploaded and processed easier
*/
import Bun from "bun"
import fs from "node:fs"
import express, { type Request, type Response, type NextFunction, json } from "express";
import formidable from 'formidable';

// the google api
import { google } from "googleapis";


import { Requests } from "../../../../mongodb/dashboard/requests/request"; //sheesh
import { utils } from "../../../../utils"; // like this is any better

// googleapi 

import credentials from "../../../../../credentials.json"

const auth = new google.auth.JWT(
    credentials.client_email,
    undefined,
    credentials.private_key,
    ['https://www.googleapis.com/auth/drive']
);
const drive = google.drive({ version: 'v3', auth });
// Express js items
const Router = express.Router();
const form = formidable({
    uploadDir:"./temp/uploads"
});



Router.get("/",(req,res)=>{
    res.status(200).send("bozo use the post request")

})

// wtf did I get myself into
//Router.use(formData.stream())

async function getShareableLink(fileId) {
    try {
        const response = await drive.files.get({
            fileId: fileId,
            fields: 'webViewLink,webContentLink'
        });

        return {
            webViewLink: response.data.webViewLink,
            webContentLink: response.data.webContentLink
        };
    } catch (error) {
        throw new Error(`Error getting file link: ${error.message}`);
    }
}


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

    /*let data = form.parse(req, async (err, fields, files) => {
        if (err) {
            next(err);
            return;
        }
        res.json({ fields, files });
    });*/
    form.parse(req, async (err, fields, files) => {
        for(const fileName in files){
            if(files[fileName]==undefined || files[fileName][0] == undefined){
                continue; // skip the loop, don't bother
            }

            const file = files[fileName][0] // formidable is werid but it works
            const Metadata = {
                name: file.originalFilename,
                mimeType: file.mimetype
            }
            const image = Bun.file(file.filepath)
            const stream = image.stream()
            const Mediadata = {
                mimeType: file.mimetype,
                body:fs.createReadStream(file.filepath)
            }

             const Uploaded = await drive.files.create({
                    resource: Metadata,
                    media: Mediadata,
                    fields: 'id,name'
                });

                console.log('File uploaded successfully:', Uploaded.data.name);
                console.log('File ID:', Uploaded.data.id);
                const links = await getShareableLink(Uploaded.data.id);
                console.log(links)
        }
        console.log("bogos")
    });
    if(utils.isObjectEmpty(req.body)){
        //res.status(400).send(`Empty Data, please sumbit something to work with dingus`);
        //return;
    }

    // TODO: Add some validation before processin
    /*let request = new Requests({
        items:{
            ribbons: JSON.parse(req.body.ribbons),
            uniform_items:JSON.parse(req.body.uniform_items)
        },
        submited_data:{
            comment:(req.body.comment)
        }
    })
    request.save()*/

    

})



export default Router;
