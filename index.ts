import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import multer from "multer";

const PORT = process.env.port || 8080
const app = express()
const upload = multer({dest: "/temp"})

app.use(cors())

//mongoose.connect(process.env.MONGO_DB_URI as string)

app.get("/",(req,res)=>{
    res.status(200).send("hello world")
})
app.post("/uploadtest",upload.single("picture"),(req,res,next)=>{
// now im gonna ask to become class lead in 3 2 hold on now
})

app.listen(PORT,()=>{
    console.log(`Listening on PORT:${PORT}`);
    console.log(`http://localhost:${PORT}`)
})
