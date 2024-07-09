import express from "express"
import session from "express-session"
import cookieParser from "cookie-parser"
import mongoose from "mongoose"

// api routes
import api from "./src/api"

const PORT = process.env.port || 8080
const app = express()

// its 9 not one
console.log(6/2*(1+2))

mongoose.connect("mongodb://localhost:27017/"+"Omega_DB" as string)



app.use("/api",api)

app.get("/",express.static('public'))

/*
// Session Items
app.use(cookieParser("ChangeBeforePushingToDevelopment"))
app.use(session({
    secret:"ChangeBeforePushingToDevelopment",
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge:1000 * 60 * 60 // An hour
    }
}))
*/

app.get("/",(req,res)=>{
    res.status(200).send("hello world")
})

app.listen(PORT,()=>{
    console.log(`Listening on PORT:${PORT}`);
    console.log(`http://localhost:${PORT}`)
})
