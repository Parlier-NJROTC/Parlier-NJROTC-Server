import mongoose, { SchemaTypes } from "mongoose";
const Schema = mongoose.Schema;

// moved all auth stuff to auth.ts, changed it all to jwt

/*
All user schemas defined here
*/

// I tried to not repeat my self so that I wouldn't have to type a interface and schema
// instead I shot myself in the foot (Figuretively not literllay)
// TimeWastedHere = 5 hours
// When defining a Schema , ; and "" (nothing) are valid
interface UserSchema{
    name:[string],
    primaryLastName:string,
    rank:string,
    class:number,
    leadership:Boolean,
    perms:string, // possible values: CADET, CO, XO, SEL, OPS, SUPPLY, ADMIN, FUN, IT, or INSTRUCTOR
    ribbons:[string]
}
// They have to be capital when defining a schema, I don't make the rules
const UserSchema = new Schema({
    name:[String],
    primaryLastName:String,
    rank:{ type:String, default:"Seaman Recurit"},
    class:Number,
    leadership:Boolean,
    perms:{ type:String, default:"CADET"}, // possible values:CADET, CO, XO, SEL, OPS, SUPPLY, ADMIN, FUN, IT, or INSTRUCTOR
    ribbons:[String]
})
const User = mongoose.model("User",UserSchema,"Users")

interface LoginSchema{
    username:string
    password:string
}
const LoginSchema = new Schema({
    username:String,
    password:String,
    userId:String
})
const Login = mongoose.model("Login",LoginSchema,"Logins")

export { User, type UserSchema, Login, type LoginSchema }

