//jshint esversion:6
const mongoose = require('mongoose');

let loanSchema = mongoose.Schema({
    loanid:{
        type:Number,
        required: 'Enter ID'
    },
    bankname:{
        type:String,
        required:'Bank name is required !'
    },
    rate:{
        type:String,
        required: 'Rate is required !'
    },
    installments:{
        type:Number
    },
    fee:{
        type:Number
    },
    tenure:{
        type:Number,
        required: 'Tenure is required'
    },
    maxamt:{
        type:Number,
        required:'Maximum amt is required'
    },
    emailid:{
        type:String,
        required: 'Email is required'
    }
});

let Loan = module.exports = mongoose.model('Loan',loanSchema,'loan');
