import express from "express";

import auth from "./auth"
import home from "./home"

const router = express.Router();

router.use(express.json())

router.get("/",(req,res)=>{
  res.status(200).send("Hello from the v1 alpha api, things about to break a lot")
})

router.use("/auth",auth)
router.use("/home",home)

export default router;