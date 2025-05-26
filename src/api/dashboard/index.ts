import express from "express";

import authRouter from "./auth"
import homeRouter from "./home"


const Router = express.Router();


Router.use(express.json());

Router.use("/auth",authRouter)
Router.use("/home",homeRouter)

Router.get("/",(req,res)=>{
    res.send("Welcome to the Dashboard API")
})




export default Router;
