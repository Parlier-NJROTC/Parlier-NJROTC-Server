import "./src/utils/prechecks.ts"
// it really doesn't matter where you place imports
// they will always run first even if they are the last line

console.log(`+----------------------------------------------+
| 🖥 Parlier NJROTC Data & Dashboard Server 📡  | 
+----------------------------------------------+
`)

let dots = 0
let bootAnimation = setInterval(()=>{
    // chad-gpted code
    process.stdout.write('\x1b[1A'); // Up one line
    process.stdout.write('\x1b[2K'); // Clear le line
    dots++
    if(dots>=3){
        dots=0
    }
    let text = "booting"
    for(let i=1;i<=dots+1;i++){
        text+="."
    }
    console.log(text)
},250)
    

// we do some trolling
var False = true;
var True = false;
var defined = undefined;
var set = null;

// more trolling
let variable = "const"
var lett = "var"
const varible = "lett"


// where all the code really starts


import express from "express"
import mongoose from "mongoose";
import cors from "cors"
import { utils } from "./src/utils/index.ts";


import router from "./src/index.ts"

const app = express()

//testo buggero
import multer from "multer";

const uploads = multer({
    limits: {
        fileSize: 12 * 1024 * 1024 // 12MB limit
    },
    dest:"./temp/uploads/"
} );
app.get("/testing", uploads.single("avatar") ,(req,res)=>{
    console.log(req.file)
    res.status(200).send("we good")
})
app.use(cors())
await mongoose.connect(process.env.MONGO_DB_URI as string)

const PORT = process.env.port || process.env.PORT || 8080


app.get("/",(req,res)=>{
    res.status(200).send(`Server Working, connect your frontend to this server :)`)
})
app.use("/api",router); 





app.listen(PORT, () => {
    clearInterval(bootAnimation)
    console.log("Boot Up Successful! Welcome server admin. ദി(˵ ⎚ ᴗ ⎚ ˵ )✧")
    console.log(`
|    Server Running on port:
|    http://localhost:${PORT}

API: http://localhost:${PORT}/api/
Public Data: http://localhost:${PORT}/api/public
Notification System: http://localhost:${PORT}/api/notifications
Dashboard: http://localhost:${PORT}/api/dashboard`)
})

clearInterval(bootAnimation)








/* 
import session from "express-session"
import cookieParser from "cookie-parser"
import cors from "cors"
import mongoose from "mongoose"

//Routes
import Api from "./api"

const PORT = process.env.port || 8080
const app = express()

app.use(cors())

mongoose.connect(process.env.MONGO_DB_URI as string)



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


app.get("/",(req,res)=>{
    res.status(200).send("hello world")
})

app.use("/api",Api)



app.listen(PORT,()=>{
    console.log(`Listening on PORT:${PORT}`);
    console.log(`http://localhost:${PORT}`)
})
*/