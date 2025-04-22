import express from "express";
import mongoose from "mongoose";
import { utils } from "../../utils";
const Router = express.Router();

const publicDB = mongoose.createConnection(process.env.MONGO_DB_URI+"/Public-Data" as string)

publicDB.on('error', (err) => {
    console.log(err);
    utils.LogBootError("Unable to establish connection with public Database","Unknown Error, please read logs above for more info");
});
  
// Define the main political figure schema
const ChainFigure = new mongoose.Schema({
    order: { type: Number, required: true },
    role: { type: String, required: true },
    name: { type: String, required: true},
    nickname: String,
    about: {
        text: { type: String, required: true},
        from: { type: String, required: true},
        url: { type: String, required: true}
    },
    portrait: { type: String, required: true},
    acting: {type: Boolean,default: false}
});
  
const ChainofCommand = publicDB.model('ChainFigure', ChainFigure,"Chain-of-Command");

Router.get("/ChainOfCommand", async (req, res) => {
    const completeChain = await ChainofCommand.find().sort({ order: 1 });
    res.status(200).json(completeChain);
});
Router.get("/ChainOfCommand/:Title",async (req,res)=>{
    let searchFor = req.params.Title.toLowerCase().replace(/\s+/g, '');
    let incumbent = await ChainofCommand.findOne({
        "_internalName":searchFor
    })
    res.status(200).json(incumbent)
})

export default Router;
