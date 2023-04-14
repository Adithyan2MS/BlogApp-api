const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        reguired:true,
        unique:true
    },
    password:{
        type:String,
        reguired:true
    },
    profilePic:{
        type:String,
        default:""
    }    
},{ timestamps: true })

module.exports = mongoose.model("User",UserSchema)