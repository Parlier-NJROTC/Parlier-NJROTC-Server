//import express from "express";
import { response } from "express";
import { MongoClient } from "mongodb";

const Database = new MongoClient(process.env.MONGODB_URI!).db("Omega_DB");
const Logins = Database.collection("Logins");
const Cadets = Database.collection("Cadets");

function isEmpty(text:string){
  return text.length==0 && text == null && text == undefined;
}

Bun.serve({
  port: process.env.PORT || 8080,
  async fetch(req){
    const url = new URL(req.url);
    const path = url.pathname;
    let data = await req.json()

    if(req.method == "POST"){
      if(path == "/users/new"){
        if(await Logins.findOne({username:data.username})){
          return new Response("Username taken",{status:409})
        }else{
          Logins.insertOne({username:data.username,password:data.password})
          return new Response("User created",{status:201})
        }
      }
      if(path == "/users/login"){
        let user = await Logins.findOne({username:data.username})
        if(user){
          if(data.password == user.password){
            
          }else{
            return new Response("Incorrect Password")
          }
          console.log(data.password == user.password)
          return new Response("U")
        }else{
          return new Response("User not found",{status:404})
        }
      }
    }
    return new Response("Path not found",{status:404})
  }
})


//const app = express();
const port = 8080 || process.env.PORT;

/*

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
  let usr = await Logins.findOne({"username":req.body.username}).then((dude)=>{
    if(dude!=null && dude!=null && dude!=undefined && dude!.password == req.body.password){
      console.log("valid")
      Cadets.findOne({"_id":dude.user}).then((cadet)=>{
        console.log(cadet)
      })
    }else{
      console.log("internal error maybe wrong password or user")
    }
  }).catch(()=>{
    console.log("invalid")
  }
  )

})



app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
  console.log(`URL: localhost:8080`)
  
});*/