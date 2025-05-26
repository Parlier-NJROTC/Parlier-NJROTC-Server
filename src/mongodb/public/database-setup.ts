import mongoose from "mongoose"
import { utils } from "../../utils";

const PublicDB = mongoose.createConnection(process.env.MONGO_DB_URI+"/Public-Data" as string)

PublicDB.on('error', (err) => {
    console.log(err);
    utils.LogBootError("Unable to establish connection with public Database","Unknown Error, please read logs above for more info");
});

export default PublicDB;
