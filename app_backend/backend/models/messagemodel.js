const mongoose=require('mongoose');
const messagemodel=new mongoose.Schema(
    {
        sender:{
            type:mongoose.Schema.Types.ObjectId,
            //This field is used to store the unique identifier (ObjectId) of the sender of the message. It references the "User" model, which suggests that each message is associated with a user.
            ref:"User"
        },
        content:{
            type:String,
            trim:true
            //This field stores the content of the message as a string. The trim: true option ensures that any leading or trailing white spaces are automatically removed.
        },
        chat:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Chat"
        }
    },
    {
        timestamps:true,
    }
);
const Message=mongoose.model("Message",messagemodel);
module.exports= Message;