import PublicDB from "./database-setup";
import { Schema } from "mongoose";


// Define the main political figure schema
// EDIT: realized I never made a interface lol
const ChainFigure = new Schema({
    order: { type: Number, required: true },
    role: { type: String, required: true },
    name: { type: String, required: true},
    nickname: String,
    about: {
        text: { type: String, required: true},
        from: { type: String, required: true},
        url: { type: String, required: true}
    },
    portrait: { type: String, required: true},
    acting: {type: Boolean,default: false}
});
  
const ChainofCommand = PublicDB.model('ChainFigure', ChainFigure,"Chain-of-Command");

export{ ChainofCommand }