//jshint esversion:6
const mongoose = require('mongoose');

let ownerSchema = mongoose.Schema({
    ownerid:{
        type:Number,
        required: 'Enter ID'
    },
    ownerpassword:{
        type:String,
        required:true
    }
    // firstname:{
    //     type:String,
    //     required: true
    // },
    // middlename:{
    //     type:String
    // },
    // lastname:{
    //     type:String,
    //     required: true
    // },
    // email:{
    //     type:String,
    //     required: true,
    // },
    // phonenumber:{
    //     type:String,
    //     required: true,
    //     minlength:10,
    //     maxlength:10
    // },
    // address:{
    //     type:String,
    // }
});

let Owner = module.exports = mongoose.model('Owner',ownerSchema,'owner');
