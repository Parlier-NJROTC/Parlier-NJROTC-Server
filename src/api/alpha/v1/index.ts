import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";

import users from "./users"
import home from "./home"

const router = express.Router();

router.use(express.json())
router.use(cookieParser("ChangeBeforePushingToDevelopment"))
router.use(session({
  secret:"ChangeBeforePushingToDevelopment",
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, maxAge:9999*99 }
}))

router.get("/",(req,res)=>{
  res.status(200).send("Hello from the v1 alpha api, things about to break a lot")
})

router.use("/users",users)
router.use("/home",home)

export default router;