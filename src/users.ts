import mongoose from "mongoose";
const Schema = mongoose.Schema

const UserSchema = new Schema({
    name:Array<String>,
    primaryLastName:String, // to diplay Cadet "lastname"
    perms:{ type:String, default:"CADET"}, // possible values: CO, XO, SEL, OPS, SUPPLY, ADMIN, FUN, IT, or INSTRUCTOR
    ribbons: Array<String>
})
const User = mongoose.model("User",UserSchema,"Users")


export default {
    User:User
}