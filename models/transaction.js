//jshint esversion:6
const mongoose = require('mongoose');

let transactionSchema = mongoose.Schema({
    transactionid:{
        type:Number,
        required: 'Enter ID'
    },
    transactiondate:{
        type:Date,
        required:'Transaction Date is required !'
    },
    transactionmode:{
        type:String,
        required:'Mode is required !'
    },
    bankname:{
        type:String,
        required: 'Bank Name is required !'
    },
    amtpaid:{
        type:Number,
        required:'Amount is required !'
    },
    transactionstatus:{
        type:String,
        required:'Status is required !'
    },
    referencenum:{
        type:String,
        required:'Reference Number is required !'
    }

});

let Transaction = module.exports = mongoose.model('Transaction',transactionSchema,'transaction');
