import express from "express";
import session from "express-session";
import mongoose from "mongoose";
// Express Routes
import login from "./src/login"
import home from "./src/home";
import teapot from "./src/Teapot/teapot"

import EndingErrorHandler from "./src/EndingErrorHandler";


const app = express();
const PORT = 8080 || process.env.PORT;

mongoose.connect(process.env.MONGODB_URI+"/Omega_DB" as string)
app.use(express.json())
app.use(session({
  secret:"ChangeBeforePushingToDevelopment",
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.get("/coffee", (req, res) => {
  res.status(418).send("Nah im a Teapot")
});

app.use("/",login)
app.use("/",teapot)
app.use("/home",home)

app.use((WeAreNotUsingThisReqObject,res) => {
  res.status(404).send('Route not found, mabye get some tea or brew your self a coffee');
});

app.use(EndingErrorHandler)

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
  console.log(`URL: https://localhost:${PORT}`)
});