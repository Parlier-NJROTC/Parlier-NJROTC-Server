//this will just be used to allow people to edit the website

import mongoose, { SchemaTypes } from "mongoose";
const Schema = mongoose.Schema;

const Paragraph = new Schema({
    text:String,
    location:String, // the actual HTML id of where it will be placed
    permissions:{
        everyone:{ type:Boolean, default:false},
        users:[], //userid
    }

})
const Image = new Schema({
    imageURL:String, // where the image is at, ex: https://picsum.photos/200/300
    altText:String, // alt text, cus astro complainds
    altDesc:{
        show:{ type:Boolean, default:false}, // just decide to show it below the image or not
        textAlign:{type:String, default:"center"} //left,center,right
    },
    location:String, // the actual HTML id of where it will be placed (same as paragrapth)
})