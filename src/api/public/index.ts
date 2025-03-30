import express from "express";

const Router = express.Router();


Router.get("/",(req,res)=>{
    res.status(200).send(`Server Working, connect your frontend to this server :)`)
})

export default Router;
