//jshint esversion:6
const mongoose = require('mongoose');

let cancellationSchema = mongoose.Schema({
    cancellationid:{
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
    cancellationdate:{
        type:Date,
        required: 'Cancellation is required !'
    },
    amtrefund:{
        type:Number,
        required:'Refund amt is required !'
    },
    referencenum:{
        type:String,
        required:'reference number is required !'
    }
});

let Cancellation = module.exports = mongoose.model('Cancellation',cancellationSchema,'cancellation');
