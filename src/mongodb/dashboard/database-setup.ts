import mongoose from "mongoose";


const DashboardDB = await mongoose.createConnection(process.env.MONGO_DB_URI as string + "/dashboard")

export default DashboardDB;