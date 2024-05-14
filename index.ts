import express from "express";
import { MongoClient } from "mongodb";



const Client = new MongoClient(process.env.MONGODB_URI!).db("Omega_DB")

const app = express();
const port = 8080 || process.env.PORT;



app.use(express.json())


app.get("/", (req, res) => {
  res.send("Hello world");
});

app.get("/login",(req,res)=>{
  res.send("Login <br><hr> <input>Username<br> <input>Password<br><hr><button>Submit</button>")
})

interface Login{
  username:string;
  password:string;
}

app.post("/login",(req,res)=>{
  let Cridentials = req.body
  console.log(Cridentials)
  console.log("recieved")
  res.status(300).send()
})



app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
  console.log(`URL: localhost:8080`)
  
});