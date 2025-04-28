import express, { type Request, type Response, type NextFunction } from "express";
import { Login, User, type LoginSchema, type UserSchema } from "../../users";




const Router = express.Router();


// Temporary path to allow people to sign up, will be moved later to admin path
Router.post("/", async (req: Request, res: Response) => {
    let data:LoginSchema = req.body
    let message = ""
    console.log(data)
    let userdata:UserSchema = req.body.userdata
    if(await Login.findOne({username:data.username})){
        res.status(409).json({
            success:false,
            message:"Username Taken"
        })
        return
    }
    if(!userdata){
        userdata = {
            primaryLastName:"",
            email:"example@example.com",
            rank:"Seaman Recruit",
            class:0,
            leadership:false,
            perms:"CADET",
            ribbons:[""],
            name:[data.username]
        }
    }
    console.log(userdata)
    // I really should read a book on software engineering because this is redneck enginnering at its worstly finest doodooooo
    if(userdata.class == 0){
        message+="\nWarning: User Created with class of 0. This better be for debugging else something has gone wrong"
    }else if(userdata.class != 1 && userdata.class != 2 && userdata.class != 3 && userdata.class != 4){
        res.status(400).json({
            success:false,
            message:"invalid user class number"
        })
        return
    }
    if(!userdata.primaryLastName && userdata.primaryLastName.trim() != ""){
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
        class:userdata.class || 1,
        perms:"CADET", // cuz if we jsut passed userdata as the pure variable, someone could just make a admin user
        ribbons:[""]
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

    res.status(201).json({
            success:true,
            message:`User Created `+message
    })
})




export default Router;