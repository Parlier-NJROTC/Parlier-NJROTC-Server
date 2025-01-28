import express from "express";
import cors from "cors";
import multer from "multer";

//Routes
import Api from "./api"

const PORT = process.env.port || 8080
const app = express()

app.use(cors())

app.get("/",(req,res)=>{
    res.status(200).send("hello world")
})

app.use("/api",Api)



app.listen(PORT,()=>{
    console.log(`Listening on PORT:${PORT}`);
    console.log(`http://localhost:${PORT}`)
})
