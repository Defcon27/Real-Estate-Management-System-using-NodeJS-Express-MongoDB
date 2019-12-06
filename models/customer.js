//jshint esversion:6
const mongoose = require('mongoose');

let customerSchema = mongoose.Schema({
    customerid:{
        type:Number,
        required: 'Enter ID'
    },
    customerpassword:{
        type:String,
        required:'Password is required'
    },
    firstname:{
        type:String,
        required:'First Name is required'
    },
    middlename:{
        type:String
    },
    lastname:{
        type:String,
        required: 'Last name is required'
    },
    emailid:{
        type:String,
        required: 'Email ID is required'
    },
    dateofbirth:{
        type:Date,
        required:'Birthdate is required'
    },
    phonenumber:{
        type:String,
        required: 'Phone number is required',
        minlength:10,
        maxlength:10
    },
    occupation:{
        type:String,
        required:'Occupation is required'
    },
    annualincome:{
        type:Number,
        required:'Annual Income is required'
    },
    address:{
        type:String,
        required: 'Address is required'
    }
});

customerSchema.path('emailid').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');


let Customer = module.exports = mongoose.model('Customer',customerSchema,'customer');
