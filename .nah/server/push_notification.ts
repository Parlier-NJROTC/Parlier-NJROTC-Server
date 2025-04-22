import mongoose from "mongoose";

const Schema = mongoose.Schema;

const notification = new Schema({
    title:String,
    text:String,
    endDate:Date // one week from created by default
})