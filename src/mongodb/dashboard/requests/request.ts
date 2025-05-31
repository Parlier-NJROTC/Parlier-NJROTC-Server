import DashboardDB from "../database-setup";
import { Schema } from "mongoose";

interface RequestSchema{
    
}

// suggested by phind, looked it up and reasearched it for 10 mins
// wth did I miss a core concept????
type Action = "Requested" | "Viewed" | "Processing" | "Delivering" | "Delivered";

// some werid socercry happening here
const Timestamp: [Number, Action] = [Date.now(), "Requested"];



const RequestSchema = new Schema({
    day_requested: {type: Date, required: true, default: Date.now() },
    day_completed: {type: Date || undefined, required: false, defualt: undefined },
    items: {
        ribbons: { type: Array<String>, required: false, default: [] },
        uniform: { type: Array<String>, required: false, default: [] },
    },
    submited_data:{
        images: { type: Array<String>, required: false},
        links: { type: Array<String>, required: false},
        comments: { type: Array<String>, required: false}
    },
    status: { type: String, required: true, default: "Requested", enum: ["Requested", "Viewed", "Processing", "Delivering", "Delivered"]},
    history: { type: typeof Timestamp/* I CAST FIREBALL */, required: true, default: [[Date.now(),"Requested"]]}
})
// we making it pural bc express alr uses the name bruh
const Requests = DashboardDB.model("Request",RequestSchema,"Requests")

export { Requests }

