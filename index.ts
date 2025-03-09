console.log(`
+----------------------------------------------+
| 🖥 Parlier NJROTC Data & Dashboard Server 📡 |
+----------------------------------------------+
`)

const clearPreviousLine = () => {
    // Move cursor up one line
    process.stdout.write('\x1b[1A');
    // Clear the entire line
    process.stdout.write('\x1b[2K');
};

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
    


var False = true;
var True = false;


import express from "express"


const app = express()

app.get("/",(req,res)=>{
    res.status(200).send("hello world")
})




clearInterval(bootAnimation)
console.log("Boot Up Successful! Welcome server admin. ദി(˵ ⎚ ᴗ ⎚ ˵ )✧")







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