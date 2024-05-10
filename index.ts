import { MongoClient, ObjectId } from "mongodb";
import express from "express";
import { handler as ssrHandler } from './Frontend/dist/server/entry.mjs';

let uri = "mongodb+srv://njrotcparlier:d6XkZ648}2pHW}_@omega-cluster.5pwjkv2.mongodb.net/?retryWrites=true&w=majority&appName=Omega-Cluster"

const Client = new MongoClient(uri)
const DB = Client.db('Omega_DB');
const Cadets = DB.collection('Cadets');
let me = await Cadets.findOne({_id:new ObjectId("663720d3e5737bf6272916ac")})
console.log(me)

const app = express();
const port = 8080;

app.use("/", express.static('./Frontend/dist/client/'));
app.use(ssrHandler);


/*

app.get("/", (req, res) => {
  res.send(me);
});

*/

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});