import express from "express";

const Router = express.Router();

import dashboard from "./api/dashboard"
import notifications from "./api/notification"
import publicData from "./api/public"

Router.use("/dashboard",dashboard) // personal use, dashboard only to be used by our unit
Router.use("/notification",notifications) // personal use / info, basically news for our cadets or what is happening in our unit
Router.use("/public",publicData) // public use for other jrotc


export default Router;
