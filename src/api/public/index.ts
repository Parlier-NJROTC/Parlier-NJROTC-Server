import express from "express";
import mongoose from "mongoose";
import { utils } from "../../utils";
const Router = express.Router();

import PublicDB from "../../mongodb/public/database-setup.ts"
import { ChainofCommand } from "../../mongodb/public/figures.ts";

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
