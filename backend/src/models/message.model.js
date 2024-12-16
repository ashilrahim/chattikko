
import mongoose from "mongoose";

// Declare the Schema of the Mongo model
const messageSchema = new mongoose.Schema({
    senderId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true,
    },
    recieverId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true,
    },
    text:{
        type:String,
    },
    image:{
        type:String,
    },
},{timestamps: true});

//Export the model
const Message = mongoose.model("Message", messageSchema);

export default Message;