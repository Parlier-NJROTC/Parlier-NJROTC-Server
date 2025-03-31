import { utils } from "./index.ts";

if(process.env.MONGO_DB_URI == undefined || process.env.MONGO_DB_URI == null ||  process.env.MONGO_DB_URI == ""){
    utils.LogBootError("Unable to connect to MongoDB","Server uri/url is empty \nPlease define a valid MONGO_DB_URI in your .env")
}