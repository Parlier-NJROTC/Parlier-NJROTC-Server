import express from "express";

import { User } from '../../../../../mongodb/dashboard/users';


const Router = express.Router();

Router.get("/:usrValue", async (req,res)=>{
    const User_ID = req.userId
    let userdata = await User.findById(User_ID).select(`-_id ${req.params.usrValue}`)
    res.status(200).send(userdata)
    /**
    *  const userSession = req.session as UserSession;
    let userdata = await User.findById(userSession.userId).select(`-_id ${req.params.usrValue}`)
    res.status(200).send(userdata)
    */
});


export default Router;