const mongoose=require('mongoose');
const bcrypt=require('bcryptjs')
const userSchema=mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        email:
        {
            type:String,
            required:true,
            unique:true
        },
        password:
        {
            type:String,
            required:true

        },
        pic:
        {
            type:String,
            default:"https://up.yimg.com/ib/th?id=OIP.RhIK9i7NIJhsulRwZCCyVQAAAA&%3Bpid=Api&w=391&c=1&rs=1&qlt=95"
        }
    },
    {
        timestamps:true
    }

);
userSchema.methods.matchPassword=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}

userSchema.pre("save",async function(next){
    if(!this.isModified)
    {
        next();
    }
    const salt=await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt);
})
const User=mongoose.model("User",userSchema);
module.exports=User;