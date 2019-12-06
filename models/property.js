//jshint esversion:6
const mongoose = require('mongoose');

let propertySchema = mongoose.Schema({
    propertyid:{
        type:Number,
        required: 'Enter ID'
    },
    propertyname:{
        type:String,
        required:'Property name is required !'
    },
    propertystatus:{
        type:String,
        required: 'Status is required !'
    },
    propertytype:{
        type:String,
        required:'Type is required'
    },
    propertybhk:{
        type:String,
        required: 'BHK is required'
    },
    area:{
        type:Number,
        required: 'Area is required'
    },
    price:{
        type:Number,
        required:'Price is required'
    },
    location:{
        type:String,
        required: 'Location is required'
    }
});

let Property = module.exports = mongoose.model('Property',propertySchema,'property');
