import express from "express";
import { MongoClient } from "mongodb";



const Database = new MongoClient(process.env.MONGODB_URI!).db("Omega_DB")
const Logins = Database.collection("Logins")
const Cadets = Database.collection("Cadets")

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


app.post("/login",async (req,res)=>{
  let Cridentials = req.body
  let usr = await Logins.findOne({"username":req.body.username})
  let cadet = await Cadets.findOne({"_id":usr!.user})
  console.log(cadet)

})



app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
  console.log(`URL: localhost:8080`)
  
});