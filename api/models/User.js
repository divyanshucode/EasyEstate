
const mongoose = require('mongoose');
const { unique } = require('underscore');
const escapeMap = require('underscore/cjs/_escapeMap.js');
const { Schema } = mongoose;

//define schema for our model

const userSchema = new Schema({
    name:{
        type:String,
        required:true,
        
    },

    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },

})

const UserModel = mongoose.model('User',userSchema);

module.exports = UserModel;
