const mongoose = require('mongoose');
const {Schema} = mongoose;
 
//schema
const NotesSchema = new Schema({

    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },

    username:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    inemail:{
        type :  String,
        required: true,
    },
    
    phone:{
        type: Number,
        required: true,
    },
    date:{
        type: Date,
        default : Date.now
    }
},
{
timestamps:true,
}
);

module.exports = mongoose.model('notes',NotesSchema);