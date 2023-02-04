const mongoose=require('mongoose')
const validator=require('validator')

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
        minLength:3
    },
    email:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isEmail(value)){
                return new Error('Invalid Email ID')
            }
        }
    },
    phone:{
        type:Number,
        required:true,
        minLength:10
    },
    message:{
        type:String,
        required:true,
        minLength:3
    }
})

const User=mongoose.model("User",userSchema);

module.exports=User;
