//jshint esversion:6
const mongoose = require('mongoose');

let registrationSchema = mongoose.Schema({
    registrationid:{
        type:Number,
        required: 'Enter ID'
    },
    propertyname:{
        type:String,
        required:'Property name is required !'
    },
    customername:{
        type:String,
        required:'Customer name is required !'
    },
    registrationdate:{
        type:String,
        required: 'Registration Date is required !'
    },
    registrationstatus:{
        type:String,
        required:'Status is required !' 
    }

});

let Registration = module.exports = mongoose.model('Registration',registrationSchema,'registration');
