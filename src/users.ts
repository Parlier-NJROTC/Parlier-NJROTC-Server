import { type Request, type Response, type NextFunction } from 'express';
import mongoose, { SchemaTypes } from "mongoose";
const Schema = mongoose.Schema

// I tried to not repeat my self, instead I shot myself in the foot
// TimeWastedHere = 5 hours
interface UserI{
    objectId: string;
    name:Array<String>,
    primaryLastName:String,
    perms:{ type:String, default:"CADET"}, // possible values: CO, XO, SEL, OPS, SUPPLY, ADMIN, FUN, IT, or INSTRUCTOR
    ribbons:[]
}

const UserSchema = new Schema({
    name:Array<String>,
    primaryLastName: { type:String, default:""},
    perms:{ type:String, default:"CADET"}, // possible values: CO, XO, SEL, OPS, SUPPLY, ADMIN, FUN, IT, or INSTRUCTOR
    ribbons:[]
})
const User = mongoose.model("User",UserSchema,"Users")


export { User,type UserI}