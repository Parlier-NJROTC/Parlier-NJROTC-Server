import express from "express";

import { User } from '../../users';


import usrValueRouter from "./:usrValue"
const Router = express.Router();

Router.use("/",usrValueRouter);
Router.get("/",async (req,res)=>{
    const User_ID = req.userId
    console.log("User id: "+User_ID)
    let userdata = await User.findById(User_ID).select(`-_id name primaryLastName rank class leadership`)
    res.status(200).send(userdata)
    console.log("data sent")
})



export default Router;