import express from "express";

const app = express();
const port = 8080 || process.env.PORT;






app.get("/", (req, res) => {
  res.send("Hello world");
});



app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
  console.log(`URL: localhost:8080`)
  
});