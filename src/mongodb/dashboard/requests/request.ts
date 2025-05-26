import DashboardDB from "../database-setup";
import { Schema } from "mongoose";

interface RequestSchema{

}
const RequestSchema = new Schema({
    day_requested: {type: Date, required: true, default: Date.now() },
    day_completed: {type: Date || undefined, required: false, defualt: undefined }
})
// we making it pural bc express alr uses the name bruh
const Requests = DashboardDB.model("Request",RequestSchema,"Requests")

export { Requests }

