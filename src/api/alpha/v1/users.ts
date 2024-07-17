import { Router ,type Request, type Response, type NextFunction } from "express";
import cookieParser from "cookie-parser";
import session from "express-session";

const router = Router()
router.use(cookieParser("ChangeBeforePushingToDevelopment"))
router.use(session({
    secret:"ChangeBeforePushingToDevelopment",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge:9999*99 }
}))



router.get("/",(req,res)=>{
    res.status(200).send(
`
------
/users paths
------
POST /users/login - login the user, returns true or false.
POST /users/signup - temporary path to create users, will be deleted later.

`
)
})

import mongoose, { SchemaTypes } from "mongoose";
const Schema = mongoose.Schema;


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
    perms:string, // possible values: CO, XO, SEL, OPS, SUPPLY, ADMIN, FUN, IT, or INSTRUCTOR
    ribbons:[string]
}
// They have to be capital when defining a schema, I don't make the rules
const UserSchema = new Schema({
    name:[String],
    primaryLastName:String,
    rank:{ type:String, default:"Seaman Recurit"},
    class:Number,
    leadership:Boolean,
    perms:{ type:String, default:"CADET"}, // possible values: CO, XO, SEL, OPS, SUPPLY, ADMIN, FUN, IT, or INSTRUCTOR
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

router.post("/testlogin",async (req,res)=>{
    //@ts-ignore
    req.session.isAuthed = true
    //@ts-ignore
    req.session.betterStayAuthed = "yee"
    res.status(200).send("created session")
})

router.get("/testhome",(req,res)=>{
    //@ts-ignore
    if(req.session.isAuthed){
        res.status(200).send("ok what")
    }else{
        res.status(400).send("o;irshboi;strbhvo;isrb")

    }
    //@ts-ignore
    //req.session.betterStayAuthed = "yee"
})



router.post("/login",async (req,res)=>{
    
    let data:LoginSchema = req.body
    let login = await Login.findOne({username:data.username})
    if(!login){
        res.status(404).send(false)
        return 0;
    }
    
    if(login.password === data.password ){
        //@ts-ignore
        req.session.isAuthed = true
        //@ts-ignore
        req.session.userId = login.userId;
        //req.session.betterStayAuthed = "yee"
        res.status(200).send(true)
        // why do sessions work now
        console.log("nothing explained")
    }
})


// Temporary sign up path for testing, will not make it to the release
router.post("/signup",ValidateLogin,async (req,res)=>{
    let data:LoginSchema = req.body
    let userdata:UserSchema = req.body.userData
    if(await Login.findOne({username:data.username})){
        res.status(409).send("Error: User already exists")
        return
    }
    if(!userdata){
        userdata = {
            primaryLastName:"",
            rank:"Seaman Recruit",
            class:0,
            leadership:false,
            perms:"cadet",
            ribbons:[""],
            name:[data.username]
        }
    }
    if(!userdata.primaryLastName && userdata.primaryLastName.trim()){
        // TYPESCRIPT CAN GO AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA \/ The error line ends here
        // I fixed it now
        userdata.primaryLastName = userdata.name[userdata.name.length-1]
    }

    /* This is just incase someone tries to be funni and
    sends in perms:"IT" to gain full access. Don't allow funni or
    else it gets ugli
    */
    let user = new User({
        name:userdata.name,
        primaryLastName: String(userdata.primaryLastName),
        perms:"CADET", // cuz if we jsut passed userdata as the pure variable, someone could just make a admin user
        ribbons:[]
    })

    user.save()
    let login = new Login(
        {
            username:data.username,
            password:data.password,
            userId:user._id
        }
    )
    login.save()

    res.status(201).send("User Created")
})

function ValidateLogin(req:Request,res:Response,next:NextFunction){
    let login:LoginSchema = req.body
    console.log(login)
    if(!login.username || login.username.trim() == ""){
        res.status(400).send("No username specified")
        return
    }
    if(!login.password || login.password.trim() == ""){
        res.status(400).send("No password specified")
        return
    }
    if(login.username.toLowerCase() == "coffee"){
        res.status(418).send("Coffee can't be brewed in a teapot")
        return
    }
    next()
}


export default router

export { User, type UserSchema }

